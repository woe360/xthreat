'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';


interface TagColors {
  border: string;
  bg: string;
}

interface Module {
  id: number;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

interface HeaderTab {
  id: string;
  label: string;
  count?: number;
}

const tagColors: Record<string, TagColors> = {
  All: { border: 'border-gray-500', bg: 'bg-gray-200/70 text-gray-900' },
  Threats: { border: 'border-blue-500', bg: 'bg-blue-500/20 text-blue-400' },
  "Security Best Practices": { border: 'border-green-500', bg: 'bg-green-500/20 text-green-400' },
  "Compliance & Regulations": { border: 'border-yellow-500', bg: 'bg-yellow-500/20 text-yellow-400' },
  "Incident Response": { border: 'border-red-500', bg: 'bg-red-500/20 text-red-400' },
  "Risk Management": { border: 'border-purple-500', bg: 'bg-purple-500/20 text-purple-400' },
  "Role-Based": { border: 'border-indigo-500', bg: 'bg-indigo-500/20 text-indigo-400' },
};

const Modules: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [activeTab, setActiveTab] = useState('browse');
  
  const tabs: HeaderTab[] = [
    { id: 'browse', label: 'Browse', count: 3 },
    { id: 'started', label: 'Started', count: 5 },
    { id: 'completed', label: 'Completed', count: 1 }
  ];

  useEffect(() => {
    const fetchModules = async (): Promise<void> => {
      try {
        const response = await fetch('http://localhost:5000/api/modules');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Module[] = await response.json();
        setModules(data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, []);

  const handleTagClick = (tag: string): void => {
    setSelectedTag(tag === 'All' ? null : tag);
  };

  const filteredModules = selectedTag
    ? modules.filter((module) => module.tags.includes(selectedTag))
    : modules;

  const tags: string[] = Object.keys(tagColors);


  
  return (
    <main className="bg-[#050607] font-sans text-gray-100 min-h-screen">
      {/* Header Section */}
        <div className="mx-10">
          <div className="border-b border-gray-800">
            <div className=" py-4">
              <h1 className="text-xl font-medium mb-4 mt-3">Courses</h1>
              <p className="text-gray-400 w-3/5 text-sm mb-8">
                Master cybersecurity essentials with our comprehensive learning paths. From threat detection and incident response
                to compliance frameworks and security best practices - enhance your organization's security posture with
                practical, industry-aligned courses designed for modern security challenges.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Tags Section */}
        <div className="sticky top-0 bg-[#050607] z-[50]">
          <div className="border-b border-gray-800 shadow-lg mx-10">
            <div className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex justify-start items-center gap-3 flex-grow">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`px-3 py-1 rounded-lg ${
                        selectedTag === tag || (tag === 'All' && !selectedTag)
                          ? tagColors[tag].bg
                          : 'bg-[#050607] border border-gray-800 hover:border-gray-700 text-gray-400'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Modules Content */}
      <div className="px-10 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredModules.map((module) => (
            <Link href={`/modules/${module.slug}`} key={module.id} className="h-[220px]">
              <div className="bg-[#181b24] hover:bg-[#181b24]/80 border border-transparent hover:border-gray-800  mb-6 rounded-lg p-6 cursor-pointer h-full"> 
                <div className="flex flex-col h-full">
                  <h2 className="text-xl font-base mb-2 text-gray-100">{module.title}</h2>
                  <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-2">{module.description}</p>
                  <div className="flex justify-end flex-wrap gap-2 mt-auto">
                    {module.tags.map((tag, tagIndex) => (
                      <span
                        key={`${module.id}-${tagIndex}`}
                        className={`text-sm rounded-lg px-3 py-1 ${tagColors[tag]?.bg || 'bg-gray-500/20 text-gray-400'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
    </main>
  );
};

export default Modules;