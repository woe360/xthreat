// 'use client'
// import * as React from 'react';
// // import Grid from '@mui/material/Grid2';
// import Grid from '@mui/system/Unstable_Grid';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import ChartUserByCountry from './ChartUserByCountry';
// import CustomizedTreeView from './CustomizedTreeView';
// import CustomizedDataGrid from './CustomizedDataGrid';
// import HighlightedCard from './HighlightedCard';
// import PageViewsBarChart from './PageViewsBarChart';
// import SessionsChart from './SessionsChart';
// import StatCard, { StatCardProps } from './StatCard';
// import SecuritySkillsRadar from './SecuritySkillsRadar';

// const data: StatCardProps[] = [
//   {
//     title: 'Awareness Score',
//     value: '86%',
//     interval: 'Last 30 days',
//     trend: 'up',
//     data: [
//       200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
//       360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
//     ],
//   },
//   {
//     title: 'Risk Exposure',
//     value: '14%',
//     interval: 'Last 30 days',
//     trend: 'down',
//     data: [
//       1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
//       780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
//     ],
//   },
//   {
//     title: 'Engagement Rate',
//     value: '92%',
//     interval: 'Last 30 days',
//     trend: 'neutral',
//     data: [
//       500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
//       520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
//     ],
//   },
// ];


// export default function MainGrid({ sidebarOpen }: { sidebarOpen?: boolean }) {
//   return (
//     <Box 
//       sx={{ 
//         width: '100%',
//         maxWidth: sidebarOpen ? { sm: '100%', md: '1700px' } : '100%',
//         transition: 'max-width 0.2s ease-in-out'
//       }}
//     >
//       <Typography component="h2" variant="h6" sx={{ mb: 2, mt: 3 }}>
//         Dashboard
//       </Typography>
//       <Grid
//         container
//         spacing={2}
//         columns={12}
//         sx={{ mb: (theme) => theme.spacing(2) }}
//       >
//         {data.map((card, index) => (
//           <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
//             <StatCard {...card} />
//           </Grid>
//         ))}
//         <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
//           <HighlightedCard />
//         </Grid>
//         <Grid size={{ xs: 12, md: 6 }}>
//           <SessionsChart />
//         </Grid>
//         <Grid size={{ xs: 12, md: 6 }}>
//           <PageViewsBarChart />
//         </Grid>
//       </Grid>
      
//       <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
//         Details
//       </Typography>
//       <Grid container spacing={2} columns={12}>
//         <Grid size={{ xs: 12, lg: 9 }}>
//           {/* <CustomizedDataGrid /> */}
//         </Grid>
//         <Grid size={{ xs: 12, lg: 3 }}>
//           <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
//             {/* <CustomizedTreeView />
//             <ChartUserByCountry /> */}
//           </Stack>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

'use client'
import * as React from 'react';
import Grid from '@mui/material/Grid'; // Use the stable Grid component
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard, { StatCardProps } from './StatCard';
import SecuritySkillsRadar from './SecuritySkillsRadar';

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
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }} className="mt-6">
        Dashboard
      </Typography>

      {/* Top row - 4 equal columns */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {data.map((card, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} lg={3}>
          <HighlightedCard />
        </Grid>
      </Grid>

      {/* Middle row - 2 equal columns */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <SessionsChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <PageViewsBarChart />
        </Grid>
      </Grid>

      {/* <Typography variant="h6" sx={{ mb: 3 }}>
        Details
      </Typography> */}

      {/* Bottom row */}
      {/* <Grid container spacing={3}>
        <Grid item xs={12} lg={9}>
          <CustomizedDataGrid />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Stack spacing={3} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid> */}
    </Box>
  );
}