// // providers/session-provider.tsx
// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import { createClientComponentClient, type User, type Session } from '@supabase/auth-helpers-nextjs';
// import { useRouter } from 'next/navigation';
// import { useToast } from "@/components/ui/use-toast";

// interface SessionContextValue {
//   session: Session | null;
//   user: User | null;
//   isLoading: boolean;
//   signOut: () => Promise<void>;
//   refreshSession: () => Promise<void>;
// }

// const SessionContext = createContext<SessionContextValue | undefined>(undefined);

// interface SessionProviderProps {
//   children: React.ReactNode;
//   initialSession: Session | null;
// }

// export function SessionProvider({ children, initialSession }: SessionProviderProps) {
//   const [session, setSession] = useState<Session | null>(initialSession);
//   const [user, setUser] = useState<User | null>(initialSession?.user ?? null);
//   const [isLoading, setIsLoading] = useState(false);
//   const supabase = createClientComponentClient();
//   const router = useRouter();
//   const { toast } = useToast();

//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       console.log('Auth state changed:', event);
//       setSession(session);
//       setUser(session?.user ?? null);

//       if (event === 'SIGNED_OUT') {
//         // Clear any application state
//         router.push('/auth/signin');
//       } else if (event === 'SIGNED_IN') {
//         // Refresh the page to ensure we have the latest session
//         router.refresh();
//       }
//     });

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [supabase, router]);

//   const signOut = async () => {
//     try {
//       setIsLoading(true);
//       await supabase.auth.signOut();
//       toast({
//         title: "Signed out successfully",
//         duration: 2000,
//       });
//       router.push('/auth/signin');
//     } catch (error) {
//       console.error('Error signing out:', error);
//       toast({
//         title: "Error signing out",
//         description: "Please try again",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const refreshSession = async () => {
//     try {
//       setIsLoading(true);
//       const { data: { session } } = await supabase.auth.refreshSession();
//       setSession(session);
//       setUser(session?.user ?? null);
//     } catch (error) {
//       console.error('Error refreshing session:', error);
//       toast({
//         title: "Session refresh failed",
//         description: "Please sign in again",
//         variant: "destructive",
//       });
//       router.push('/auth/signin');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SessionContext.Provider 
//       value={{
//         session,
//         user,
//         isLoading,
//         signOut,
//         refreshSession,
//       }}
//     >
//       {children}
//     </SessionContext.Provider>
//   );
// }

// export function useSession() {
//   const context = useContext(SessionContext);
//   if (context === undefined) {
//     throw new Error('useSession must be used within a SessionProvider');
//   }
//   return context;
// }

// // Custom hook for protected routes
// export function useProtectedRoute() {
//   const { user, isLoading } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.replace('/auth/signin');
//     }
//   }, [user, isLoading, router]);

//   return { isLoading, isAuthenticated: !!user };
// }



// // providers/session-provider.tsx
// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import { createClientComponentClient, type User, type Session } from '@supabase/auth-helpers-nextjs';
// import { useRouter } from 'next/navigation';

// interface SessionContextValue {
//   session: Session | null;
//   user: User | null;
//   isLoading: boolean;
//   signOut: () => Promise<void>;
// }

// const SessionContext = createContext<SessionContextValue | undefined>(undefined);

// interface SessionProviderProps {
//   children: React.ReactNode;
//   initialSession: Session | null;
// }

// export function SessionProvider({ children, initialSession }: SessionProviderProps) {
//   const [session, setSession] = useState<Session | null>(initialSession);
//   const [user, setUser] = useState<User | null>(initialSession?.user ?? null);
//   const [isLoading, setIsLoading] = useState(false);
//   const supabase = createClientComponentClient();
//   const router = useRouter();

//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       setSession(session);
//       setUser(session?.user ?? null);

//       if (event === 'SIGNED_OUT') {
//         router.push('/auth/signin');
//       } else if (event === 'SIGNED_IN') {
//         router.refresh();
//       }
//     });

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [supabase, router]);

//   const signOut = async () => {
//     try {
//       setIsLoading(true);
//       await supabase.auth.signOut();
//       router.push('/auth/signin');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SessionContext.Provider 
//       value={{
//         session,
//         user,
//         isLoading,
//         signOut,
//       }}
//     >
//       {children}
//     </SessionContext.Provider>
//   );
// }

// export function useSession() {
//   const context = useContext(SessionContext);
//   if (context === undefined) {
//     throw new Error('useSession must be used within a SessionProvider');
//   }
//   return context;
// }

// export function useProtectedRoute() {
//   const { user, isLoading } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.replace('/auth/signin');
//     }
//   }, [user, isLoading, router]);

//   return { isLoading, isAuthenticated: !!user };
// }



// providers/session-provider.tsx
// 'use client';

// import { createContext, useContext, useEffect, useRef, useState } from 'react';
// import { createClientComponentClient, type User, type Session } from '@supabase/auth-helpers-nextjs';
// import { useRouter } from 'next/navigation';

// interface SessionContextValue {
//   session: Session | null;
//   user: User | null;
//   isLoading: boolean;
//   signOut: () => Promise<void>;
// }

// const SessionContext = createContext<SessionContextValue | undefined>(undefined);

// interface SessionProviderProps {
//   children: React.ReactNode;
//   initialSession: Session | null;
// }

// export function SessionProvider({ children, initialSession }: SessionProviderProps) {
//   const [session, setSession] = useState<Session | null>(initialSession);
//   const [user, setUser] = useState<User | null>(initialSession?.user ?? null);
//   const [isLoading, setIsLoading] = useState(false);
  
//   // Use refs to prevent recreation
//   const supabase = useRef(createClientComponentClient());
//   const router = useRouter();

//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.current.auth.onAuthStateChange((event, session) => {
//       // Only update if there's a change
//       if (JSON.stringify(session?.user) !== JSON.stringify(user)) {
//         setSession(session);
//         setUser(session?.user ?? null);
//       }

//       if (event === 'SIGNED_OUT') {
//         // Clear any cached data
//         window.sessionStorage.clear();
//         router.push('/auth/signin');
//       } else if (event === 'SIGNED_IN') {
//         router.refresh();
//       }
//     });

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [user, router]);

//   const signOut = async () => {
//     try {
//       setIsLoading(true);
//       await supabase.current.auth.signOut();
//       window.sessionStorage.clear();
//       router.push('/auth/signin');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SessionContext.Provider
//       value={{
//         session,
//         user,
//         isLoading,
//         signOut,
//       }}
//     >
//       {children}
//     </SessionContext.Provider>
//   );
// }

// export function useSession() {
//   const context = useContext(SessionContext);
//   if (context === undefined) {
//     throw new Error('useSession must be used within a SessionProvider');
//   }
//   return context;
// }

// export function useProtectedRoute() {
//   const { user, isLoading } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (!isLoading && !user) {
//         router.replace('/auth/signin');
//       }
//     }, 100);

//     return () => clearTimeout(timeoutId);
//   }, [user, isLoading, router]);

//   return { isLoading, isAuthenticated: !!user };
// }