'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ConceptOverview from '../../../components/lessons/ConceptOverview';

interface SubLessonData {
  id: string;
  title: string;
  content_type: string;
  content?: {
    paragraphs?: string[];
    keyConcepts?: string[];
  };
  order_number?: number;
  points?: number;
}

const SubLessonPage = () => {
  const params = useParams();
  const [subLessonData, setSubLessonData] = useState<SubLessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract slugs from params
  const moduleSlug = params.module as string;
  const lessonSlug = params.lesson as string;
  const subLessonSlug = params.sublesson as string;

  useEffect(() => {
    if (!moduleSlug || !lessonSlug || !subLessonSlug) {
      setError('Missing URL parameters');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch data from the specific sub-lesson API endpoint
        const apiUrl = `/api/modules/${moduleSlug}/lessons/${lessonSlug}/sublessons/${subLessonSlug}`;
        console.log("Fetching from API:", apiUrl);
        const res = await fetch(apiUrl);

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({})); // Try to get error message
          console.error("API Error Response:", errorData);
          throw new Error(errorData.error || `Failed to fetch sub-lesson (${res.status})`);
        }

        const data: SubLessonData = await res.json();
        setSubLessonData(data);
        console.log("Received sub-lesson data:", data);

      } catch (err) {
        console.error("Error fetching sub-lesson:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [moduleSlug, lessonSlug, subLessonSlug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#050607] text-white">Loading sub-lesson...</div>; // TODO: Add proper skeleton
  }

  if (error || !subLessonData) {
    return (
      <div className="min-h-screen bg-[#050607] text-white p-8">
         <Link
            className="text-gray-400 border text-sm border-white/20 rounded-full px-4 py-2 inline-flex items-center hover:text-white mb-6"
            href={`/modules/${moduleSlug}`}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Module
          </Link>
        <div className="p-8 rounded-lg border border-red-500/30 bg-red-900/10 text-center">
          <h1 className="text-xl text-red-400">Error Loading Lesson</h1>
          <p className='text-red-300 mt-2'>{error || 'Sub-lesson not found.'}</p>
        </div>
      </div>
    );
  }

  // --- Render based on content_type --- 
  const renderContent = () => {
    switch (subLessonData.content_type) {
      case 'concept_overview':
        return (
          <ConceptOverview 
            title={subLessonData.title} 
            paragraphs={subLessonData.content?.paragraphs}
            keyConcepts={subLessonData.content?.keyConcepts}
          />
        );
      default:
        return (
          <div className="p-6 border border-yellow-500/30 rounded-md bg-yellow-900/10">
            <p>Unknown content type: {subLessonData.content_type}</p>
            <p>(ID: {subLessonData.id})</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050607] text-white p-8">
      <Link
        className="text-gray-400 border text-sm border-white/20 rounded-full px-4 py-2 inline-flex items-center hover:text-white mb-6"
        href={`/modules/${moduleSlug}`}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Module
      </Link>

      {/* Render the content based on type */}
      {renderContent()}
    </div>
  );
};

export default SubLessonPage; 