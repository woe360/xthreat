import { useEffect, useRef } from 'react';

// Define the type for our ref structure
interface PreloadRefType {
  current: {
    iframe: HTMLIFrameElement | null;
    preconnect: HTMLLinkElement | null;
    dnsPrefetch: HTMLLinkElement | null;
    preload: HTMLLinkElement | null;
  }
}

const useCalendarPreload = (calendarUrl: string) => {
  // Explicitly type the useRef
  const preloadRef = useRef<{
    iframe: HTMLIFrameElement | null;
    preconnect: HTMLLinkElement | null;
    dnsPrefetch: HTMLLinkElement | null;
    preload: HTMLLinkElement | null;
  }>({
    iframe: null,
    preconnect: null,
    dnsPrefetch: null,
    preload: null
  });

  useEffect(() => {
    // Parse the URL to get the domain
    const calDomain = new URL(calendarUrl).origin;

    // Create and attach preconnect
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = calDomain;
    preconnect.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect);
    preloadRef.current.preconnect = preconnect;

    // Create and attach DNS prefetch
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = calDomain;
    document.head.appendChild(dnsPrefetch);
    preloadRef.current.dnsPrefetch = dnsPrefetch;

    // Create and attach preload for main Cal.com script
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'script';
    preload.href = `${calDomain}/embed/embed.js`;
    document.head.appendChild(preload);
    preloadRef.current.preload = preload;

    // Create hidden preload iframe
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none;';
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('importance', 'low');
    iframe.src = calendarUrl;
    document.body.appendChild(iframe);
    preloadRef.current.iframe = iframe;

    // Cleanup function
    return () => {
      if (preloadRef.current.preconnect) {
        document.head.removeChild(preloadRef.current.preconnect);
      }
      if (preloadRef.current.dnsPrefetch) {
        document.head.removeChild(preloadRef.current.dnsPrefetch);
      }
      if (preloadRef.current.preload) {
        document.head.removeChild(preloadRef.current.preload);
      }
      if (preloadRef.current.iframe) {
        document.body.removeChild(preloadRef.current.iframe);
      }
    };
  }, [calendarUrl]);
};

export default useCalendarPreload;