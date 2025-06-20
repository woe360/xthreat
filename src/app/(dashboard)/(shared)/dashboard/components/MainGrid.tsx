'use client'
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import UserTableLeaderboard from './UserTableLeaderboard';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard, { StatCardProps } from './StatCard';
import SecuritySkillsRadar from './SecuritySkillsRadar';
import { LastModuleCard, UpcomingModuleCard, RandomModuleCard } from './DashboardModuleCards';
import { OverallProgressCard, LearningStreakCard, TotalStudyTimeCard, ModuleMasteryCard, ManagerAnalyticsCards } from './AnalyticsCards';
import DashboardSkeleton from './DashboardSkeleton';

const data: StatCardProps[] = [
  {
    title: 'Awareness Score',
    value: '86%',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Risk Exposure',
    value: '14%',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: 'Engagement Rate',
    value: '92%',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
      520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

export default function MainGrid({ sidebarOpen }: { sidebarOpen?: boolean }) {

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: sidebarOpen ? { sm: '100%', md: '1700px' } : '100%',
        transition: 'max-width 0.2s ease-in-out',
        backgroundColor: '#0b0b0b',
      }}
    >
      {/* <Typography 
        variant="h5" 
        sx={{ 
          mb: 3,
          mt: { xs: 4, md: 3.1 },
          color: 'white'
       }}>
        Dashboard
      </Typography> */}

      {/* Top row - 4 equal columns */}
      {/* <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Box sx={{ backgroundColor: '#121212', border: '1px solid white/10', borderRadius: 1 }}>
            <HighlightedCard />
          </Box>
        </Grid>
        {data.map((card, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Box sx={{ backgroundColor: '#121212', border: '1px solid white/10', borderRadius: 1 }}>
              <StatCard {...card} />
            </Box>
          </Grid>
        ))}
      </Grid> */}

      {/* Dashboard - 4 equal columns */}
      <Typography variant="h6" sx={{ mb: 2, mt: 3, color: 'white' }}>
        Dashboard
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <OverallProgressCard />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <LearningStreakCard />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <TotalStudyTimeCard />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <ModuleMasteryCard />
        </Grid>
      </Grid>

      {/* Manager Analytics Section - Only visible to managers/admins */}
      <ManagerAnalyticsCards />

      {/* Middle row - 3 equal columns for modules */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <LastModuleCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <UpcomingModuleCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <RandomModuleCard />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mb: 3, color: 'white' }}>
        Employees
      </Typography>

      {/* Bottom row */}
      <Grid container spacing={0}>
        <Grid item xs={12} lg={13}>
          <Box sx={{ backgroundColor: '#121212', border: '1px solid white/10', borderRadius: 1 }}>
            <UserTableLeaderboard />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}