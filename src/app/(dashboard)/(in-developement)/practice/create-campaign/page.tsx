'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCampaign() {
  const router = useRouter();

  useEffect(() => {
    router.push('/practice/create-campaign/recipients');
  }, [router]);

  return null; // arba galite grąžinti loading indikatorių
}