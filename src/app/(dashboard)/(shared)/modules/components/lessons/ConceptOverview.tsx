import React, { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ConceptOverviewProps {
  // Props to define the content - could be passed as structured data or individual strings
  title?: string;
  paragraphs?: string[];
  keyConcepts?: string[];
  onComplete?: () => void;
  // Navigation props
  moduleSlug?: string;
  currentLessonSlug?: string;
}

interface Lesson {
  id: number;
  title: string;
  slug: string;
  module_id: number;
  order_index: number;
}

const ConceptOverview: React.FC<ConceptOverviewProps> = ({
  title = "Introduction to Phishing", 
  paragraphs = [
    "Phishing is a common cyber attack where scammers attempt to trick you into revealing sensitive information, such as login credentials or financial details.",
    "These attacks often masquerade as legitimate communications from trusted sources. Understanding how phishing works is the first step towards protecting yourself and your organization."
  ], 
  keyConcepts = [
    "Definition: Phishing uses deceptive emails, messages, or websites to steal personal data.",
    "Common Tactics: Urgency, threats, requests for sensitive info, suspicious links/attachments.",
    "Impact: Can lead to identity theft, financial loss, and unauthorized access to systems.",
    "Prevention: Verify sender identity, scrutinize links/attachments, report suspicious messages."
  ], 
  onComplete,
  moduleSlug,
  currentLessonSlug
}) => {

  // State to manage the view: overview or stepping through concepts or completed
  const [viewState, setViewState] = useState<'overview' | 'concepts' | 'completed'>('overview');
  // State to track the current concept index
  const [currentConceptIndex, setCurrentConceptIndex] = useState(0);
  // State for next lesson
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Fetch next lesson when component mounts
  useEffect(() => {
    const fetchNextLesson = async () => {
      if (!moduleSlug || !currentLessonSlug) return;
      
      setLoading(true);
      try {
        // Fetch all lessons for the current module
        const response = await fetch(`/api/modules/${moduleSlug}/lessons`);
        if (!response.ok) throw new Error('Failed to fetch lessons');
        
        const lessons: Lesson[] = await response.json();
        
        // Sort lessons by order_index
        const sortedLessons = lessons.sort((a, b) => a.order_index - b.order_index);
        
        // Find current lesson index
        const currentIndex = sortedLessons.findIndex(lesson => lesson.slug === currentLessonSlug);
        
        // Get next lesson if it exists
        if (currentIndex >= 0 && currentIndex < sortedLessons.length - 1) {
          setNextLesson(sortedLessons[currentIndex + 1]);
        } else {
          setNextLesson(null);
        }
      } catch (error) {
        console.error('Error fetching next lesson:', error);
        setNextLesson(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNextLesson();
  }, [moduleSlug, currentLessonSlug]);

  const handleAdvance = () => {
    if (viewState === 'overview') {
      // Move from overview to the first concept
      setViewState('concepts');
      setCurrentConceptIndex(0); 
    } else if (viewState === 'concepts') {
      // Check if there are more concepts
      if (currentConceptIndex < keyConcepts.length - 1) {
        // Move to the next concept
        setCurrentConceptIndex(prevIndex => prevIndex + 1);
      } else {
        // Last concept finished, move to completed state
        setViewState('completed');
        if (onComplete) {
          onComplete();
        }
      }
    }
  };

  // Determine button text based on state
  let buttonText = "Continue";
  if (viewState === 'overview') {
    buttonText = "Understand Key Concepts";
  } else if (viewState === 'concepts') {
    if (currentConceptIndex < keyConcepts.length - 1) {
      buttonText = "Next Concept";
    } else {
      buttonText = "Finish Lesson"; // Or keep as "Continue"
    }
  }

  return (
    // Match container style from other lesson components
    <div className="max-w-3xl w-full mx-auto py-12 px-4">
      {/* Optional Header could go here if needed, similar to Quiz/Inspector */}
      {/* <div className="flex justify-between items-center mb-8 text-sm text-neutral-500">
        <span>Introduction</span>
      </div> */}

      {/* Main Content Area */} 
      <div className="bg-black/20 border border-gray-800/40 rounded-lg p-6 sm:p-8 min-h-[300px] flex flex-col justify-between">
        
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8 flex items-center gap-3">
          <BookOpen size={24} className="text-neutral-400"/> 
          {title}
        </h2>

        {/* Content: Show overview, current concept, or completion */}
        <div>
          {viewState === 'overview' && (
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base mb-8">
              {paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
          )}

          {viewState === 'concepts' && keyConcepts.length > 0 && (
             // Display the current concept
            <div className="mb-8">
               <h3 className="text-lg font-medium text-neutral-200 mb-4">
                 Key Concept {currentConceptIndex + 1} / {keyConcepts.length}
               </h3>
               <div className="p-4 border border-gray-700/80 bg-gray-800/30 rounded-lg">
                 <p className="text-neutral-200 text-base">
                   {keyConcepts[currentConceptIndex]}
                 </p>
               </div>
            </div>
          )}

          {viewState === 'completed' && (
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <CheckCircle size={48} className="text-green-500" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Lesson Complete!</h3>
              <p className="text-neutral-400">Great job! You've successfully completed this lesson.</p>
            </div>
          )}
        </div>

        {/* Footer Navigation/Action Button */} 
        {viewState === 'completed' ? (
          // Show navigation buttons when completed
          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-800/40">
            <Link
              href="/modules"
              className="inline-flex items-center justify-center px-6 py-3 border rounded-lg transition text-sm font-medium 
                border-gray-600 bg-gray-700/30 text-gray-300 hover:bg-gray-700/50 hover:text-white"
            >
              <ArrowLeft size={16} className="mr-1.5" />
              Back to Modules
            </Link>
            
            {nextLesson && moduleSlug && (
              <Link
                href={`/modules/${moduleSlug}/${nextLesson.slug}`}
                className="inline-flex items-center justify-center px-6 py-3 border rounded-lg transition text-sm font-medium 
                  border-white/50 bg-white/20 text-white hover:bg-white/30"
              >
                Next Lesson <ChevronRight size={16} className="ml-1.5" />
              </Link>
            )}
          </div>
        ) : (
          // Show continue button for overview and concepts
          (keyConcepts.length > 0 || onComplete) && (
            <div className="flex justify-end mt-8 pt-6 border-t border-gray-800/40">
              <button
                onClick={handleAdvance}
                className={`inline-flex items-center px-6 py-3 border rounded-lg transition text-sm font-medium 
                  border-white/50 bg-white/20 text-white hover:bg-white/30 
                `}
              >
                {buttonText} <ChevronRight size={16} className="ml-1.5" />
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ConceptOverview; 