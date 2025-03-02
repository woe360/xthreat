'use client'

import { Card, CardContent, Chip, Typography, Stack, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { SparkLineChart } from '@mui/x-charts/SparkLineChart'
import { areaElementClasses } from '@mui/x-charts/LineChart'

export interface StatCardProps {
  title: string
  value: string
  interval: string
  trend: 'up' | 'down' | 'neutral'
  data: number[]
}

export function StatCard({ title, value, interval, trend, data }: StatCardProps) {
  const theme = useTheme();

  const trendLabel = trend === 'up' ? '+8%' : trend === 'down' ? '-5%' : '0%';
  const chipColor = trend === 'up' ? 'success' : trend === 'down' ? 'error' : 'default';
  const chartColor = trend === 'up' 
    ? theme.palette.success.main 
    : trend === 'down' 
      ? theme.palette.error.main 
      : theme.palette.grey[500];

  const daysInWeek = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
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
              <Chip size="small" color={chipColor} label={trendLabel} />
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
              <defs>
                <linearGradient id={`area-gradient-${value}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
            </SparkLineChart>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
} 