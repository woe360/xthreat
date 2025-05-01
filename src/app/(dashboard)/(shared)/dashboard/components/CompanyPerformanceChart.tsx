'use client'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

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

export default function CompanyPerformanceChart() {
  const theme = useTheme();
  const data = getDaysInMonth(4, 2024);

  const colorPalette = [
    '#2563eb',  // Blue
    '#8B5CF6',  // Purple
    '#10B981',  // Green
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Company Performance
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
              92%
            </Typography>
            <Chip size="small" color="success" label="+8%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Average completion rate
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data,
              tickInterval: (index, i) => (i + 1) % 5 === 0,
            },
          ]}
          series={[
            {
              id: 'completion',
              label: 'Completion Rate',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: [
                82, 85, 88, 90, 92, 91, 94, 93, 95, 94, 96, 95,
                97, 96, 98, 97, 95, 98, 96, 97, 95, 98, 96,
                97, 96, 98, 97, 99, 98, 97,
              ],
            },
            {
              id: 'awareness',
              label: 'Awareness Level',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: [
                78, 80, 82, 85, 84, 86, 88, 87, 89, 88, 90, 89,
                91, 90, 92, 91, 93, 92, 94, 93, 95, 94, 96,
                95, 94, 96, 95, 97, 96, 95,
              ],
            },
            {
              id: 'engagement',
              label: 'Engagement',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              stackOrder: 'ascending',
              data: [
                75, 77, 79, 80, 82, 81, 83, 82, 84, 83, 85, 84,
                86, 85, 87, 86, 88, 87, 89, 88, 90, 89, 91,
                90, 92, 91, 93, 92, 94, 93,
              ],
              area: true,
            },
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-engagement': {
              fill: "url('#engagement')",
            },
            '& .MuiAreaElement-series-awareness': {
              fill: "url('#awareness')",
            },
            '& .MuiAreaElement-series-completion': {
              fill: "url('#completion')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color="#2563eb" id="completion" />
          <AreaGradient color="#8B5CF6" id="awareness" />
          <AreaGradient color="#10B981" id="engagement" />
        </LineChart>
      </CardContent>
    </Card>
  );
} 