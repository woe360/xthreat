'use client'
import React, { useState } from 'react';
import { BookOpen, Users, Timer, BarChart2, Play, Plus, Edit, Trash2, Star, Filter } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Module {
  id: number;
  title: string;
  description: string;
  duration: number;
  completionRate: number;
  averageScore: number;
  difficulty: 'Novice' | 'Proficient' | 'Master';
  status: 'active' | 'draft' | 'archived';
  lastUpdated: string;
  ratings: number;
}

const TrainingsPage = () => {
  const engagementData = [
    { month: 'Jan', value: 75 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 82 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 88 },
    { month: 'Jun', value: 92 },
  ];

  const completionData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 70 },
    { month: 'Mar', value: 75 },
    { month: 'Apr', value: 78 },
    { month: 'May', value: 82 },
    { month: 'Jun', value: 85 },
  ];

  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "Phishing Awareness Basics",
      description: "Learn to identify and avoid phishing attempts",
      duration: 45,
      completionRate: 88,
      averageScore: 92,
      difficulty: "Novice",
      status: 'active',
      lastUpdated: "2024-11-01",
      ratings: 4.8
    },
    {
      id: 2,
      title: "Password Security",
      description: "Best practices for password management",
      duration: 30,
      completionRate: 92,
      averageScore: 88,
      difficulty: "Novice",
      status: 'active',
      lastUpdated: "2024-11-05",
      ratings: 4.6
    },
    {
      id: 3,
      title: "Advanced Social Engineering",
      description: "Deep dive into social engineering tactics",
      duration: 60,
      completionRate: 75,
      averageScore: 85,
      difficulty: "Proficient",
      status: 'active',
      lastUpdated: "2024-11-10",
      ratings: 4.9
    }
  ]);

  const StatCard = ({ title, value, trend, data, color, percentageChange }) => (
    <div className="bg-[#050607] border border-gray-300/10 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <span className={`bg-${color}-500/20 text-${color}-400 text-xs px-2 py-1 rounded`}>
          +{percentageChange}%
        </span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold mb-1">{value}</p>
          <p className="text-sm text-gray-400">{trend}</p>
        </div>
        <div className="w-32 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={`var(--${color}-500)`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const getDifficultyBadge = (difficulty: string) => {
    const styles = {
      Novice: 'bg-green-500/20 text-green-400',
      Proficient: 'bg-yellow-500/20 text-yellow-400',
      Master: 'bg-purple-500/20 text-purple-400'
    };
    return <span className={`${styles[difficulty]} text-xs px-2 py-1 rounded`}>{difficulty}</span>;
  };

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
      <div>
        <div className="flex justify-between items-center mb-8 mt-1">
          <h1 className="text-xl font-base text-white">Trainings</h1>
          <button className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors">
            <Plus size={20} className="mr-2" />
            New Module
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Average Engagement"
            value="92%"
            trend="User interaction rate"
            data={engagementData}
            color="blue"
            percentageChange={8}
          />
          
          <StatCard
            title="Completion Rate"
            value="85%"
            trend="Across all modules"
            data={completionData}
            color="green"
            percentageChange={5}
          />
          
          <StatCard
            title="Active Learners"
            value="1,248"
            trend="Currently enrolled"
            data={completionData}
            color="purple"
            percentageChange={12}
          />
        </div>

        {/* Modules Table */}
        <div className="bg-[#050607] border border-gray-300/10 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-300/10 flex justify-between items-center">
            <h2 className="text-lg font-medium">Training Modules</h2>
            <button className="text-gray-400 hover:text-gray-300 transition-colors">
              <Filter size={20} />
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300/10">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Module</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stats</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Difficulty</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {modules.map((module) => (
                <tr key={module.id} className="hover:bg-gray-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <BookOpen size={20} className="text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-white">{module.title}</div>
                        <div className="text-sm text-gray-400">{module.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">Completion: {module.completionRate}%</div>
                    <div className="text-sm text-gray-400">Avg. Score: {module.averageScore}%</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-300">
                      <Timer size={16} className="mr-2" />
                      {module.duration} min
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getDifficultyBadge(module.difficulty)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-300">{module.ratings}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-3">
                      <button className="text-gray-400 hover:text-green-400 transition-colors">
                        <Play size={20} />
                      </button>
                      <button className="text-gray-400 hover:text-blue-400 transition-colors">
                        <Edit size={20} />
                      </button>
                      <button className="text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainingsPage;