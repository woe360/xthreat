'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Users, Timer, BarChart2, Play, Plus, Edit, Trash2, Star, Filter, Search, ArrowUpDown, MoreHorizontal } from 'lucide-react';
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Badge } from "@/components/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"
// import { ColumnDef } from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from 'next/navigation';

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

interface ModuleResponse {
  id: string;
  title: string;
  description: string;
  tags: string[];
  slug: string;
  points: number;
  created_at: string;
  updated_at: string;
  lessons: LessonResponse[];
}

interface LessonResponse {
  id: string;
  title: string;
  description: string;
  level: string;
  points: number;
  estimated_time: number;
  lesson_order: number;
  module_id?: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  tags: string[];
  slug: string;
  points: number;
  status?: string;
  difficulty?: string;
  topic?: string;
  duration?: number;
  ratings?: number;
  completionRate?: number;
  averageScore?: number;
  contentSections: {
    id: string;
    title: string;
    description: string;
    level: string;
    points: number;
    estimatedTime: number;
    order: number;
  }[];
  settings: {
    isPublished: boolean;
    isArchived: boolean;
    isDeleted: boolean;
  };
  analytics: {
    totalEnrollments: number;
    completionRate: number;
    averageRating: number;
  };
}

type SortableColumn = 'title' | 'tags' | 'points' | 'enrollments';

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
  selectedLessons: { id: number; order: number }[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  data: Array<{ month: string; value: number }>;
  color: 'green' | 'yellow' | 'red' | 'blue' | 'purple';
  percentageChange: number;
}

interface TableRow {
  row: {
    original: Module;
  };
}

const CreateModuleDialog = ({ onModuleCreated }: { onModuleCreated: () => void }) => {
  const [step, setStep] = useState(1);
  const [topics, setTopics] = useState<string[]>([]);
  const [availableLessons, setAvailableLessons] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ModuleFormData>({
    title: '',
    description: '',
    topic: '',
    difficulty: 'Novice',
    objectives: [''],
    duration: 30,
    prerequisites: [],
    contentSections: [],
    selectedLessons: []
  });

  useEffect(() => {
    const fetchTopicsAndLessons = async () => {
      try {
        // Fetch modules to get topics
        const modulesResponse = await fetch('/api/modules');
        if (!modulesResponse.ok) {
          throw new Error(`HTTP error! status: ${modulesResponse.status}`);
        }
        const modulesData = await modulesResponse.json() as ModuleResponse[];
        
        // Extract unique topics from tags arrays
        const uniqueTopics = [...new Set(modulesData.flatMap((m: ModuleResponse) => m.tags || []))];
        setTopics(uniqueTopics);

        // Fetch available lessons
        const lessonsResponse = await fetch('/api/lessons');
        if (!lessonsResponse.ok) {
          throw new Error(`HTTP error! status: ${lessonsResponse.status}`);
        }
        const lessonsData = await lessonsResponse.json() as LessonResponse[];
        setAvailableLessons(lessonsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTopicsAndLessons();
  }, []);

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

  const handleLessonSelection = (lessonId: number, checked: boolean) => {
    if (checked) {
      const order = formData.selectedLessons.length + 1;
      handleInputChange('selectedLessons', [...formData.selectedLessons, { id: lessonId, order }]);
    } else {
      const newLessons = formData.selectedLessons.filter(l => l.id !== lessonId);
      // Reorder remaining lessons
      const reorderedLessons = newLessons.map((l, idx) => ({ ...l, order: idx + 1 }));
      handleInputChange('selectedLessons', reorderedLessons);
    }
  };

  const handleLessonReorder = (lessonId: number, newOrder: number) => {
    const lessons = [...formData.selectedLessons];
    const oldOrder = lessons.find(l => l.id === lessonId)?.order || 0;
    
    const reorderedLessons = lessons.map(lesson => {
      if (lesson.id === lessonId) return { ...lesson, order: newOrder };
      if (newOrder > oldOrder && lesson.order <= newOrder && lesson.order > oldOrder) {
        return { ...lesson, order: lesson.order - 1 };
      }
      if (newOrder < oldOrder && lesson.order >= newOrder && lesson.order < oldOrder) {
        return { ...lesson, order: lesson.order + 1 };
      }
      return lesson;
    });

    handleInputChange('selectedLessons', reorderedLessons);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const moduleData = {
        ...formData,
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        points: 0
      };

      const response = await fetch('/api/modules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moduleData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create module');
      }

      onModuleCreated();
      setFormData({
        title: '',
        description: '',
        topic: '',
        difficulty: 'Novice',
        objectives: [''],
        duration: 30,
        prerequisites: [],
        contentSections: [],
        selectedLessons: []
      });
      setStep(1);
    } catch (error) {
      console.error('Error creating module:', error);
    } finally {
      setIsSubmitting(false);
    }
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
              value="lessons"
              className={step === 3 ? 'bg-blue-500/30 text-blue-400' : ''}
              onClick={() => setStep(3)}
            >
              Lessons
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
                      {topics.map((topic) => (
                        <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                      ))}
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
              <Button onClick={() => setStep(3)}>Next: Lessons</Button>
            </div>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                {availableLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center gap-4 bg-[#0f1117] p-4 rounded-lg border border-gray-800">
                    <input
                      type="checkbox"
                      checked={formData.selectedLessons.some(l => l.id === lesson.id)}
                      onChange={(e) => handleLessonSelection(lesson.id, e.target.checked)}
                      className="w-4 h-4"
                    />
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium">{lesson.title}</h3>
                      <p className="text-sm text-gray-400">{lesson.description}</p>
                    </div>
                    {formData.selectedLessons.some(l => l.id === lesson.id) && (
                      <input
                        type="number"
                        min="1"
                        max={formData.selectedLessons.length}
                        value={formData.selectedLessons.find(l => l.id === lesson.id)?.order || 1}
                        onChange={(e) => handleLessonReorder(lesson.id, parseInt(e.target.value))}
                        className="w-16 bg-[#181b24] border border-gray-800 rounded px-2 py-1"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Previous</Button>
              <Button onClick={() => setStep(4)}>Next: Review</Button>
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Review Module Details</h3>
                <div className="space-y-2">
                  <p><strong>Title:</strong> {formData.title}</p>
                  <p><strong>Description:</strong> {formData.description}</p>
                  <p><strong>Topic:</strong> {formData.topic}</p>
                  <p><strong>Difficulty:</strong> {formData.difficulty}</p>
                  <p><strong>Duration:</strong> {formData.duration} minutes</p>
                  <div>
                    <strong>Objectives:</strong>
                    <ul className="list-disc list-inside">
                      {formData.objectives.map((obj, idx) => (
                        <li key={idx}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Selected Lessons:</strong>
                    <ul className="list-disc list-inside">
                      {formData.selectedLessons
                        .sort((a, b) => a.order - b.order)
                        .map((lesson) => {
                          const lessonDetails = availableLessons.find(l => l.id === lesson.id);
                          return (
                            <li key={lesson.id}>
                              {lessonDetails?.title} (Order: {lesson.order})
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(3)} disabled={isSubmitting}>Previous</Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Module'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

const ModuleList = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState<SortableColumn>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const fetchModules = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/modules');
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch modules');
      }
      
      const data = await response.json();
      setModules(data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedModules = useMemo(() => {
    if (!modules) return [];
    return [...modules].sort((a: Module, b: Module) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      switch (sortColumn) {
        case 'enrollments':
          return direction * (a.analytics.totalEnrollments - b.analytics.totalEnrollments);
        case 'points':
          return direction * (a.points - b.points);
        case 'tags':
          const aValue = a.tags[0] || '';
          const bValue = b.tags[0] || '';
          return direction * aValue.localeCompare(bValue);
        case 'title':
          return direction * (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });
  }, [modules, sortColumn, sortDirection]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              variant={sortColumn === option.value ? 'default' : 'outline'}
              onClick={() => handleSort(option.value)}
            >
              {option.label}
              {sortColumn === option.value && (
                <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
              )}
            </Button>
          ))}
        </div>
        <CreateModuleDialog onModuleCreated={fetchModules} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id || String(column.accessorKey)}>
                  {typeof column.header === 'string' ? column.header : null}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedModules.map((module) => (
              <TableRow key={module.id}>
                {columns.map((column) => (
                  <TableCell key={column.id || String(column.accessorKey)}>
                    {column.cell ? column.cell({ row: { original: module } }) : 
                     column.accessorKey ? String(module[column.accessorKey as keyof Module] || '') : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const TrainingsPage = () => {
  const router = useRouter();
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

  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterTopic, setFilterTopic] = useState('all');
  const [sortColumn, setSortColumn] = useState<SortableColumn>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const fetchModules = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/modules');
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch modules');
      }
      
      const data = await response.json();
      setModules(data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleModuleCreated = () => {
    fetchModules();
  };

  const handleModuleClick = (module: Module) => {
    router.push(`/trainings/modules/${module.id}`);
  };

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

  const columns: ColumnDef<Module>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
      cell: ({ row }) => (
        <div className="flex gap-1">
          {row.original.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'points',
      header: 'Points',
    },
    {
      accessorKey: 'analytics.totalEnrollments',
      header: 'Enrollments',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const module = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(module.id)}>
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Module</DropdownMenuItem>
              <DropdownMenuItem>View Analytics</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete Module</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const sortOptions: { label: string; value: SortableColumn }[] = [
    { label: 'Title', value: 'title' },
    { label: 'Tags', value: 'tags' },
    { label: 'Points', value: 'points' },
    { label: 'Enrollments', value: 'enrollments' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-2 px-10">
        <div className="flex justify-between items-center mb-7 mt-1">
          <h1 className="text-xl font-base text-white">Trainings</h1>
          <CreateModuleDialog onModuleCreated={handleModuleCreated} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Loading skeletons for stats */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#181b24] border border-gray-800 rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            </div>
          ))}
        </div>
        <div className="bg-[#050607] border border-gray-300/10 rounded-lg overflow-hidden">
          {/* Loading skeletons for modules */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b border-gray-800 p-6 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gray-700 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-2 px-10">
      <div>
        <div className="flex justify-between items-center mb-7 mt-1">
          <h1 className="text-xl font-base text-white">Trainings</h1>
          <CreateModuleDialog onModuleCreated={handleModuleCreated} />
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
                <tr 
                  key={module.id} 
                  className="hover:bg-gray-900/50 transition-colors cursor-pointer" 
                  onClick={() => handleModuleClick(module)}
                >
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
                    {getDifficultyBadge(module.difficulty as 'Novice' | 'Proficient' | 'Master')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-300">{module.ratings}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-3">
                      <button 
                        className="text-gray-400 hover:text-green-400 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleModuleClick(module);
                        }}
                      >
                        <Play size={20} />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add edit functionality
                        }}
                      >
                        <Edit size={20} />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-red-400 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add delete functionality
                        }}
                      >
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