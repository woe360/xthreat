import React from 'react';
import { BookOpen, Clock, ArrowRight, CheckCircle, Award, TrendingUp } from 'lucide-react';

const RecentLessons = () => {
  const lessons = [
    {
      title: 'Phishing Awareness',
      progress: 'Completed',
      date: 'Sep 01, 2024',
      level: 1,
    },
    {
      title: 'Ransomware Defense',
      progress: 'In Progress',
      date: 'Aug 31, 2024',
      level: 2,
    },
    {
      title: 'Incident Response',
      progress: 'Not Started',
      date: 'Aug 29, 2024',
      level: 3,
    },
  ];

  const getProgressColor = (progress) => {
    switch (progress) {
      case 'Completed':
        return 'text-emerald-500';
      case 'In Progress':
        return 'text-amber-500';
      default:
        return 'text-neutral-400';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {lessons.map((lesson, index) => (
        <div
          key={index}
          className="bg-gray-800 border border-neutral-700 p-4 rounded-lg flex flex-col justify-between transition-all hover:bg-neutral-750 hover:border-neutral-600"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <BookOpen className="w-5 h-5 mt-1 mr-3 text-neutral-400 flex-shrink-0" />
                <h3 className="text-lg font-semibold text-neutral-200 break-words">
                  {lesson.title}
                </h3>
              </div>
              <span
                className={`${getProgressColor(lesson.progress)} font-semibold text-xs px-2 py-1 rounded-l bg-opacity-20 ${
                  lesson.progress === 'Completed' ? 'bg-emerald-900' : 
                  lesson.progress === 'In Progress' ? 'bg-amber-900' : 'bg-neutral-700'
                } ml-2 flex-shrink-0`}
              >
                {lesson.progress}
              </span>
            </div>
            <div className="flex items-center text-sm text-neutral-400">
              <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">Last Accessed: {lesson.date}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-neutral-300 font-semibold">Level {lesson.level}</span>
            <button className="text-neutral-200 hover:text-neutral-100 transition-colors flex items-center">
              Continue <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      ))}

      {/* Completed Lessons Card */}
      <div className="bg-gray-800 border border-neutral-700 p-4 rounded-lg flex flex-col justify-between transition-all hover:bg-neutral-750 hover:border-neutral-600">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 mt-1 mr-3 text-emerald-500 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-neutral-200">
              Completed Lessons
            </h3>
          </div>
        </div>
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-sm text-neutral-400">
            <Award className="w-4 h-4 mr-1 text-yellow-500 flex-shrink-0" />
            <span>24 Total Completed</span>
          </div>
          <div className="flex items-center text-sm text-neutral-200">
            <TrendingUp className="w-4 h-4 mr-1 text-emerald-500 flex-shrink-0" />
            <span>85% Avg. Score</span>
          </div>
        </div>
        <button className="w-full bg-gray-700 hover:bg-neutral-600 text-neutral-200 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center mt-4">
          View All <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default RecentLessons;


// import React from 'react';
// import { BookOpen, Clock, ArrowRight, CheckCircle, Award, TrendingUp } from 'lucide-react';

// const RecentLessons = () => {
//   const lessons = [
//     {
//       title: 'Phishing Awareness',
//       progress: 'Completed',
//       date: 'Sep 01, 2024',
//       level: 1,
//     },
//     {
//       title: 'Ransomware Defense',
//       progress: 'In Progress',
//       date: 'Aug 31, 2024',
//       level: 2,
//     },
//     {
//       title: 'Incident Response',
//       progress: 'Not Started',
//       date: 'Aug 29, 2024',
//       level: 3,
//     },
//   ];

//   const getProgressColor = (progress) => {
//     switch (progress) {
//       case 'Completed':
//         return 'text-emerald-500';
//       case 'In Progress':
//         return 'text-amber-500';
//       default:
//         return 'text-neutral-400';
//     }
//   };

//   return (
//     <div className="flex flex-col space-y-4 w-full">
//       {lessons.map((lesson, index) => (
//         <div
//           key={index}
//           className="bg-gray-800 border border-neutral-700 p-4 rounded-lg flex flex-col justify-between transition-all hover:bg-neutral-750 hover:border-neutral-600"
//         >
//           <div className="flex flex-col space-y-2">
//             <div className="flex items-start justify-between">
//               <div className="flex items-start">
//                 <BookOpen className="w-5 h-5 mt-1 mr-3 text-neutral-400 flex-shrink-0" />
//                 <h3 className="text-lg font-semibold text-neutral-200 break-words">
//                   {lesson.title}
//                 </h3>
//               </div>
//               <span
//                 className={`${getProgressColor(lesson.progress)} font-semibold text-xs px-2 py-1 rounded-l bg-opacity-20 ${
//                   lesson.progress === 'Completed' ? 'bg-emerald-900' :
//                   lesson.progress === 'In Progress' ? 'bg-amber-900' : 'bg-neutral-700'
//                 } ml-2 flex-shrink-0`}
//               >
//                 {lesson.progress}
//               </span>
//             </div>
//             <div className="flex items-center text-sm text-neutral-400">
//               <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
//               <span className="truncate">Last Accessed: {lesson.date}</span>
//             </div>
//           </div>
//           <div className="flex justify-between items-center mt-4">
//             <span className="text-neutral-300 font-semibold">Level {lesson.level}</span>
//             <button className="text-neutral-200 hover:text-neutral-100 transition-colors flex items-center">
//               Continue <ArrowRight className="w-4 h-4 ml-1" />
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* Completed Lessons Card */}
//       <div className="bg-gray-800 border border-neutral-700 p-4 rounded-lg flex flex-col justify-between transition-all hover:bg-neutral-750 hover:border-neutral-600">
//         <div className="flex items-start justify-between">
//           <div className="flex items-start">
//             <CheckCircle className="w-5 h-5 mt-1 mr-3 text-emerald-500 flex-shrink-0" />
//             <h3 className="text-lg font-semibold text-neutral-200">
//               Completed Lessons
//             </h3>
//           </div>
//         </div>
//         <div className="mt-2 space-y-2">
//           <div className="flex items-center text-sm text-neutral-400">
//             <Award className="w-4 h-4 mr-1 text-yellow-500 flex-shrink-0" />
//             <span>24 Total Completed</span>
//           </div>
//           <div className="flex items-center text-sm text-neutral-200">
//             <TrendingUp className="w-4 h-4 mr-1 text-emerald-500 flex-shrink-0" />
//             <span>85% Avg. Score</span>
//           </div>
//         </div>
//         <button className="w-full bg-gray-700 hover:bg-neutral-600 text-neutral-200 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center mt-4">
//           View All <ArrowRight className="w-4 h-4 ml-2" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RecentLessons;