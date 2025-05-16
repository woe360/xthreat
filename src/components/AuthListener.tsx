'use client';

import { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function AuthListener() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login?message=Session+ended');
      } else if (event === 'SIGNED_IN') {
        router.refresh();
      } else if (event === 'USER_UPDATED') {
         router.refresh();
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase, router]);

  return null;
} 