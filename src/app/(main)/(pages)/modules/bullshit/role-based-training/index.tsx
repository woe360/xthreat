'use client';

import Link from 'next/link';

const lessons = [
  { slug: "introduction-to-role-based-training", title: "Introduction to Role-Based Training", description: "Learn the basics of role-based training." },
  { slug: "advanced-role-based-techniques", title: "Advanced Techniques", description: "Deep dive into advanced role-based training techniques." },
  // Add more lessons specific to role-based-training...
];

const RoleBasedTrainingList = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Role-Based Training Lessons</h1>
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link key={lesson.slug} href={`/lessons/role-based-training/${lesson.slug}`}>
            <div className="cursor-pointer p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300">
              <h2 className="text-2xl font-semibold">{lesson.title}</h2>
              <p className="text-gray-400 mt-2">{lesson.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoleBasedTrainingList;
