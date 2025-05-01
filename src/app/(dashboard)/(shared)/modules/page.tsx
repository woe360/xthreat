'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ModuleSkeleton } from '@/app/(dashboard)/(shared)/modules/moduleSkeleton'
import { Search } from 'lucide-react';
import TimeTrackingDashboard from '@/components/streakTracker/StreakTracker';
import { subMonths, startOfDay, format } from 'date-fns';

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
  All: { border: 'border-gray-500', bg: 'bg-white/10 text-white' },
  Threats: { border: 'border-blue-500', bg: 'bg-blue-500/10 text-blue-300' },
  "Security Best Practices": { border: 'border-green-500', bg: 'bg-green-500/10 text-green-300' },
  "Compliance & Regulations": { border: 'border-yellow-500', bg: 'bg-yellow-500/10 text-yellow-300' },
  "Incident Response": { border: 'border-red-500', bg: 'bg-red-500/10 text-red-300' },
  "Risk Management": { border: 'border-purple-500', bg: 'bg-purple-500/10 text-purple-300' },
  "Role-Based": { border: 'border-indigo-500', bg: 'bg-indigo-500/10 text-indigo-300' },
};

const Modules: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [activeTab, setActiveTab] = useState('browse');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const tabs: HeaderTab[] = [
    { id: 'browse', label: 'Browse', count: 3 },
    { id: 'started', label: 'Started', count: 5 },
    { id: 'completed', label: 'Completed', count: 1 }
  ];

  useEffect(() => {
    const fetchModules = async (): Promise<void> => {
      try {
        setLoading(true)
        const response = await fetch('/api/modules');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Module[] = await response.json();
        setModules(data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchModules();
  }, []);

  const handleTagClick = (tag: string): void => {
    setSelectedTag(tag === 'All' ? null : tag);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredModules = modules
    .filter(module => 
      (!selectedTag || module.tags.includes(selectedTag)) && 
      (searchQuery === '' || module.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const tags: string[] = Object.keys(tagColors);

  if (loading) {
    return <ModuleSkeleton />
  }

  return (
    <main className="bg-[#050607] font-sans text-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="max-w-[1400px] mx-auto pb-2 px-4">
        <TimeTrackingDashboard />
      </div>

      {/* Sticky Tags Section */}
      <div className="sticky top-0 bg-[#050607]/80 backdrop-blur-md z-10 border-b border-gray-600/30 py-4 px-4">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    selectedTag === tag || (tag === 'All' && !selectedTag)
                      ? tagColors[tag].bg
                      : 'bg-[#0a0a0a] border border-gray-600/30 hover:border-gray-700 text-gray-400'
                  } transition-all`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search modules..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full bg-[#0a0a0a] border border-gray-600/30 focus:border-gray-400/30 rounded-full px-4 py-1.5 pl-9 text-white text-sm outline-none"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Modules Content */}
      <div className="max-w-[1400px] mx-auto py-8 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModules.map((module) => (
            <Link href={`/modules/${module.slug}`} key={module.id} className="group">
              <div className="bg-black/20 border border-gray-600/20 hover:border-gray-500/30 rounded-lg p-6 h-full transition-all hover:shadow-lg hover:shadow-black/40"> 
                <div className="flex flex-col h-full">
                  <h2 className="text-md md:text-xl font-light text-white mb-2 group-hover:text-white/90">{module.title}</h2>
                  <p className="text-gray-400 text-sm md:text-base mb-4 flex-grow line-clamp-2 group-hover:text-gray-300">{module.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {module.tags.map((tag, tagIndex) => (
                      <span
                        key={`${module.id}-${tagIndex}`}
                        className={`text-xs md:text-sm rounded-full px-2.5 py-1 ${tagColors[tag]?.bg || 'bg-gray-500/10 text-gray-400'}`}
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