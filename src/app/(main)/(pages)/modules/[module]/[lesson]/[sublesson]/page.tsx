import { Metadata } from 'next';

interface QuizQuestion {
  id: string;
  question_text: string;
  explanation: string;
  order_number: number;
  quiz_answers: {
    id: string;
    answer_text: string;
    is_correct: boolean;
  }[];
}

interface LessonData {
  id: number;
  title: string;
  content: string;
  sub_lessons: {
    id: string;
    title: string;
    content: string;
    order: number;
  }[];
}

async function getQuizData(sublessonId: string): Promise<QuizQuestion[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quiz/${sublessonId}`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Nepavyko gauti duomenų');
  }

  return response.json();
}

async function getLessonData(moduleId: string, lessonId: string): Promise<LessonData> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/modules/${moduleId}/lessons/${lessonId}`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Nepavyko gauti pamokos duomenų');
  }

  return response.json();
}

export default async function SubLessonPage({
  params
}: {
  params: {
    module: string;
    lesson: string;
    sublesson: string;
  }
}) {
  const { module: moduleId, lesson: lessonId, sublesson: sublessonId } = params;
  
  const [quizData, lessonData] = await Promise.all([
    getQuizData(sublessonId),
    getLessonData(moduleId, lessonId)
  ]);

  return (
    <div className="page-container">
      <h1>Testas</h1>
      {/* Čia galite naudoti tiek quizData, tiek lessonData */}
    </div>
  );
}