'use client'
import React, { useState } from 'react';
import { BookOpen, Users, Timer, BarChart2, Play, Plus, Edit, Trash2, Star, Filter, Search, ArrowUpDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"
import { Label } from "@/components/label"
import { Textarea } from "@/components/textarea"
import { Input } from "@/components/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select"
import { Button } from "@/components/button"
import { Card } from "@/components/card"

interface ContentSection {
  id: number;
  type: 'text' | 'video' | 'exercise' | 'quiz' | 'case-study' | 'simulation';
  title: string;
  content: any;
  order: number;
}

interface Answer {
  id: number;
  text: string;
  isCorrect?: boolean;
  feedback?: string;
}

interface Question {
  id: number;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'matching' | 'fill-blank';
  question: string;
  answers: Answer[];
  correctAnswers: string[];
  explanation: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  feedback?: {
    correct?: string;
    incorrect?: string;
    specific?: Record<string, string>;
  };
}

interface Exercise {
  id: number;
  type: 'scenario' | 'simulation' | 'role-play' | 'awareness';
  title: string;
  description: string;
  successCriteria: string[];
  scoring: {
    passingScore: number;
    maxScore: number;
    weightage?: number;
  };
  feedback: {
    success: string;
    failure: string;
    partial?: string;
  };
}

interface Module {
  id: number;
  title: string;
  description: string;
  topic: string;
  duration: number;
  completionRate: number;
  averageScore: number;
  difficulty: 'Novice' | 'Proficient' | 'Master';
  status: 'active' | 'draft' | 'archived';
  lastUpdated: string;
  ratings: number;
  thumbnail?: string;
  prerequisites?: string[];
  objectives?: string[];
  contentSections: ContentSection[];
  questions?: Question[];
  exercises?: Exercise[];
  settings: {
    availableFrom?: string;
    availableTo?: string;
    minScore: number;
    requireAllSections: boolean;
    timeLimit?: number;
    certification?: {
      name: string;
      badge: string;
    };
    notifications: {
      onStart: boolean;
      onComplete: boolean;
      onDue: boolean;
    };
  };
  analytics: {
    totalAttempts: number;
    averageTimeSpent: number;
    completionsByDepartment: Record<string, number>;
    questionStats: Record<number, {
      correctRate: number;
      avgTimeSpent: number;
    }>;
    feedback: {
      average: number;
      total: number;
      comments: string[];
    };
  };
  version: {
    number: string;
    changes: string[];
    publishedAt?: string;
    reviewedBy?: string;
  };
}

type SortableColumn = 'title' | 'topic' | 'completionRate' | 'difficulty' | 'ratings' | 'status';

interface ModuleFormData {
  title: string;
  description: string;
  topic: string;
  difficulty: 'Novice' | 'Proficient' | 'Master';
  objectives: string[];
  duration: number;
  prerequisites: string[];
  thumbnail?: File;
  contentSections: ContentSection[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  data: Array<{ month: string; value: number }>;
  color: 'green' | 'yellow' | 'red' | 'blue' | 'purple';
  percentageChange: number;
}

const CreateModuleDialog = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ModuleFormData>({
    title: '',
    description: '',
    topic: '',
    difficulty: 'Novice',
    objectives: [''],
    duration: 30,
    prerequisites: [],
    contentSections: []
  });

  const handleInputChange = (field: keyof ModuleFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...formData.objectives];
    newObjectives[index] = value;
    handleInputChange('objectives', newObjectives);
  };

  const addObjective = () => {
    handleInputChange('objectives', [...formData.objectives, '']);
  };

  const removeObjective = (index: number) => {
    const newObjectives = formData.objectives.filter((_, i) => i !== index);
    handleInputChange('objectives', newObjectives);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200">
          <Plus size={20} className="mr-2" />
          New Module
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-[#181b24] border-gray-800">
        <DialogHeader>
          <DialogTitle>Create New Training Module</DialogTitle>
          <DialogDescription>
            Build your training module step by step. Fill in the basic information to get started.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger 
              value="basic"
              className={step === 1 ? 'bg-blue-500/30 text-blue-400' : ''}
              onClick={() => setStep(1)}
            >
              Basic Info
            </TabsTrigger>
            <TabsTrigger 
              value="objectives"
              className={step === 2 ? 'bg-blue-500/30 text-blue-400' : ''}
              onClick={() => setStep(2)}
            >
              Objectives
            </TabsTrigger>
            <TabsTrigger 
              value="content"
              className={step === 3 ? 'bg-blue-500/30 text-blue-400' : ''}
              onClick={() => setStep(3)}
            >
              Content
            </TabsTrigger>
            <TabsTrigger 
              value="review"
              className={step === 4 ? 'bg-blue-500/30 text-blue-400' : ''}
              onClick={() => setStep(4)}
            >
              Review
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Module Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="bg-[#0f1117] border-gray-800"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-[#0f1117] border-gray-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Select 
                    value={formData.topic} 
                    onValueChange={(value) => handleInputChange('topic', value)}
                  >
                    <SelectTrigger className="bg-[#0f1117] border-gray-800">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Security Awareness">Security Awareness</SelectItem>
                      <SelectItem value="Security Fundamentals">Security Fundamentals</SelectItem>
                      <SelectItem value="Advanced Security">Advanced Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select 
                    value={formData.difficulty} 
                    onValueChange={(value: 'Novice' | 'Proficient' | 'Master') => handleInputChange('difficulty', value)}
                  >
                    <SelectTrigger className="bg-[#0f1117] border-gray-800">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Novice">Novice</SelectItem>
                      <SelectItem value="Proficient">Proficient</SelectItem>
                      <SelectItem value="Master">Master</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)}>Next: Objectives</Button>
            </div>
          </TabsContent>

          <TabsContent value="objectives" className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                {formData.objectives.map((objective, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={objective}
                      onChange={(e) => handleObjectiveChange(index, e.target.value)}
                      placeholder={`Objective ${index + 1}`}
                      className="bg-[#0f1117] border-gray-800"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeObjective(index)}
                      className="hover:bg-red-500/20 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addObjective}
                  className="w-full border-dashed border-gray-800"
                >
                  Add Objective
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Previous</Button>
              <Button onClick={() => setStep(3)}>Next: Content</Button>
            </div>
          </TabsContent>

          {/* Additional tabs will be implemented in the next iteration */}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

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
      topic: "Security Awareness",
      duration: 45,
      completionRate: 88,
      averageScore: 92,
      difficulty: "Novice",
      status: 'active',
      lastUpdated: "2024-11-01",
      ratings: 4.8,
      thumbnail: "https://example.com/phishing-awareness.jpg",
      prerequisites: ["Basic Security Concepts"],
      objectives: ["Identify phishing attempts", "Avoid phishing attempts"],
      contentSections: [
        { id: 1, type: 'text', title: 'Introduction to Phishing', content: 'This section introduces the concept of phishing', order: 1 },
        { id: 2, type: 'video', title: 'Phishing Example', content: 'https://example.com/phishing-example.mp4', order: 2 },
        { id: 3, type: 'exercise', title: 'Phishing Quiz', content: 'https://example.com/phishing-quiz.html', order: 3 },
        { id: 4, type: 'case-study', title: 'Phishing Case Study', content: 'https://example.com/phishing-case-study.pdf', order: 4 },
        { id: 5, type: 'simulation', title: 'Phishing Simulation', content: 'https://example.com/phishing-simulation.html', order: 5 }
      ],
      settings: {
        minScore: 80,
        requireAllSections: true,
        notifications: { onStart: true, onComplete: true, onDue: true }
      },
      analytics: {
        totalAttempts: 0,
        averageTimeSpent: 0,
        completionsByDepartment: {},
        questionStats: {},
        feedback: { average: 0, total: 0, comments: [] }
      },
      version: { number: "1.0.0", changes: [] }
    },
    {
      id: 2,
      title: "Password Security",
      description: "Best practices for password management",
      topic: "Security Fundamentals",
      duration: 30,
      completionRate: 92,
      averageScore: 88,
      difficulty: "Novice",
      status: 'active',
      lastUpdated: "2024-11-05",
      ratings: 4.6,
      thumbnail: "https://example.com/password-security.jpg",
      prerequisites: ["Basic Security Concepts"],
      objectives: ["Manage passwords effectively", "Implement password policies"],
      contentSections: [
        { id: 1, type: 'text', title: 'Password Basics', content: 'This section covers the basics of password management', order: 1 },
        { id: 2, type: 'video', title: 'Password Best Practices', content: 'https://example.com/password-best-practices.mp4', order: 2 },
        { id: 3, type: 'exercise', title: 'Password Quiz', content: 'https://example.com/password-quiz.html', order: 3 },
        { id: 4, type: 'case-study', title: 'Password Case Study', content: 'https://example.com/password-case-study.pdf', order: 4 },
        { id: 5, type: 'simulation', title: 'Password Simulation', content: 'https://example.com/password-simulation.html', order: 5 }
      ],
      settings: {
        minScore: 80,
        requireAllSections: true,
        notifications: { onStart: true, onComplete: true, onDue: true }
      },
      analytics: {
        totalAttempts: 0,
        averageTimeSpent: 0,
        completionsByDepartment: {},
        questionStats: {},
        feedback: { average: 0, total: 0, comments: [] }
      },
      version: { number: "1.0.0", changes: [] }
    },
    {
      id: 3,
      title: "Advanced Social Engineering",
      description: "Deep dive into social engineering tactics",
      topic: "Advanced Security",
      duration: 60,
      completionRate: 75,
      averageScore: 85,
      difficulty: "Proficient",
      status: 'active',
      lastUpdated: "2024-11-10",
      ratings: 4.9,
      thumbnail: "https://example.com/social-engineering.jpg",
      prerequisites: ["Social Engineering Basics"],
      objectives: ["Understand social engineering tactics", "Implement social engineering countermeasures"],
      contentSections: [
        { id: 1, type: 'text', title: 'Introduction to Social Engineering', content: 'This section introduces the concept of social engineering', order: 1 },
        { id: 2, type: 'video', title: 'Social Engineering Example', content: 'https://example.com/social-engineering-example.mp4', order: 2 },
        { id: 3, type: 'exercise', title: 'Social Engineering Quiz', content: 'https://example.com/social-engineering-quiz.html', order: 3 },
        { id: 4, type: 'case-study', title: 'Social Engineering Case Study', content: 'https://example.com/social-engineering-case-study.pdf', order: 4 },
        { id: 5, type: 'simulation', title: 'Social Engineering Simulation', content: 'https://example.com/social-engineering-simulation.html', order: 5 }
      ],
      settings: {
        minScore: 80,
        requireAllSections: true,
        notifications: { onStart: true, onComplete: true, onDue: true }
      },
      analytics: {
        totalAttempts: 0,
        averageTimeSpent: 0,
        completionsByDepartment: {},
        questionStats: {},
        feedback: { average: 0, total: 0, comments: [] }
      },
      version: { number: "1.0.0", changes: [] }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterTopic, setFilterTopic] = useState('all');
  const [sortColumn, setSortColumn] = useState<SortableColumn>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredModules = modules
    .filter(module => {
      const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          module.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || module.status === filterStatus;
      const matchesDifficulty = filterDifficulty === 'all' || module.difficulty === filterDifficulty;
      const matchesTopic = filterTopic === 'all' || module.topic === filterTopic;
      
      return matchesSearch && matchesStatus && matchesDifficulty && matchesTopic;
    })
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      if (a[sortColumn] < b[sortColumn]) return -direction;
      if (a[sortColumn] > b[sortColumn]) return direction;
      return 0;
    });

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const StatCard = ({ title, value, trend, data, color, percentageChange }: StatCardProps) => (
    <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
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

  const getDifficultyBadge = (difficulty: 'Novice' | 'Proficient' | 'Master') => {
    const styles: Record<'Novice' | 'Proficient' | 'Master', string> = {
      Novice: 'bg-green-500/20 text-green-400',
      Proficient: 'bg-yellow-500/20 text-yellow-400',
      Master: 'bg-purple-500/20 text-purple-400'
    };
    return <span className={`${styles[difficulty]} text-xs px-2 py-1 rounded`}>{difficulty}</span>;
  };

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-2 px-10">
      <div>
        <div className="flex justify-between items-center mb-7 mt-1">
          <h1 className="text-xl font-base text-white">Trainings</h1>
          <CreateModuleDialog />
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
              {filteredModules.map((module) => (
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