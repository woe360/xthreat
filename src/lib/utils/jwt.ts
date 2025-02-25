import jwt from 'jsonwebtoken';

// Try to get the secret from server environment first, then client environment
const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET;

if (!JWT_SECRET) {
  // In development, provide a fallback to prevent crashes during hot reloading
  if (process.env.NODE_ENV === 'development') {
    console.warn('JWT_SECRET environment variable is not set. Using fallback for development only.');
    // Only use this for development!
    const FALLBACK_SECRET = 'development_fallback_secret_do_not_use_in_production';
    // @ts-ignore - Assign to const
    JWT_SECRET = FALLBACK_SECRET;
  } else {
    throw new Error('JWT_SECRET environment variable is not set');
  }
}

const JWT_EXPIRY = '24h';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  sessionId: string;
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
};

export const getTokenFromHeaders = (headers: Headers): string | null => {
  const authHeader = headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
};

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt_token', token);
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwt_token');
  }
  return null;
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt_token');
  }
}; 