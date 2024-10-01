// src/app/(main)/(pages)/lessons/[module]/[lesson]/page.tsx

// 'use client'
// pages/modules/[module]/[lesson]/page.tsx
import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// const LessonPage = () => {
//   const router = useRouter();
//   const { module, lesson } = router.query;  // Destructure module and lesson from query params

//   const [lessonData, setLessonData] = useState(null);

//   useEffect(() => {
//     if (module && lesson) {
//       // Fetch lesson data using both module and lesson slugs
//       const fetchLessonData = async () => {
//         try {
//           const response = await fetch(`/api/modules/${module}/lessons/${lesson}`);
//           const data = await response.json();
//           setLessonData(data);
//         } catch (error) {
//           console.error('Error fetching lesson:', error);
//         }
//       };

//       fetchLessonData();
//     }
//   }, [module, lesson]);

//   if (!lessonData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <h1 className="text-4xl font-bold">{lessonData.title}</h1>
//       <p className="mt-4 text-gray-700">{lessonData.content}</p>
//       <p className="mt-2 text-gray-600">Points: {lessonData.points}</p>
//     </div>
//   );
// };

// export default LessonPage;




// app/modules/[module]/[lesson]/page.tsx




// import React from 'react';

// interface LessonPageProps {
//   params: {
//     module: string;  // Dynamic module slug from the URL
//     lesson: string;  // Dynamic lesson slug from the URL
//   };
// }

// const LessonPage = async ({ params }: LessonPageProps) => {
//   const { module, lesson } = params;

//   // Fetch lesson data from your backend API using the module and lesson slugs
//   const response = await fetch(`http://localhost:5000/api/modules/${module}/lessons/${lesson}`);

//   // Handle the case where the lesson is not found
//   if (!response.ok) {
//     return <div>Lesson not found</div>;
//   }

//   const lessonData = await response.json();

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">{lessonData.title}</h1>
//       <p>{lessonData.content}</p>
//       <p className="mt-4 text-gray-600">Points: {lessonData.points}</p>
//       {/* Add more detailed rendering of lesson content here */}
//     </div>
//   );
// };

// export default LessonPage;

// app/modules/[module]/[lesson]/page.tsx

'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const LessonPage = () => {
  const { module, lesson } = useParams(); // Adjust to useParams for app router
  
  const [lessonData, setLessonData] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Add loading state to prevent infinite loading

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/modules/${module}/lessons/${lesson}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLessonData(data);
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        console.error('Error fetching lesson data:', error);
        setLoading(false); // Stop loading in case of error
      }
    };

    if (module && lesson) {
      fetchLessonData();
    }
  }, [module, lesson]);

  if (loading) {
    return <div>Loading...</div>; // Show loading until data is fetched
  }

  if (!lessonData) {
    return <div>Error: Lesson not found</div>; // Error case if lessonData is null
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{lessonData.title}</h1>
      <p>
        Level: {lessonData.level}
      </p>
      <p>
        Points: {lessonData.points}
      </p>
      <p>
        Topic ID: {lessonData.topic_id ? lessonData.topic_id : 'No topic assigned'}
      </p>
      {/* Render additional lesson content here */}
    </div>
  );
};

export default LessonPage;


//VEIKIA KAIP IR RODO LOADING....
// import React from 'react';

// interface LessonPageProps {
//   params: {
//     module: string;  // Dynamic module slug from the URL
//     lesson: string;  // Dynamic lesson slug from the URL
//   };
// }

// const LessonPage = async ({ params }: LessonPageProps) => {
//   const { module, lesson } = params;

//   console.log('Fetching lesson for module:', module, 'and lesson:', lesson);  // Debugging line

//   // Fetch lesson data from your backend API using the module and lesson slugs
//   const response = await fetch(`http://localhost:5000/api/modules/${module}/lessons/${lesson}`);

//   if (!response.ok) {
//     console.error('Failed to fetch lesson:', response.statusText);  // Log the error if any
//     return <div>Lesson not found</div>;
//   }

//   const lessonData = await response.json();
//   console.log('Fetched lesson data:', lessonData);  // Log fetched data

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">{lessonData.title}</h1>
//       <p>{lessonData.content}</p>
//       <p className="mt-4 text-gray-600">Points: {lessonData.points}</p>
//     </div>
//   );
// };

// export default LessonPage;




// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// const LessonPage = () => {
//   const router = useRouter();
//   const { module, lesson } = router.query;
//   const [lessonData, setLessonData] = useState(null);

//   useEffect(() => {
//     const fetchLessonData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/modules/${module}/lessons/${lesson}`);
//         const data = await response.json();
//         setLessonData(data);
//       } catch (error) {
//         console.error('Error fetching lesson data:', error);
//       }
//     };

//     if (module && lesson) {
//       fetchLessonData();
//     }
//   }, [module, lesson]);

//   if (!lessonData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">{lessonData.title}</h1>
//       <p>
//         {lessonData.content}
//       </p>
//       {/* Add more detailed rendering of lesson content here */}
//     </div>
//   );
// };

// export default LessonPage;
