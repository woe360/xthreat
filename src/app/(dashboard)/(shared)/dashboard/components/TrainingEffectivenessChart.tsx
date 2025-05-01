'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';

export default function TrainingEffectivenessChart() {
  const data = [
    { module: 'Phishing', preScore: 65, postScore: 92, improvement: 27 },
    { module: 'Data Protection', preScore: 58, postScore: 88, improvement: 30 },
    { module: 'Password Security', preScore: 72, postScore: 95, improvement: 23 },
    { module: 'Social Engineering', preScore: 60, postScore: 89, improvement: 29 },
    { module: 'Device Security', preScore: 68, postScore: 91, improvement: 23 },
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Training Effectiveness
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              26.4%
            </Typography>
            <Chip size="small" color="success" label="Avg. Improvement" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Average score improvement across all modules
          </Typography>
        </Stack>
        <BarChart
          height={250}
          series={[
            {
              data: data.map(item => item.preScore),
              label: 'Pre-Training',
              id: 'preScore',
              color: '#64748b'
            },
            {
              data: data.map(item => item.postScore),
              label: 'Post-Training',
              id: 'postScore',
              color: '#2563eb'
            }
          ]}
          xAxis={[{
            data: data.map(item => item.module),
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