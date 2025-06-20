'use client'
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  BookOpen, Users, Target, AlertTriangle, ChevronRight, 
  Award, Clock, BookMarked, CheckCircle, ShieldCheck,
  TrendingUp, Activity, Brain, Zap, BarChart3,
  UserCheck, Timer, Trophy, GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface AnalyticsData {
  total_users: number;
  total_lessons_completed: number;
  total_quiz_attempts: number;
  total_training_hours: number;
  total_events: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  trend?: Array<{ day: string; value: number }>;
  color: string;
  subtitle?: string;
}

interface RecentEvent {
  id: string;
  event_type: string;
  user_id: string;
  module_id: string;
  lesson_id?: string;
  component_type?: string;
  timestamp: string;
  data?: any;
}

interface UserProgress {
  user_id: string;
  user_email?: string;
  completed_lessons: number;
  quiz_attempts: number;
  total_study_time: number;
  last_activity: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, trend, color, subtitle }) => (
  <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-white/[0.05] hover:border-white/[0.1] transition-all duration-200">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">{title}</h3>
        {subtitle && <p className="text-xs text-neutral-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          change > 0 ? 'bg-emerald-500/20 text-emerald-400' : 
          change < 0 ? 'bg-red-500/20 text-red-400' : 'bg-neutral-500/20 text-neutral-400'
        }`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
        <div className={`p-1.5 rounded-lg ${color} bg-opacity-20`}>
          <Icon size={16} className={color} />
        </div>
      </div>
    </div>
    <div className="mb-3">
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-neutral-500">Last 30 days</p>
    </div>
    {trend && (
      <div className="h-12 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={change > 0 ? '#10B981' : change < 0 ? '#EF4444' : '#6B7280'}
              strokeWidth={2}
              dot={false}
              strokeLinecap="round"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
);

const MetricCard = ({ title, value, description, icon: Icon, status, trend }: { 
  title: string; 
  value: number | string; 
  description: string; 
  icon: React.ElementType; 
  status: 'good' | 'warning' | 'neutral';
  trend?: number;
}) => {
  const getStatusStyles = () => {
    switch(status) {
      case 'good': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
      case 'warning': return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      case 'neutral': return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className={`rounded-xl p-4 border backdrop-blur-sm ${getStatusStyles()}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-sm">{title}</h3>
        <div className="flex items-center gap-2">
          {trend && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              trend > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
          <Icon size={14} />
        </div>
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-xs opacity-80">{description}</p>
    </div>
  );
};

const ActivityItem = ({ event }: { event: RecentEvent }) => {
  const getEventIcon = () => {
    switch(event.event_type) {
      case 'lesson_started': return <BookOpen size={14} className="text-blue-400" />;
      case 'lesson_completed': return <CheckCircle size={14} className="text-emerald-400" />;
      case 'quiz_started': return <Target size={14} className="text-amber-400" />;
      case 'quiz_completed': return <Award size={14} className="text-purple-400" />;
      case 'email_comparison_completed': return <ShieldCheck size={14} className="text-cyan-400" />;
      default: return <Activity size={14} className="text-neutral-400" />;
    }
  };

  const getEventDescription = () => {
    switch(event.event_type) {
      case 'lesson_started': return `started ${event.lesson_id?.replace('_', ' ')} lesson`;
      case 'lesson_completed': return `completed ${event.lesson_id?.replace('_', ' ')} lesson`;
      case 'quiz_started': return `started quiz in ${event.module_id?.replace('-', ' ')}`;
      case 'quiz_completed': 
        const score = event.data?.score || 0;
        const total = event.data?.answers?.length || event.data?.total_questions || 0;
        return `completed quiz (${score}/${total})`;
      case 'email_comparison_completed': return `completed email security exercise`;
      default: return event.event_type.replace('_', ' ');
    }
  };

  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const eventTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - eventTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors group">
      <div className="mt-0.5 p-1.5 rounded-lg bg-white/[0.05] group-hover:bg-white/[0.08] transition-colors">
        {getEventIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/90 line-clamp-2">
          <span className="font-medium text-white">User</span> {getEventDescription()}
        </p>
        <p className="text-xs text-neutral-400 mt-1">{timeAgo(event.timestamp)}</p>
      </div>
    </div>
  );
};

const UserRow = ({ user }: { user: UserProgress }) => (
  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
    <div>
      <h4 className="font-medium text-white">User {user.user_id.substring(0, 8)}...</h4>
      <p className="text-xs text-neutral-400">Last active: {new Date(user.last_activity).toLocaleDateString()}</p>
    </div>
    <div className="flex items-center gap-6">
      <div className="text-center">
        <p className="text-xs text-neutral-400 mb-1">Lessons</p>
        <p className="font-medium text-white">{user.completed_lessons}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-neutral-400 mb-1">Quizzes</p>
        <p className="font-medium text-white">{user.quiz_attempts}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-neutral-400 mb-1">Time</p>
        <p className="font-medium text-white">{Math.round(user.total_study_time / 60)}m</p>
      </div>
    </div>
  </div>
);

const Overview = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        
        // Fetch all analytics events
        const { data: events, error } = await supabase
          .from('analytics_events')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(1000);

        if (error) {
          console.error('Error fetching analytics:', error);
          return;
        }

        if (!events || events.length === 0) {
          console.log('No analytics events found');
          return;
        }

        // Process analytics data
        const uniqueUsers = new Set(events.map(e => e.user_id)).size;
        const totalLessonsCompleted = events.filter(e => 
          e.event_type === 'lesson_completed' || 
          e.event_type === 'email_comparison_completed' ||
          e.event_type === 'quiz_completed'
        ).length;
        const totalQuizAttempts = events.filter(e => e.event_type === 'quiz_started').length;
        const timeEvents = events.filter(e => e.data?.time_spent && e.data.time_spent > 0);
        const totalTrainingHours = timeEvents.reduce((sum, e) => sum + (e.data.time_spent || 0), 0) / 1000 / 60 / 60;

        setAnalyticsData({
          total_users: uniqueUsers,
          total_lessons_completed: totalLessonsCompleted,
          total_quiz_attempts: totalQuizAttempts,
          total_training_hours: Math.round(totalTrainingHours * 10) / 10,
          total_events: events.length
        });

        // Set recent events (last 15)
        setRecentEvents(events.slice(0, 15));

        // Process user progress
        const userStats = new Map<string, UserProgress>();
        events.forEach(event => {
          const userId = event.user_id;
          if (!userStats.has(userId)) {
            userStats.set(userId, {
              user_id: userId,
              completed_lessons: 0,
              quiz_attempts: 0,
              total_study_time: 0,
              last_activity: event.timestamp
            });
          }

          const user = userStats.get(userId)!;
          
          // Update last activity
          if (new Date(event.timestamp) > new Date(user.last_activity)) {
            user.last_activity = event.timestamp;
          }

          // Count completed lessons
          if (['lesson_completed', 'email_comparison_completed', 'quiz_completed'].includes(event.event_type)) {
            user.completed_lessons++;
          }

          // Count quiz attempts
          if (event.event_type === 'quiz_started') {
            user.quiz_attempts++;
          }

          // Sum study time
          if (event.data?.time_spent) {
            user.total_study_time += event.data.time_spent;
          }
        });

        // Convert to array and sort by activity
        const userProgressArray = Array.from(userStats.values())
          .sort((a, b) => new Date(b.last_activity).getTime() - new Date(a.last_activity).getTime())
          .slice(0, 8); // Top 8 most active users

        setUserProgress(userProgressArray);

      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [supabase]);

  // Generate trend data based on events
  const generateTrendData = (events: RecentEvent[]) => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    return last30Days.map(day => {
      const dayEvents = events.filter(e => e.timestamp.startsWith(day));
      return { day, value: dayEvents.length };
    });
  };

  const trendData = recentEvents.length > 0 ? generateTrendData(recentEvents) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050607] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-white mb-2">Training Analytics Overview</h1>
            <p className="text-neutral-400">Monitor system-wide cybersecurity training metrics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white/[0.02] rounded-xl p-6 border border-white/[0.05] animate-pulse">
                <div className="h-24 bg-white/[0.05] rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050607] text-white overflow-auto">
      <div className="p-6 px-10 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">Training Analytics Overview</h1>
          <p className="text-neutral-400">Monitor system-wide cybersecurity training metrics and user engagement</p>
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Active Learners" 
            value={analyticsData?.total_users || 0}
            change={15} 
            icon={Users} 
            trend={trendData}
            color="text-blue-400" 
            subtitle="Total users"
          />
          <StatCard 
            title="Lessons Completed" 
            value={analyticsData?.total_lessons_completed || 0}
            change={23} 
            icon={CheckCircle} 
            trend={trendData}
            color="text-emerald-400" 
            subtitle="All training types"
          />
          <StatCard 
            title="Quiz Attempts" 
            value={analyticsData?.total_quiz_attempts || 0}
            change={12} 
            icon={Target} 
            trend={trendData}
            color="text-purple-400" 
            subtitle="Total started"
          />
          <StatCard 
            title="Training Hours" 
            value={`${analyticsData?.total_training_hours || 0}h`}
            change={8} 
            icon={Clock} 
            trend={trendData}
            color="text-amber-400" 
            subtitle="Total time spent"
          />
        </div>

        {/* System Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="System Activity"
            value={analyticsData?.total_events || 0}
            description="Total learning events tracked"
            icon={Activity}
            status="good"
            trend={18}
          />
          <MetricCard
            title="Completion Rate"
            value={analyticsData?.total_lessons_completed && analyticsData?.total_quiz_attempts 
              ? `${Math.round((analyticsData.total_lessons_completed / (analyticsData.total_quiz_attempts + analyticsData.total_lessons_completed)) * 100)}%`
              : '0%'}
            description="Lessons completed vs started"
            icon={TrendingUp}
            status="good"
            trend={5}
          />
          <MetricCard
            title="Learning Modules"
            value="24"
            description="Available training modules"
            icon={BookMarked}
            status="neutral"
          />
        </div>

        {/* Two Column Layout with 2x2 Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Active Users */}
          <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/[0.05]">
            <div className="p-4 border-b border-white/[0.05] flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-white">Top Active Users</h2>
                <p className="text-sm text-neutral-400">Most engaged learners</p>
              </div>
              <Link href="/users" className="text-blue-400 hover:text-blue-300 text-sm flex items-center hover:underline">
                View all
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="p-4 space-y-1 max-h-80 overflow-y-auto">
              {userProgress.length > 0 ? (
                userProgress.map((user, index) => (
                  <UserRow key={index} user={user} />
                ))
              ) : (
                <div className="py-12 text-center">
                  <Users size={48} className="mx-auto mb-4 text-neutral-600" />
                  <p className="text-neutral-400">No user activity data available</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/[0.05]">
            <div className="p-4 border-b border-white/[0.05]">
              <div>
                <h2 className="font-semibold text-white">Recent Activity</h2>
                <p className="text-sm text-neutral-400">Latest learning events</p>
              </div>
            </div>
            <div className="p-4 space-y-1 max-h-80 overflow-y-auto">
              {recentEvents.length > 0 ? (
                recentEvents.slice(0, 10).map((event, index) => (
                  <ActivityItem key={index} event={event} />
                ))
              ) : (
                <div className="py-12 text-center">
                  <Activity size={48} className="mx-auto mb-4 text-neutral-600" />
                  <p className="text-neutral-400">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom 2x2 Grid - Detailed Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard
            title="Phishing Training"
            value={userProgress.reduce((sum, user) => sum + user.completed_lessons, 0)}
            description="Total phishing exercises completed"
            icon={ShieldCheck}
            status="good"
            trend={14}
          />
          <MetricCard
            title="Quiz Performance"
            value={analyticsData?.total_quiz_attempts 
              ? `${Math.round((analyticsData.total_lessons_completed / Math.max(analyticsData.total_quiz_attempts, 1)) * 100)}%`
              : '0%'}
            description="Quiz completion success rate"
            icon={Brain}
            status="good"
            trend={7}
          />
          <MetricCard
            title="User Engagement"
            value={analyticsData?.total_users ? Math.round(analyticsData.total_events / analyticsData.total_users) : 0}
            description="Average events per user"
            icon={Zap}
            status="good"
            trend={22}
          />
          <MetricCard
            title="Training Intensity"
            value={analyticsData?.total_training_hours && analyticsData?.total_users 
              ? `${(analyticsData.total_training_hours / analyticsData.total_users).toFixed(1)}h` 
              : '0h'}
            description="Average hours per user"
            icon={GraduationCap}
            status="neutral"
            trend={11}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;