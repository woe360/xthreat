// 'use client';

// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Chip from '@mui/material/Chip';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { useTheme } from '@mui/material/styles';

// export default function PageViewsBarChart() {
//   const theme = useTheme();
//   // const colorPalette = [
//   //   (theme.vars || theme).palette.primary.dark,
//   //   (theme.vars || theme).palette.primary.main,
//   //   (theme.vars || theme).palette.primary.light,
//   // ];
//   const colorPalette = [
//     theme.palette.primary.dark,
//     theme.palette.primary.main,
//     theme.palette.primary.light,
//   ];
//   return (
//     <Card variant="outlined" sx={{ width: '100%' }}>
//       <CardContent>
//         <Typography component="h2" variant="subtitle2" gutterBottom>
//           Page views and downloads
//         </Typography>
//         <Stack sx={{ justifyContent: 'space-between' }}>
//           <Stack
//             direction="row"
//             sx={{
//               alignContent: { xs: 'center', sm: 'flex-start' },
//               alignItems: 'center',
//               gap: 1,
//             }}
//           >
//             <Typography variant="h4" component="p">
//               1.3M
//             </Typography>
//             <Chip size="small" color="error" label="-8%" />
//           </Stack>
//           <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//             Page views and downloads for the last 6 months
//           </Typography>
//         </Stack>
//         <BarChart
//           borderRadius={8}
//           colors={colorPalette}
//           xAxis={
//             [
//               {
//                 scaleType: 'band',
//                 categoryGapRatio: 0.5,
//                 data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//               },
//             ] as any
//           }
//           series={[
//             {
//               id: 'page-views',
//               label: 'Page views',
//               data: [2234, 3872, 2998, 4125, 3357, 2789, 2998],
//               stack: 'A',
//             },
//             {
//               id: 'downloads',
//               label: 'Downloads',
//               data: [3098, 4215, 2384, 2101, 4752, 3593, 2384],
//               stack: 'A',
//             },
//             {
//               id: 'conversions',
//               label: 'Conversions',
//               data: [4051, 2275, 3129, 4693, 3904, 2038, 2275],
//               stack: 'A',
//             },
//           ]}
//           height={250}
//           margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
//           grid={{ horizontal: true }}
//           slotProps={{
//             legend: {
//               hidden: true,
//             },
//           }}
//         />
//       </CardContent>
//     </Card>
//   );
// }

'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function TrainingCompletionChart() {
  const theme = useTheme();
  // Warm monochromatic color scheme
  const colorPalette = [
    'rgba(255, 138, 0, 0.7)',  // Deep orange at 50%
    'rgba(255, 165, 51, 0.7)', // Medium orange at 50%
    'rgba(255, 194, 102, 0.7)', // Light orange at 50%
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Training Module Completion
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
              87.4%
            </Typography>
            <Chip size="small" color="success" label="+12%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Average completion rate across all training types
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={
            [
              {
                scaleType: 'band',
                categoryGapRatio: 0.5,
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
              },
            ] as any
          }
          series={[
            {
              id: 'assessments',
              label: 'Completed Assessments',
              data: [82, 88, 85, 90, 92, 89, 91],
              stack: 'A',
            },
            {
              id: 'interactive',
              label: 'Interactive Modules',
              data: [75, 79, 82, 85, 88, 86, 89],
              stack: 'A',
            },
            {
              id: 'video',
              label: 'Video Content',
              data: [65, 72, 78, 82, 85, 83, 87],
              stack: 'A',
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}