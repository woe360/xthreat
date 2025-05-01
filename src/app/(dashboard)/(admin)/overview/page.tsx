'use client'
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  BookOpen, Users, Target, AlertTriangle, ChevronRight, 
  PlusCircle, BarChart2, FileText, Bell, Award,
  Clock, BookMarked, BookX, CheckCircle, XCircle,
  DollarSign, Building2, ShieldCheck, AlertOctagon
} from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  difficulty: string;
  tags: string[];
  lessons: number;
  completionRate: number;
}

interface LessonMetrics {
  total: number;
  byLevel: {
    [key: string]: number;
  };
}

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  trend?: Array<{ month: string; value: number }>;
  color: string;
}

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
}

interface Client {
  id: string;
  name: string;
  trainingEffectiveness: number;
  activeUsers: number;
  totalUsers: number;
  status: 'active' | 'inactive' | 'pending';
  duePayment?: number;
  dueDate?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, trend, color }) => (
  <div className="bg-[#181b24] rounded-lg p-6 border border-gray-800">
    <div className="flex items-center gap-2 mb-1">
      <Icon size={18} className={`${color}`} />
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <span className={`ml-auto text-sm px-2 py-0.5 rounded ${
        change > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
      }`}>
        {change > 0 ? '+' : ''}{change}%
      </span>
    </div>
    <p className="text-3xl font-bold mb-3">{value}</p>
    {trend && (
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={change > 0 ? '#4ADE80' : '#F87171'}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}
    <p className="text-xs text-gray-400 mt-1">Last 30 days</p>
  </div>
);

const ActionCard: React.FC<ActionCardProps> = ({ title, description, icon: Icon, href }) => (
  <Link href={href} className="block">
    <div className="bg-[#181b24] rounded-lg p-6 border border-gray-800 hover:border-blue-500/30 transition-colors group">
      <div className="flex items-center justify-between mb-2">
        <Icon size={24} className="text-blue-400" />
        <ChevronRight size={18} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </Link>
);

const ModuleRow: React.FC<{ module: Module }> = ({ module }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-800 hover:bg-[#111316] transition-colors">
    <div className="flex items-center gap-3">
      <BookOpen size={18} className="text-gray-400" />
      <div>
        <h4 className="font-medium">{module.title}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs px-2 py-0.5 rounded ${
            module.difficulty === 'Novice' ? 'bg-green-500/20 text-green-400' :
            module.difficulty === 'Proficient' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-purple-500/20 text-purple-400'
          }`}>
            {module.difficulty}
          </span>
          {module.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="text-center">
        <p className="text-sm text-gray-400">Lessons</p>
        <p className="font-medium">{module.lessons}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-400">Completion</p>
        <p className="font-medium">{module.completionRate}%</p>
      </div>
      <Link href={`/trainings/modules/${module.id}`} className="text-blue-400 hover:text-blue-300">
        <ChevronRight size={20} />
      </Link>
    </div>
  </div>
);

const ContentHealthCard = ({ title, value, description, icon: Icon, status }: { 
  title: string; 
  value: number; 
  description: string; 
  icon: React.ElementType; 
  status: 'good' | 'warning' | 'danger' 
}) => {
  const getStatusColor = () => {
    switch(status) {
      case 'good': return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
      case 'danger': return 'bg-red-500/20 text-red-400 border-red-500/20';
    }
  };

  return (
    <div className={`p-5 rounded-lg border ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{title}</h3>
        <Icon size={20} />
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-sm">{description}</p>
    </div>
  );
};

const ActivityItem = ({ action, user, time, type }: { action: string; user: string; time: string; type: string }) => {
  const getTypeIcon = () => {
    switch(type) {
      case 'enrollment': return <Users size={16} className="text-blue-400" />;
      case 'completion': return <CheckCircle size={16} className="text-green-400" />;
      case 'account': return <Award size={16} className="text-purple-400" />;
      default: return <Bell size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 border-b border-white/[0.06]">
      <div className="mt-0.5">{getTypeIcon()}</div>
      <div>
        <p className="text-sm">
          <span className="font-medium">{user}</span> {action}
        </p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
};

const ClientRow: React.FC<{ client: Client }> = ({ client }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-800 hover:bg-[#111316] transition-colors">
    <div className="flex items-center gap-3">
      <Building2 size={18} className="text-gray-400" />
      <div>
        <h4 className="font-medium">{client.name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs px-2 py-0.5 rounded ${
            client.status === 'active' ? 'bg-green-500/20 text-green-400' :
            client.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
          </span>
          <span className="text-xs text-gray-400">{client.activeUsers} / {client.totalUsers} users</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="text-center">
        <p className="text-sm text-gray-400">Effectiveness</p>
        <p className="font-medium">{client.trainingEffectiveness}%</p>
      </div>
      {client.duePayment && (
        <div className="text-center">
          <p className="text-sm text-gray-400">Payment Due</p>
          <p className={`font-medium ${new Date(client.dueDate || '') < new Date() ? 'text-red-400' : 'text-yellow-400'}`}>
            ${client.duePayment}
          </p>
        </div>
      )}
      <Link href={`/clients/${client.id}`} className="text-blue-400 hover:text-blue-300">
        <ChevronRight size={20} />
      </Link>
    </div>
  </div>
);

const Overview = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [lessonMetrics, setLessonMetrics] = useState<LessonMetrics>({
    total: 0,
    byLevel: { 'E': 0, 'C': 0, 'A': 0 }
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Normally you'd fetch this data from your API
        // For example: const response = await fetch('/api/admin/dashboard');
        
        // Simulating API data
        setModules([
          {
            id: '1',
            title: 'Introduction to Cybersecurity',
            difficulty: 'Novice',
            tags: ['Security', 'Awareness'],
            lessons: 8,
            completionRate: 78
          },
          {
            id: '2',
            title: 'Advanced Threat Detection',
            difficulty: 'Master',
            tags: ['Threat Intel', 'Detection'],
            lessons: 12,
            completionRate: 45
          },
          {
            id: '3',
            title: 'Security Compliance Fundamentals',
            difficulty: 'Proficient',
            tags: ['Compliance', 'Regulation'],
            lessons: 6,
            completionRate: 62
          }
        ]);
        
        setLessonMetrics({
          total: 26,
          byLevel: { 'E': 10, 'C': 8, 'A': 8 }
        });

        // Simulating client data
        setClients([
          {
            id: '1',
            name: 'Acme Corporation',
            trainingEffectiveness: 87,
            activeUsers: 145,
            totalUsers: 200,
            status: 'active',
            duePayment: 2500,
            dueDate: '2023-10-30'
          },
          {
            id: '2',
            name: 'TechGlobal Inc',
            trainingEffectiveness: 92,
            activeUsers: 78,
            totalUsers: 80,
            status: 'active'
          },
          {
            id: '3',
            name: 'Oceanic Systems',
            trainingEffectiveness: 64,
            activeUsers: 45,
            totalUsers: 100,
            status: 'pending',
            duePayment: 1750,
            dueDate: '2023-10-15'
          },
          {
            id: '4',
            name: 'MediCorp Healthcare',
            trainingEffectiveness: 76,
            activeUsers: 120,
            totalUsers: 150,
            status: 'active',
            duePayment: 3200,
            dueDate: '2023-11-05'
          }
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const monthlyData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 72 },
    { month: 'Mar', value: 78 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 82 },
    { month: 'Jun', value: 88 },
  ];
  
  const difficultyData = [
    { name: 'Novice', value: 45, color: '#4ADE80' },
    { name: 'Proficient', value: 35, color: '#FACC15' },
    { name: 'Master', value: 20, color: '#A78BFA' }
  ];

  const activityData = [
    { action: 'enrolled in "Introduction to Cybersecurity"', user: 'Alex Johnson', time: '10 minutes ago', type: 'enrollment' },
    { action: 'completed "Security Awareness Basics"', user: 'Maria Garcia', time: '2 hours ago', type: 'completion' },
    { action: 'created a new account', user: 'James Wilson', time: '3 hours ago', type: 'account' },
    { action: 'completed all lessons in "Password Security"', user: 'Sarah Miller', time: '5 hours ago', type: 'completion' },
    { action: 'enrolled in 3 modules', user: 'Robert Chen', time: 'Yesterday', type: 'enrollment' }
  ];

  // Add payment metrics data
  const paymentData = [
    { month: 'Jan', value: 15000 },
    { month: 'Feb', value: 22000 },
    { month: 'Mar', value: 18500 },
    { month: 'Apr', value: 24500 },
    { month: 'May', value: 29000 },
    { month: 'Jun', value: 32000 },
  ];

  // Client effectiveness metrics
  const clientEffectivenessData = [
    { name: 'High (>80%)', value: 45, color: '#4ADE80' },
    { name: 'Medium (60-80%)', value: 35, color: '#FACC15' },
    { name: 'Low (<60%)', value: 20, color: '#F87171' }
  ];

  // Calculate total due payments
  const totalDuePayments = clients.reduce((sum, client) => sum + (client.duePayment || 0), 0);
  
  // Calculate overdue payments
  const overduePayments = clients.reduce((sum, client) => {
    if (client.dueDate && new Date(client.dueDate) < new Date()) {
      return sum + (client.duePayment || 0);
    }
    return sum;
  }, 0);

  return (
    <div className="relative h-screen overflow-auto bg-[#050607] text-gray-100">
      <div className="p-6 px-10 mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-base">Overview</h1>
        </div>

        {/* Main KPIs - Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <StatCard 
            title="Total Modules" 
            value={modules.length} 
            change={15} 
            icon={BookMarked} 
            trend={monthlyData}
            color="text-blue-400" 
          />
          <StatCard 
            title="Active Learners" 
            value="483" 
            change={12} 
            icon={Users} 
            trend={monthlyData}
            color="text-purple-400" 
          />
          <StatCard 
            title="Total Clients" 
            value={clients.length} 
            change={10} 
            icon={Building2} 
            trend={monthlyData}
            color="text-indigo-400" 
          />
          <StatCard 
            title="Due Payments" 
            value={`$${totalDuePayments.toLocaleString()}`} 
            change={-5} 
            icon={DollarSign} 
            trend={paymentData}
            color="text-amber-400" 
          />
        </div>

        {/* Two Column Layout for Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4">
              <ActionCard 
                title="Create Module" 
                description="Add a new training module" 
                icon={PlusCircle} 
                href="/trainings/create" 
              />
              <ActionCard 
                title="Content Analytics" 
                description="View content metrics" 
                icon={BarChart2} 
                href="/trainings/analytics" 
              />
            </div>
            
            {/* Client Overview */}
            <div className="bg-[#181b24] rounded-lg border border-gray-800">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <h2 className="font-medium">Client Overview</h2>
                <Link href="/clients" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                  View all
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                {clients.map((client, index) => (
                  <ClientRow key={index} client={client} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-[#181b24] rounded-lg border border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <h2 className="font-medium">Recent Activity</h2>
              </div>
              <div className="max-h-[350px] overflow-y-auto">
                {activityData.map((item, index) => (
                  <ActivityItem 
                    key={index} 
                    action={item.action} 
                    user={item.user} 
                    time={item.time} 
                    type={item.type} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Modules */}
        <div className="bg-[#181b24] rounded-lg border border-gray-800 mb-8">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="font-medium">Recent Modules</h2>
            <Link href="/trainings" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
              View all modules
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">Title</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">Difficulty</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">Tags</th>
                  <th className="text-center p-4 text-gray-400 text-sm font-medium">Lessons</th>
                  <th className="text-center p-4 text-gray-400 text-sm font-medium">Completion</th>
                  <th className="text-right p-4"></th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-[#111316] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <BookOpen size={18} className="text-gray-400" />
                        <span className="font-medium">{module.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        module.difficulty === 'Novice' ? 'bg-green-500/20 text-green-400' :
                        module.difficulty === 'Proficient' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {module.difficulty}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {module.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-center">{module.lessons}</td>
                    <td className="p-4 text-center">{module.completionRate}%</td>
                    <td className="p-4 text-right">
                      <Link href={`/trainings/modules/${module.id}`} className="text-blue-400 hover:text-blue-300">
                        <ChevronRight size={20} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;