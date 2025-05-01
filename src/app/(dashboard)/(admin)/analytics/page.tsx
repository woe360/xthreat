'use client'
import React from 'react';
import { ArrowUp, ArrowDown, Users, Target, ShieldCheck, BrainCircuit } from 'lucide-react';
import { Card } from "@/components/ui/card";
import CompanyPerformanceChart from '../../(shared)/dashboard/components/CompanyPerformanceChart';
import TrainingEffectivenessChart from '../../(shared)/dashboard/components/TrainingEffectivenessChart';
import DepartmentComparisonChart from '../../(shared)/dashboard/components/DepartmentComparisonChart';
import CompanyComparisonTable from '../../(shared)/dashboard/components/CompanyComparisonTable';
import { Typography, Grid } from '@mui/material';
import { StatCard } from '@/components/ui/stat-card';

const PerformancePage = () => {
  const analyticsStats = [
    {
      title: 'Overall Score',
      value: '88%',
      interval: 'Last 30 days',
      trend: 'up' as const,
      data: [82, 84, 86, 85, 88, 87, 89, 88, 90, 89, 91, 90, 92, 91, 93, 92, 94, 93, 95, 94, 96, 95, 94, 96, 95, 97, 96, 95, 94, 96],
      icon: Target,
      color: 'text-blue-400'
    },
    {
      title: 'Awareness Level',
      value: '92%',
      interval: 'Last 30 days',
      trend: 'up' as const,
      data: [78, 80, 82, 85, 84, 86, 88, 87, 89, 88, 90, 89, 91, 90, 92, 91, 93, 92, 94, 93, 95, 94, 96, 95, 94, 96, 95, 97, 96, 95],
      icon: BrainCircuit,
      color: 'text-purple-400'
    },
    {
      title: 'Active Users',
      value: '1,248',
      interval: 'Last 30 days',
      trend: 'up' as const,
      data: [980, 1020, 1050, 1080, 1100, 1150, 1180, 1200, 1220, 1240, 1260, 1280, 1300, 1280, 1260, 1290, 1310, 1330, 1350, 1330, 1310, 1340, 1360, 1380, 1400, 1380, 1360, 1390, 1410, 1430],
      icon: Users,
      color: 'text-green-400'
    },
    {
      title: 'Security Rating',
      value: 'A+',
      interval: 'Last 30 days',
      trend: 'up' as const,
      data: [85, 86, 87, 88, 89, 88, 90, 89, 91, 90, 92, 91, 93, 92, 94, 93, 95, 94, 96, 95, 94, 96, 95, 97, 96, 95, 94, 96, 95, 97],
      icon: ShieldCheck,
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050607] text-gray-100 p-4 px-10">
      <div>
        <div className="flex justify-between items-center mb-8 mt-1">
          <Typography variant="h6">Analytics</Typography>
        </div>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {analyticsStats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>

        {/* Main Charts */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <CompanyPerformanceChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <TrainingEffectivenessChart />
          </Grid>
        </Grid>

        {/* Department Comparison */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <DepartmentComparisonChart />
          </Grid>
        </Grid>

        {/* Company Comparison Table */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CompanyComparisonTable />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PerformancePage;