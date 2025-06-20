'use client'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { areaElementClasses } from '@mui/x-charts/LineChart';
import { SxProps, Theme } from '@mui/material/styles';
import { safeFetch } from '@/lib/utils';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRoleAccess } from '@/hooks/useRoleAccess';

// Hook to fetch analytics data
function useAnalyticsData() {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const supabase = createClientComponentClient();

  React.useEffect(() => {
    async function fetchAnalytics() {
      try {
        console.log('📊 Fetching analytics data directly from Supabase...');
        
        // Try to get current user first
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.warn('📊 User not authenticated, using mock data');
          setData(getMockAnalyticsData());
          return;
        }
        
        console.log('📊 User authenticated:', user.email);
        
        // Fetch analytics events directly from Supabase
        const { data: events, error } = await supabase
          .from('analytics_events')
          .select('*')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false });
        
        if (error) {
          console.error('📊 Supabase query error:', error);
          setData(getMockAnalyticsData());
          return;
        }
        
        console.log('📊 Raw analytics events from Supabase:', events?.length || 0, 'events');
        console.log('📊 Sample events:', events?.slice(0, 3));
        
        setData(processAnalyticsData(events || []));
        
      } catch (error) {
        console.warn('📊 Analytics fetch error:', error);
        setData(getMockAnalyticsData());
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [supabase]);

  return { data, loading };
}

// Hook to fetch manager-level analytics (all users)
function useManagerAnalyticsData() {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const supabase = createClientComponentClient();

  React.useEffect(() => {
    async function fetchManagerAnalytics() {
      try {
        console.log('📊 Fetching manager analytics data from Supabase...');
        
        // Try to get current user first
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.warn('📊 User not authenticated, using mock data');
          setData(getManagerMockData());
          return;
        }
        
        console.log('📊 Manager fetching data for all users');
        
        // Fetch analytics events for ALL users (manager view)
        const { data: events, error } = await supabase
          .from('analytics_events')
          .select('*')
          .order('timestamp', { ascending: false });
        
        if (error) {
          console.error('📊 Manager Supabase query error:', error);
          setData(getManagerMockData());
          return;
        }
        
        console.log('📊 Manager analytics events from Supabase:', events?.length || 0, 'events');
        
        setData(processManagerAnalyticsData(events || []));
        
      } catch (error) {
        console.warn('📊 Manager analytics fetch error:', error);
        setData(getManagerMockData());
      } finally {
        setLoading(false);
      }
    }

    fetchManagerAnalytics();
  }, [supabase]);

  return { data, loading };
}

function processAnalyticsData(events: any[]) {
  console.log('📊 Processing analytics events:', events.length, 'events');
  
  // Calculate overall progress across all lesson types
  const totalLessonsStarted = events.filter((e: any) => 
    e.event_type === 'lesson_started' || 
    e.event_type === 'quiz_started' ||
    e.event_type === 'email_comparison_started'
  ).length;
  
  const totalLessonsCompleted = events.filter((e: any) => 
    e.event_type === 'lesson_completed' || 
    e.event_type === 'email_comparison_completed' ||
    e.event_type === 'quiz_completed'
  ).length;
  
  const overall_progress = totalLessonsStarted > 0 ? Math.round((totalLessonsCompleted / totalLessonsStarted) * 100) : 0;
  
  // Calculate learning streak (days with learning activity)
  const eventDates = events.map(e => new Date(e.timestamp || e.created_at).toDateString());
  const uniqueDays = [...new Set(eventDates)];
  const learning_streak = uniqueDays.length;
  
  // Total study time across all activities (in minutes)
  const timeEvents = events.filter((e: any) => e.data?.time_spent && e.data.time_spent > 0);
  const total_study_time = timeEvents.length > 0 
    ? Math.round(timeEvents.reduce((sum: number, event: any) => 
        sum + (event.data.time_spent || 0), 0) / 1000 / 60) // Convert to minutes
    : 0;
  
  // Module mastery - unique modules where user has completed lessons
  const completedModules = new Set(
    events.filter((e: any) => 
      e.event_type === 'lesson_completed' || 
      e.event_type === 'email_comparison_completed' ||
      e.event_type === 'quiz_completed'
    ).map(e => e.module_id)
  );
  const modules_completed = completedModules.size;
  const available_modules = 24; // Based on your API logs showing 24 modules
  const module_mastery = Math.round((modules_completed / available_modules) * 100);

  console.log('📊 Processed global analytics:', {
    overall_progress,
    learning_streak,
    total_study_time,
    modules_completed,
    module_mastery,
    totalLessonsStarted,
    totalLessonsCompleted,
    timeEvents: timeEvents.length
  });

  return {
    overall_progress,
    learning_streak,
    total_study_time,
    module_mastery,
    modules_completed,
    total_events: events.length,
    // Add trend data for charts based on actual events
    progress_trend_data: generateTrendData(overall_progress, events, 'percentage'),
    streak_trend_data: generateTrendData(learning_streak, events, 'count'),
    time_trend_data: generateTrendData(total_study_time, events, 'time'),
    mastery_trend_data: generateTrendData(module_mastery, events, 'percentage')
  };
}

function generateTrendData(baseValue: number, events: any[] = [], type: string = 'percentage'): number[] {
  // Create trend data based on actual events, not fake historical data
  const now = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (29 - i));
    return date;
  });
  
  // Group events by day
  const eventsByDay = new Map<string, any[]>();
  events.forEach((event: any) => {
    const eventDate = new Date(event.timestamp || event.created_at);
    const dayKey = eventDate.toDateString();
    if (!eventsByDay.has(dayKey)) {
      eventsByDay.set(dayKey, []);
    }
    eventsByDay.get(dayKey)!.push(event);
  });
  
  // Generate data points only for days with actual events
  return last30Days.map(date => {
    const dayKey = date.toDateString();
    const dayEvents = eventsByDay.get(dayKey) || [];
    
    if (dayEvents.length === 0) {
      return 0; // No activity = 0
    }
    
    // For days with events, calculate appropriate value
    if (type === 'percentage') {
      return baseValue; // Use the calculated base value for days with activity
    } else if (type === 'time') {
      // Calculate average time for this day
      const timeEvents = dayEvents.filter(e => e.data?.time_spent);
      if (timeEvents.length === 0) return 0;
      return Math.round(timeEvents.reduce((sum, e) => sum + (e.data.time_spent / 1000 / 60), 0) / timeEvents.length);
    } else if (type === 'count') {
      // For count-based metrics, return the count of events for this day
      return dayEvents.length;
    }
    
    return baseValue;
  });
}

function processManagerAnalyticsData(events: any[]) {
  console.log('📊 Processing manager analytics events:', events.length, 'events');
  
  // Get unique users count
  const uniqueUsers = new Set(events.map(e => e.user_id)).size;
  
  // Total lessons completed across all users
  const totalLessonsCompleted = events.filter((e: any) => 
    e.event_type === 'lesson_completed' || 
    e.event_type === 'email_comparison_completed' ||
    e.event_type === 'quiz_completed'
  ).length;
  
  // Total quiz attempts and completions across all users
  const totalQuizStarted = events.filter((e: any) => e.event_type === 'quiz_started').length;
  const totalQuizCompleted = events.filter((e: any) => e.event_type === 'quiz_completed').length;
  
  // Total training time across all users (in hours)
  const totalTimeEvents = events.filter((e: any) => e.data?.time_spent && e.data.time_spent > 0);
  const totalTrainingHours = totalTimeEvents.reduce((sum: number, event: any) => 
    sum + (event.data.time_spent || 0), 0) / 1000 / 60 / 60; // Convert to hours
  
  console.log('📊 Manager analytics:', {
    uniqueUsers,
    totalLessonsCompleted, 
    totalQuizStarted,
    totalQuizCompleted,
    totalTrainingHours: Math.round(totalTrainingHours * 10) / 10
  });

  return {
    total_users: uniqueUsers,
    total_lessons_completed: totalLessonsCompleted,
    total_quiz_attempts: totalQuizStarted,
    total_training_hours: Math.round(totalTrainingHours * 10) / 10,
    total_events: events.length,
    // Add trend data for manager charts
    users_trend_data: generateTrendData(uniqueUsers, events, 'count'),
    lessons_trend_data: generateTrendData(totalLessonsCompleted, events, 'count'),
    quiz_trend_data: generateTrendData(totalQuizCompleted, events, 'count'),
    time_trend_data: generateTrendData(totalTrainingHours, events, 'time')
  };
}

function getManagerMockData() {
  console.log('📊 Using mock manager analytics data - API fetch failed');
  const emptyEvents: any[] = [];
  return {
    total_users: 0,
    total_lessons_completed: 0,
    total_quiz_attempts: 0,
    total_training_hours: 0,
    total_events: 0,
    users_trend_data: generateTrendData(0, emptyEvents, 'count'),
    lessons_trend_data: generateTrendData(0, emptyEvents, 'count'),
    quiz_trend_data: generateTrendData(0, emptyEvents, 'count'),
    time_trend_data: generateTrendData(0, emptyEvents, 'time')
  };
}

function getMockAnalyticsData() {
  console.log('📊 Using mock analytics data - API fetch failed');
  const emptyEvents: any[] = [];
  return {
    overall_progress: 0,
    learning_streak: 0,
    total_study_time: 0,
    module_mastery: 0,
    modules_completed: 0,
    total_events: 0,
    progress_trend_data: generateTrendData(0, emptyEvents, 'percentage'),
    streak_trend_data: generateTrendData(0, emptyEvents, 'count'),
    time_trend_data: generateTrendData(0, emptyEvents, 'time'),
    mastery_trend_data: generateTrendData(0, emptyEvents, 'percentage')
  };
}

// Analytics card skeleton that matches the final card dimensions
function AnalyticsCardSkeleton({ title }: { title: string }) {
  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1, backgroundColor: 'transparent' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Stack direction="column" sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}>
          <Stack sx={{ justifyContent: 'space-between' }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: '60px',
                    height: '32px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 1,
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: '50px',
                  height: '24px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
            </Stack>
            <Box
              sx={{
                width: '80px',
                height: '16px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: 1,
                mt: 0.5,
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
          </Stack>
          <Box
            sx={{
              width: '100%',
              height: 50,
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: 1,
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

// Individual Analytics Stat Cards
export function OverallProgressCard() {
  const { data, loading } = useAnalyticsData();
  
  if (loading || !data) {
    return <AnalyticsCardSkeleton title="Overall Progress" />;
  }
  
  return <AnalyticsStatCard 
    title="Overall Progress" 
    value={`${data.overall_progress}%`}
    interval="Completion rate"
    trend={data.overall_progress > 80 ? 'up' : 'down'}
    data={data.progress_trend_data}
  />;
}

export function LearningStreakCard() {
  const { data, loading } = useAnalyticsData();
  
  if (loading || !data) {
    return <AnalyticsCardSkeleton title="Learning Streak" />;
  }
  
  return <AnalyticsStatCard 
    title="Learning Streak" 
    value={`${data.learning_streak}`}
    interval="Active days"
    trend={data.learning_streak > 3 ? 'up' : 'neutral'}
    data={data.streak_trend_data}
  />;
}

export function TotalStudyTimeCard() {
  const { data, loading } = useAnalyticsData();
  
  if (loading || !data) {
    return <AnalyticsCardSkeleton title="Study Time" />;
  }
  
  return <AnalyticsStatCard 
    title="Study Time" 
    value={`${data.total_study_time}m`}
    interval="Total minutes"
    trend="up"
    data={data.time_trend_data}
  />;
}

// Manager analytics overview component
export function ManagerAnalyticsCards() {
  const { role } = useRoleAccess();
  
  if (role !== 'manager' && role !== 'admin') {
    return null; // Only show for managers and admins
  }

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2, mt: 3, color: 'white' }}>
        Organization Overview
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <TotalUsersCard />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <TotalLessonsCard />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <TotalQuizAttemptsCard />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <TotalTrainingHoursCard />
        </Grid>
      </Grid>
    </>
  );
} 

export function ModuleMasteryCard() {
  const { data, loading } = useAnalyticsData();
  
  if (loading || !data) {
    return <AnalyticsCardSkeleton title="Module Mastery" />;
  }
  
  return <AnalyticsStatCard 
    title="Module Mastery" 
    value={`${data.modules_completed}/24`}
    interval="Modules completed"
    trend={data.modules_completed > 5 ? 'up' : 'neutral'}
    data={data.mastery_trend_data}
  />;
}

// Helper functions for StatCard styling
function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

// Get current month days
function getCurrentMonthDays() {
  const now = new Date();
  return getDaysInMonth(now.getMonth() + 1, now.getFullYear());
}

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

// Analytics stat card matching your existing StatCard design
function AnalyticsStatCard({ 
  title, 
  value, 
  interval, 
  trend, 
  data 
}: {
  title: string;
  value: string;
  interval: string;
  trend: 'up' | 'down' | 'neutral';
  data: number[];
}) {
  const theme = useTheme();
  const daysInWeek = getCurrentMonthDays();

  const trendColors = {
    up:
      theme.palette.mode === 'light'
        ? theme.palette.success.main
        : theme.palette.success.dark,
    down:
      theme.palette.mode === 'light'
        ? theme.palette.error.main
        : theme.palette.error.dark,
    neutral:
      theme.palette.mode === 'light'
        ? theme.palette.grey[400]
        : theme.palette.grey[700],
  };

  const labelColors = {
    up: 'success' as const,
    down: 'error' as const,
    neutral: 'default' as const,
  };

  const color = labelColors[trend];
  const chartColor = trendColors[trend];
  const trendValues = { up: '+25%', down: '-25%', neutral: '+5%' };

  const cardSx: SxProps<Theme> = {
    height: '100%',
    flexGrow: 1,
    backgroundColor: 'transparent'
  };

  return (
    <Card variant="outlined" sx={cardSx}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Stack
          direction="column"
          sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}
        >
          <Stack sx={{ justifyContent: 'space-between' }}>
            <Stack
              direction="row"
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="h4" component="p">
                {value}
              </Typography>
              <Chip size="small" color={color} label={trendValues[trend]} />
            </Stack>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {interval}
            </Typography>
          </Stack>
          <Box sx={{ width: '100%', height: 50 }}>
            <SparkLineChart
              colors={[chartColor]}
              data={data}
              area
              showHighlight
              showTooltip
              xAxis={{
                scaleType: 'band',
                data: daysInWeek,
              }}
              sx={{
                [`& .${areaElementClasses.root}`]: {
                  fill: `url(#area-gradient-${value})`,
                },
              }}
            >
              <AreaGradient color={chartColor} id={`area-gradient-${value}`} />
            </SparkLineChart>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// Simple learning activity summary
export function LearningActivitySummary() {
  const { data, loading } = useAnalyticsData();

  if (loading || !data) {
    return (
      <Box sx={{ p: 3, backgroundColor: '#121212', borderRadius: 1, border: '1px solid white/10' }}>
        <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>Learning Analytics</Typography>
        <Typography sx={{ color: 'white/60' }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#121212', borderRadius: 1, border: '1px solid white/10' }}>
      <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>Learning Analytics Overview</Typography>
      
      <Box sx={{ display: 'grid', gap: 2 }}>
        <Box sx={{ p: 2, backgroundColor: '#1a1a1a', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ color: 'white/60', mb: 1 }}>Total Learning Events</Typography>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 600 }}>{data.total_events}</Typography>
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Box sx={{ p: 2, backgroundColor: '#1a1a1a', borderRadius: 1, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#10b981', mb: 1 }}>Quiz Success</Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>{data.quiz_completion_rate}%</Typography>
          </Box>
          
          <Box sx={{ p: 2, backgroundColor: '#1a1a1a', borderRadius: 1, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#3b82f6', mb: 1 }}>Email Accuracy</Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>{data.email_accuracy}%</Typography>
          </Box>
        </Box>
        
        <Box sx={{ p: 2, backgroundColor: '#1a1a1a', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ color: 'white/60', mb: 1 }}>Performance Insights</Typography>
          <Typography variant="body2" sx={{ color: 'white/80' }}>
            {data.quiz_completion_rate > 85 ? 'Excellent quiz performance! ' : 'Quiz completion could be improved. '}
            {data.email_accuracy > 75 ? 'Strong phishing detection skills.' : 'Focus on phishing identification training.'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// Manager-specific analytics cards
export function TotalUsersCard() {
  const { data, loading } = useManagerAnalyticsData();
  
  if (loading || !data) {
    return <AnalyticsCardSkeleton title="Active Users" />;
  }
  
  return <AnalyticsStatCard 
    title="Active Users" 
    value={`${data.total_users}`}
    interval="Total enrolled"
    trend="up"
    data={data.users_trend_data}
  />;
}

export function TotalLessonsCard() {
  const { data, loading } = useManagerAnalyticsData();
  
  if (loading || !data) {
    return <AnalyticsCardSkeleton title="Lessons Completed" />;
  }
  
  return <AnalyticsStatCard 
    title="Lessons Completed" 
    value={`${data.total_lessons_completed}`}
    interval="All users"
    trend="up"
    data={data.lessons_trend_data}
  />;
}

export function TotalQuizAttemptsCard() {
  const { data, loading } = useManagerAnalyticsData();
  
  if (loading || !data) {
    return <AnalyticsCardSkeleton title="Quiz Attempts" />;
  }
  
  return <AnalyticsStatCard 
    title="Quiz Attempts" 
    value={`${data.total_quiz_attempts}`}
    interval="All users"
    trend="up"
    data={data.quiz_trend_data}
  />;
}

export function TotalTrainingHoursCard() {
  const { data, loading } = useManagerAnalyticsData();
  
  if (loading || !data) {
    return <AnalyticsCardSkeleton title="Training Hours" />;
  }
  
  return <AnalyticsStatCard 
    title="Training Hours" 
    value={`${data.total_training_hours}h`}
    interval="All users"
    trend="up"
    data={data.time_trend_data}
  />;
} 