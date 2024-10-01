'use client'

import React from 'react';
import { Link } from 'react-router-dom';

interface Lesson {
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  path: string;
}

interface ModuleProps {
  moduleName: string;
  moduleDescription: string;
  lessons: Lesson[];
}

const ModulePage: React.FC<ModuleProps> = ({ moduleName, moduleDescription, lessons }) => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8">
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={() => window.history.back()}
          className="text-gray-400 hover:text-white transition duration-200"
        >
          ← Back
        </button>
      </div>

      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">{moduleName}</h1>
        <p className="text-gray-400 mt-2">{moduleDescription}</p>
        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
          Start Course
        </button>
      </div>

      {/* Lessons Overview */}
      <div className="space-y-6">
        {lessons.map((lesson, index) => (
          <Link
            key={index}
            to={lesson.path}
            className="block bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div>
                  <h3 className="text-xl font-semibold">{lesson.title}</h3>
                  <p className="text-gray-400">{lesson.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">{lesson.duration}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Example Usage
const lessonsData: Lesson[] = [
  { title: 'Phishing Awareness', description: 'Learn to recognize phishing attempts.', duration: '5:00', completed: false, path: '/modules/phishing-awareness' },
  { title: 'Security Awareness', description: 'Interactive courses on security.', duration: '10:00', completed: true, path: '/modules/security-awareness' },
  { title: 'Dora Compliance', description: 'Comprehensive training on compliance.', duration: '7:30', completed: false, path: '/modules/dora-compliance' },
];

export default function App() {
  return (
    <ModulePage
      moduleName="Cybersecurity Awareness"
      moduleDescription="Improve your cybersecurity skills with these detailed lessons."
      lessons={lessonsData}
    />
  );
}


