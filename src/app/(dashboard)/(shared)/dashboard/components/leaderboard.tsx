'use client'
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface LeaderboardUser {
  name: string;
  email: string;
  lessons_completed: number;
  quiz_attempts: number;
  study_time_minutes: number;
  last_activity: string;
  completion_rate: number;
}

interface ColumnDefinition {
  key: keyof LeaderboardUser | 'rank';
  label: string;
}

const columns: ColumnDefinition[] = [
  { key: 'name', label: 'Name' },
  { key: 'rank', label: 'Rank' },
  { key: 'lessons_completed', label: 'Lessons Completed' },
  { key: 'quiz_attempts', label: 'Quiz Attempts' },
  { key: 'study_time_minutes', label: 'Study Time' },
  { key: 'completion_rate', label: 'Completion Rate' },
  { key: 'last_activity', label: 'Last Activity' },
];

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all analytics events
        const { data: events, error } = await supabase
          .from('analytics_events')
          .select('*')
          .order('timestamp', { ascending: false });

        if (error) {
          console.error('Error fetching analytics:', error);
          return;
        }

        if (!events || events.length === 0) {
          console.log('No analytics events found');
          return;
        }

        // Fetch user data for names
        const { data: users, error: usersError } = await supabase
          .from('users')
          .select('id, first_name, last_name, email');

        if (usersError) {
          console.error('Error fetching users:', usersError);
          return;
        }

        // Process data by user
        const userStats = new Map<string, {
          name: string;
          email: string;
          lessons_completed: number;
          quiz_attempts: number;
          study_time_minutes: number;
          last_activity: string;
          total_started: number;
        }>();

        // Group events by user
        events.forEach(event => {
          const userId = event.user_id;
          const user = users?.find(u => u.id === userId);
          
          if (!user) return;

          if (!userStats.has(userId)) {
            userStats.set(userId, {
              name: `${user.first_name} ${user.last_name}`.trim() || user.email.split('@')[0],
              email: user.email,
              lessons_completed: 0,
              quiz_attempts: 0,
              study_time_minutes: 0,
              last_activity: event.timestamp,
              total_started: 0
            });
          }

          const userStat = userStats.get(userId)!;

          // Update last activity
          if (new Date(event.timestamp) > new Date(userStat.last_activity)) {
            userStat.last_activity = event.timestamp;
          }

          // Count lessons completed
          if (['lesson_completed', 'email_comparison_completed', 'quiz_completed'].includes(event.event_type)) {
            userStat.lessons_completed++;
          }

          // Count quiz attempts
          if (event.event_type === 'quiz_started') {
            userStat.quiz_attempts++;
          }

          // Count started activities for completion rate
          if (['lesson_started', 'quiz_started', 'email_comparison_started'].includes(event.event_type)) {
            userStat.total_started++;
          }

          // Sum study time
          if (event.data?.time_spent && event.data.time_spent > 0) {
            userStat.study_time_minutes += Math.round(event.data.time_spent / 1000 / 60);
          }
        });

        // Convert to leaderboard format and calculate completion rates
        const leaderboardUsers = Array.from(userStats.values())
          .map(user => ({
            ...user,
            completion_rate: user.total_started > 0 
              ? Math.round((user.lessons_completed / user.total_started) * 100)
              : 0
          }))
          .sort((a, b) => {
            // Sort by lessons completed first, then by study time
            if (b.lessons_completed !== a.lessons_completed) {
              return b.lessons_completed - a.lessons_completed;
            }
            return b.study_time_minutes - a.study_time_minutes;
          })
          .slice(0, 10); // Top 10 users

        setLeaderboardData(leaderboardUsers);

      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [supabase]);

  const handleUserClick = (user: LeaderboardUser): void => {
    console.log('User clicked:', user.name);
  };

  const formatStudyTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const formatLastActivity = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="rounded-lg p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
        <p className="text-gray-400 mt-2">Loading leaderboard...</p>
      </div>
    );
  }

  if (leaderboardData.length === 0) {
    return (
      <div className="rounded-lg p-6 text-center">
        <p className="text-gray-400">No user activity data available</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg">
      <div className="overflow-hidden overflow-y-scroll max-h-96">
        <div className="flex flex-col">
          {/* Header row */}
          <div className="flex justify-between py-3 px-4 border-b border-gray-700 bg-gray-800/50">
            {columns.map((column) => (
              <div key={column.key} className="text-gray-400 text-center flex-1 text-xs font-medium uppercase tracking-wider">
                {column.label}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {leaderboardData.map((user, index) => (
            <div key={`${user.email}-${index}`} className="flex justify-between py-3 px-4 border-b border-gray-700 hover:bg-gray-800/30 transition-colors">
              <div 
                className="text-white text-center flex-1 cursor-pointer hover:text-blue-400 transition-colors"
                onClick={() => handleUserClick(user)}
              >
                {user.name}
              </div>
              <div className="text-white text-center flex-1 font-semibold">#{index + 1}</div>
              <div className="text-white text-center flex-1">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                  {user.lessons_completed}
                </span>
              </div>
              <div className="text-white text-center flex-1">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400">
                  {user.quiz_attempts}
                </span>
              </div>
              <div className="text-white text-center flex-1">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                  {formatStudyTime(user.study_time_minutes)}
                </span>
              </div>
              <div className="text-white text-center flex-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                  user.completion_rate >= 80 ? 'bg-green-500/20 text-green-400' :
                  user.completion_rate >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {user.completion_rate}%
                </span>
              </div>
              <div className="text-gray-300 text-center flex-1 text-sm">
                {formatLastActivity(user.last_activity)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;