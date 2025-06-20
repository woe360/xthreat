'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Star } from 'lucide-react';
import { safeFetch } from '@/lib/utils';

interface Module {
  id: number;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

interface Lesson {
  id: number;
  title: string;
  slug: string;
  module_id: number;
  lesson_order: number;
  description?: string;
  module?: {
    slug: string;
    title: string;
  };
}

interface TagColors {
  border: string;
  bg: string;
}

const tagColors: Record<string, TagColors> = {
  Threats: { border: 'border-blue-500', bg: 'bg-blue-500/10 text-blue-300' },
  "Security Best Practices": { border: 'border-green-500', bg: 'bg-green-500/10 text-green-300' },
  "Compliance & Regulations": { border: 'border-yellow-500', bg: 'bg-yellow-500/10 text-yellow-300' },
  "Incident Response": { border: 'border-red-500', bg: 'bg-red-500/10 text-red-300' },
  "Risk Management": { border: 'border-purple-500', bg: 'bg-purple-500/10 text-purple-300' },
  "Role-Based": { border: 'border-indigo-500', bg: 'bg-indigo-500/10 text-indigo-300' },
};

interface DashboardModuleCardProps {
  title: string;
  icon: React.ReactNode | null;
  module: Module | null;
  loading?: boolean;
}

interface DashboardLessonCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode | null;
  lesson: Lesson | null;
  module: Module | null;
  loading?: boolean;
}

const DashboardModuleCard: React.FC<DashboardModuleCardProps> = ({ title, icon, module, loading }) => {
  if (loading) {
    return (
      <div className="p-8 h-full min-h-[240px] bg-[#121212] border border-white/10 rounded">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">{title}</h3>
        </div>
        <div className="animate-pulse">
          <div className="h-5 bg-neutral-700 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-neutral-700 rounded mb-3 w-full"></div>
          <div className="h-4 bg-neutral-700 rounded mb-5 w-2/3"></div>
          <div className="flex gap-2">
            <div className="h-7 bg-neutral-700 rounded-full w-20"></div>
            <div className="h-7 bg-neutral-700 rounded-full w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="p-8 h-full min-h-[240px] bg-[#121212] border border-white/10 rounded flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">{title}</h3>
        </div>
        <p className="text-neutral-400 text-base mb-6">No modules available</p>
        <Link href="/modules" className="text-blue-400 hover:text-blue-300 text-base flex items-center gap-2">
          Browse modules <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 h-full min-h-[240px] bg-[#121212] border border-white/10 rounded">
      <div className="mb-6">
        <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">{title}</h3>
      </div>
      
      <Link href={`/modules/${module.slug}`} className="group block">
        <div className="transition-all hover:bg-neutral-800/30 rounded p-4 -m-4">
          <h4 className="text-lg font-medium text-neutral-100 mb-3 group-hover:text-white transition-colors line-clamp-2">
            {module.title}
          </h4>
          <p className="text-neutral-400 text-base mb-4 line-clamp-3 group-hover:text-neutral-300 transition-colors">
            {module.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {module.tags.slice(0, 2).map((tag, tagIndex) => (
              <span
                key={`${module.id}-${tagIndex}`}
                className={`text-sm rounded-full px-3 py-1 ${tagColors[tag]?.bg || 'bg-neutral-500/10 text-neutral-400'}`}
              >
                {tag}
              </span>
            ))}
            {module.tags.length > 2 && (
              <span className="text-sm text-neutral-500">
                +{module.tags.length - 2} more
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

const DashboardLessonCard: React.FC<DashboardLessonCardProps> = ({ title, subtitle, icon, lesson, module, loading }) => {
  if (loading) {
    return (
      <div className="p-8 h-full min-h-[240px] bg-[#121212] border border-white/10 rounded">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">{title}</h3>
          <p className="text-neutral-400 text-sm">{subtitle}</p>
        </div>
        <div className="animate-pulse">
          <div className="h-5 bg-neutral-700 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-neutral-700 rounded mb-3 w-full"></div>
          <div className="h-4 bg-neutral-700 rounded mb-5 w-2/3"></div>
          <div className="flex gap-2">
            <div className="h-7 bg-neutral-700 rounded-full w-20"></div>
            <div className="h-7 bg-neutral-700 rounded-full w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson || !module) {
    return (
      <div className="p-8 h-full min-h-[240px] bg-[#121212] border border-white/10 rounded flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">{title}</h3>
          <p className="text-neutral-400 text-sm">{subtitle}</p>
        </div>
        <p className="text-neutral-400 text-base mb-6">No lessons available</p>
        <Link href="/modules" className="text-blue-400 hover:text-blue-300 text-base flex items-center gap-2">
          Browse modules <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 h-full min-h-[240px] bg-[#121212] border border-white/10 rounded">
      <div className="mb-6 flex items-center gap-3">
        {icon && <div className="text-blue-400">{icon}</div>}
        <div>
          <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">{title}</h3>
          <p className="text-neutral-400 text-sm">{subtitle}</p>
        </div>
      </div>
      
      <Link href={`/modules/${module.slug}/${lesson.id}`} className="group block">
        <div className="transition-all hover:bg-neutral-800/30 rounded p-4 -m-4">
          <h4 className="text-lg font-medium text-neutral-100 mb-3 group-hover:text-white transition-colors line-clamp-2">
            {lesson.title}
          </h4>
          <p className="text-neutral-400 text-base mb-4 line-clamp-2 group-hover:text-neutral-300 transition-colors">
            From {module.title}
          </p>
          <div className="flex flex-wrap gap-2">
            {module.tags.slice(0, 2).map((tag, tagIndex) => (
              <span
                key={`${module.id}-${tagIndex}`}
                className={`text-sm rounded-full px-3 py-1 ${tagColors[tag]?.bg || 'bg-neutral-500/10 text-neutral-400'}`}
              >
                {tag}
              </span>
            ))}
            {module.tags.length > 2 && (
              <span className="text-sm text-neutral-500">
                +{module.tags.length - 2} more
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export const LastModuleCard: React.FC = () => {
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastModule = async () => {
      try {
        // Get phishing awareness module directly
        const { data: moduleData, error: moduleError } = await safeFetch('/api/modules/phishing-awareness');
        if (moduleData) {
          setModule(moduleData);
        } else if (moduleError) {
          console.warn('Error fetching phishing awareness module:', moduleError);
        }
      } catch (error) {
        console.warn('Error fetching last module:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLastModule();
  }, []);

  return (
    <DashboardModuleCard
      title="Continue Learning"
      icon={<BookOpen className="w-5 h-5" />}
      module={module}
      loading={loading}
    />
  );
};

export const UpcomingModuleCard: React.FC = () => {
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingModule = async () => {
      try {
        const { data: modules, error } = await safeFetch('/api/modules');
        if (modules && Array.isArray(modules)) {
          // Find a different module than phishing awareness
          const upcomingModule = modules.find(m => 
            m.slug !== 'phishing-awareness' && 
            (m.tags.includes('Security Best Practices') || m.tags.includes('Compliance & Regulations'))
          ) || modules.find(m => m.slug !== 'phishing-awareness') || modules[1];
          setModule(upcomingModule || null);
        } else if (error) {
          console.warn('Error fetching upcoming module:', error);
        }
      } catch (error) {
        console.warn('Error fetching upcoming module:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingModule();
  }, []);

  return (
    <DashboardModuleCard
      title="Recommended Next"
      icon={<Star className="w-5 h-5 text-yellow-400" />}
      module={module}
      loading={loading}
    />
  );
};

export const RandomModuleCard: React.FC = () => {
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomModule = async () => {
      try {
        const { data: modules, error } = await safeFetch('/api/modules');
        if (modules && Array.isArray(modules)) {
          // Get a random module that's different from the ones likely shown above
          const availableModules = modules.filter(m => 
            m.slug !== 'phishing-awareness' && 
            !m.tags.includes('Security Best Practices') && 
            !m.tags.includes('Compliance & Regulations')
          );
          
          if (availableModules.length === 0) {
            // Fallback to any module except phishing
            const fallbackModules = modules.filter(m => m.slug !== 'phishing-awareness');
            const randomIndex = Math.floor(Math.random() * fallbackModules.length);
            setModule(fallbackModules[randomIndex] || null);
          } else {
            const randomIndex = Math.floor(Math.random() * availableModules.length);
            setModule(availableModules[randomIndex] || null);
          }
        } else if (error) {
          console.warn('Error fetching random module:', error);
        }
      } catch (error) {
        console.warn('Error fetching random module:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomModule();
  }, []);

  return (
    <DashboardModuleCard
      title="Explore Something New"
      icon={null}
      module={module}
      loading={loading}
    />
  );
}; 