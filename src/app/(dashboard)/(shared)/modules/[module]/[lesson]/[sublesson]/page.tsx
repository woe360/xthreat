'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Import all necessary lesson components
import { Quiz } from '../../../components/lessons/Quiz';
import { QuizSkeleton } from '../../../components/lessons/QuizSkeleton';
import { EmailInspector } from '../../../components/lessons/Email';
import VendorPortalSimulator from '../../../components/lessons/Vendor';
import MultiChannelPhishingSimulator from '../../../components/lessons/Multi';
import CaseStudy from '../../../components/lessons/CaseStudy';
import URLInspectorChallenge from '../../../components/lessons/Inspector';
import SecurityStory from '../../../components/lessons/Story';
import EmailComparison from '../../../components/lessons/EmailComparison';
import ConceptOverview from '../../../components/lessons/ConceptOverview';
import SupplyChain from '../../../components/lessons/SupplyChain';
import ExecutiveImpersonationExample from '../../../components/lessons/Impersonation';

interface SubLessonData {
  id: string | number;
  title: string;
  content_type: string;
  lesson_id: number;
  content?: {
    paragraphs?: string[];
    keyConcepts?: string[];
  };
  order_number?: number;
  points?: number;
}

const SubLessonPage = () => {
  const params = useParams();
  const router = useRouter();
  const [subLessonData, setSubLessonData] = useState<SubLessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for quiz data
  const [questions, setQuestions] = useState<any[]>([])
  const [answers, setAnswers] = useState<any[]>([])
  const [quizLoading, setQuizLoading] = useState(false);

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
      setQuizLoading(false);
      setError(null);
      setQuestions([]);
      setAnswers([]);
      const supabase = createClientComponentClient();

      try {
        // Fetch base sub-lesson data first (using API route is fine)
        const apiUrl = `/api/modules/${moduleSlug}/lessons/${lessonSlug}/sublessons/${subLessonSlug}`;
        console.log("Fetching base data from API:", apiUrl);
        const res = await fetch(apiUrl);

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("API Error Response:", errorData);
          throw new Error(errorData.error || `Failed to fetch sub-lesson (${res.status})`);
        }

        const data: SubLessonData = await res.json();
        setSubLessonData(data);
        console.log("Received sub-lesson data:", data);

        // --- Fetch additional data based on content_type --- 
        if (data.content_type === 'quiz') {
          console.log("Content type is quiz, fetching questions/answers...");
          setQuizLoading(true);
          // Fetch questions for this specific sub-lesson
          const { data: questionsData, error: questionsError } = await supabase
            .from('quiz_questions')
            .select('*')
            .eq('sub_lesson_id', data.id)
            .order('order_number', { ascending: true });

          if (questionsError) throw questionsError;
          setQuestions(questionsData || []);
          console.log("Fetched questions:", questionsData);

          // Fetch answers if questions exist
          if (questionsData?.length) {
            const questionIds = questionsData.map(q => q.id);
            const { data: answersData, error: answersError } = await supabase
              .from('quiz_answers')
              .select('*')
              .in('question_id', questionIds);
            
            if (answersError) throw answersError;
            setAnswers(answersData || []);
            console.log("Fetched answers:", answersData);
          }
          setQuizLoading(false);
        }
         // Add similar blocks here for other content types if they need extra data
         // e.g., if 'email_inspector' needed specific email data associated with subLessonData.id

      } catch (err) { 
        console.error("Error during data fetching:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
        setQuizLoading(false);
      }
    };

    fetchData();

  }, [moduleSlug, lessonSlug, subLessonSlug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] text-white">Loading sub-lesson...</div>;
  }

  if (error || !subLessonData) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white p-8">
         <Link
            className="text-gray-400 border text-sm border-white/20 rounded-full px-4 py-2 inline-flex items-center hover:text-white mb-6"
            href={`/modules/${moduleSlug}`}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Module
          </Link>
        <div className="p-8 rounded-lg border border-red-500/30 bg-red-900/10 text-center">
          <h1 className="text-xl text-red-400">Error Loading Lesson</h1>
          <p className='text-red-300 mt-2'>{error || 'Sub-lesson data could not be loaded.'}</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (subLessonData.content_type === 'quiz' && quizLoading) {
        return <QuizSkeleton />;
    }

    switch (subLessonData.content_type) {
      case 'email_inspector':
        return <EmailInspector moduleId={moduleSlug} />;
      case 'vendor_portal':
        return <VendorPortalSimulator />;
      case 'multi_channel':
        return <MultiChannelPhishingSimulator />;
      case 'story':
        return <SecurityStory />;
      case 'email_comparison':
        return <EmailComparison moduleId={moduleSlug} />;
      case 'case_study':
        return <CaseStudy moduleId={moduleSlug} />;
      case 'supply_chain':
        return <SupplyChain moduleId={moduleSlug} />;
      case 'impersonation':
        return <ExecutiveImpersonationExample moduleId={moduleSlug} />;
      case 'url_inspector':
        return <URLInspectorChallenge moduleId={moduleSlug} lessonId={String(subLessonData.id)} />;
      case 'concept_overview':
        return (
          <ConceptOverview 
            title={subLessonData.title} 
            paragraphs={subLessonData.content?.paragraphs}
            keyConcepts={subLessonData.content?.keyConcepts}
          />
        );
      case 'quiz':
        if (questions.length > 0) {
            return (
              <Quiz 
                questions={questions} 
                answers={answers} 
                moduleId={moduleSlug}
              />
            );
        } else if (!quizLoading) {
            console.log('No questions found for sub-lesson ID:', subLessonData.id);
            return <div className="text-center p-6">No quiz questions available for this lesson</div>;
        } else {
            return <QuizSkeleton />;
        }
      default:
        return (
          <div className="p-6 border border-yellow-500/30 rounded-md bg-yellow-900/10">
            <p>Unknown content type: {subLessonData.content_type}</p>
            <p>(Sub-Lesson ID: {subLessonData.id})</p>
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

      {renderContent()}
    </div>
  );
};

export default SubLessonPage; 