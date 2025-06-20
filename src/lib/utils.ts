import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safe fetch function that handles non-JSON responses gracefully
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @returns Promise with { data, error, isJson } object
 */
export async function safeFetch(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options);
    
    // Check if response is ok first
    if (!response.ok) {
      console.warn(`Fetch failed: ${response.status} ${response.statusText} for ${url}`);
      return { data: null, error: `HTTP ${response.status}: ${response.statusText}`, isJson: false };
    }
    
    // Check content type to see if it's JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn(`Non-JSON response received from ${url}. Content-Type: ${contentType}`);
      const text = await response.text();
      return { data: null, error: 'Received non-JSON response', isJson: false, rawText: text };
    }
    
    // Try to parse JSON
    const data = await response.json();
    return { data, error: null, isJson: true };
    
  } catch (error) {
    // Handle network errors, JSON parsing errors, etc.
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn(`Safe fetch error for ${url}:`, errorMessage);
    return { data: null, error: errorMessage, isJson: false };
  }
}
