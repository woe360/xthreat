'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';

export default function DepartmentComparisonChart() {
  const departments = ['IT', 'Finance', 'Sales', 'Operations', 'HR', 'Marketing'];
  const metrics = [
    {
      label: 'Completion Rate',
      data: [94, 88, 82, 86, 90, 85],
      color: '#2563eb'
    },
    {
      label: 'Engagement',
      data: [92, 85, 80, 84, 88, 82],
      color: '#8B5CF6'
    },
    {
      label: 'Assessment Score',
      data: [96, 90, 84, 88, 92, 86],
      color: '#10B981'
    }
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Department Performance Comparison
        </Typography>
        <Stack sx={{ justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Performance metrics by department
          </Typography>
        </Stack>
        <BarChart
          height={250}
          series={metrics.map((metric) => ({
            data: metric.data,
            label: metric.label,
            color: metric.color,
          }))}
          xAxis={[{
            data: departments,
            scaleType: 'band',
          }]}
          margin={{ left: 50, right: 20, top: 20, bottom: 35 }}
          slotProps={{
            legend: {
              hidden: false,
              position: { vertical: 'top', horizontal: 'right' }
            }
          }}
        />
      </CardContent>
    </Card>
  );
} 