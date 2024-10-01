// 'use client';

// import { useRouter } from 'next/router';

// const lessonsData = {
//   "role-based-training": [
//     { id: 1, title: "Introduction to Role-Based Training", description: "Learn the basics of role-based training." },
//     { id: 2, title: "Advanced Techniques", description: "Deep dive into advanced role-based training techniques." },
//     // Add more lessons...
//   ],
//   // Add other slugs...
// };

// const LessonPage = () => {
//   const router = useRouter();
//   const { slug } = router.query;

//   const lessons = lessonsData[slug as string];

//   if (!lessons) {
//     return <div>Lessons not found</div>;
//   }

//   return (
//     <div className="bg-gray-900 text-gray-100 min-h-screen p-8">
//       <h1 className="text-4xl font-bold mb-8">{slug?.replace("-", " ")}</h1>
//       <div className="space-y-4">
//         {lessons.map((lesson) => (
//           <div key={lesson.id} className="p-4 bg-gray-800 rounded-lg">
//             <h2 className="text-2xl font-semibold">{lesson.title}</h2>
//             <p className="text-gray-400 mt-2">{lesson.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LessonPage;


'use client';

import { useRouter } from 'next/router';

const lessonsData = {
  "introduction-to-role-based-training": {
    title: "Introduction to Role-Based Training",
    description: "Learn the basics of role-based training."
  },
  "advanced-role-based-techniques": {
    title: "Advanced Techniques",
    description: "Deep dive into advanced role-based training techniques."
  }
  // Add more lessons...
};

const LessonPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const lesson = lessonsData[slug as string];

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">{lesson.title}</h1>
      <p className="text-gray-400">{lesson.description}</p>
    </div>
  );
};

export default LessonPage;
