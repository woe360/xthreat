'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const tagColors: Record<string, { border: string, bg: string }> = {
  All: { border: 'border-gray-500 hover:bg-gray-500', bg: 'bg-gray-500' },
  Phishing: { border: 'border-blue-700 hover:bg-blue-700', bg: 'bg-blue-700' },
  "Risk management": { border: 'border-green-900 hover:bg-green-900', bg: 'bg-green-900' },
  Compliance: { border: 'border-yellow-700 hover:bg-yellow-700', bg: 'bg-yellow-700' },
  "Incident response": { border: 'border-red-800 hover:bg-red-800', bg: 'bg-red-800' },
  "Role-based": { border: 'border-purple-800 hover:bg-purple-800', bg: 'bg-purple-800' },
};

const componentStyle = {
  background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
};

const Lessons = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/modules');
        const data = await response.json();
        setModules(data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === 'All' ? null : tag);
  };

  const filteredModules = selectedTag
    ? modules.filter((module) => module.tags.includes(selectedTag))
    : modules;

  const tags = Object.keys(tagColors);

  return (
    <div className="min-h-min flex flex-col gap-4 p-6 font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white">
      <h1 className="text-3xl top-0 font-light p-1 z-10 bg-transparent flex items-center">
        Modules
      </h1>
      {/* <div className="flex gap-4 mt-4">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-2 rounded-lg border ${
              selectedTag === tag ? tagColors[tag].bg : tagColors[tag].border
            } text-white`}
          >
            {tag}
          </button>
        ))}
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredModules.map((module, index) => (
          <Link href={`/modules/${module.slug}`} key={index} > 
            <div className="p-4 rounded-lg bg-black border border-neutral-700 hover:background: linear-gradient(180deg, #1F2429 0%, #000000 100%);] cursor-pointer flex flex-col justify-between h-full" style={componentStyle}>
              <div className="flex flex-col flex-grow">
                <h2 className="text-2xl font-bold">{module.title}</h2>
                <p className="mt-2 text-gray-400 flex-grow">{module.description}</p>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 justify-end">
                {module.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className={`text-sm rounded-lg px-3 py-1 ${tagColors[tag]?.bg || 'bg-gray-500'} text-white`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
