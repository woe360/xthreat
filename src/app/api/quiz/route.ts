import { NextResponse } from 'next/server';
import { Quiz } from '../../../../browser-extention/src/types';

const quizzes: Quiz[] = [
  {
    question: "Ką daryti gavus įtartiną el. laišką?",
    options: [
      "Atidaryti priedą, kad patikrinti turinį",
      "Persiųsti kolegoms",
      "Pranešti IT saugumo skyriui",
      "Ištrinti laišką"
    ],
    correctAnswer: 2
  },
  // Pridėkite daugiau klausimų...
];

export async function GET() {
  const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
  return NextResponse.json(randomQuiz);
} 