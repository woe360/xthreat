// 'use client'
// import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

// export default function SecuritySkillsRadar() {
//   const theme = useTheme();

//   const data = [
//     {
//       topic: 'Phishing',
//       score: 85,
//       fullMark: 100,
//     },
//     {
//       topic: 'Password',
//       score: 78,
//       fullMark: 100,
//     },
//     {
//       topic: 'Data Protection',
//       score: 72,
//       fullMark: 100,
//     },
//     {
//       topic: 'Social Eng.',
//       score: 68,
//       fullMark: 100,
//     },
//     {
//       topic: 'Device Security',
//       score: 82,
//       fullMark: 100,
//     },
//     {
//       topic: 'Incident Response',
//       score: 65,
//       fullMark: 100,
//     },
//   ];

//   return (
//     <Card variant="outlined" sx={{ width: '100%' }}>
//       <CardContent>
//         <Typography component="h2" variant="subtitle2" gutterBottom>
//           Security Skills Overview
//         </Typography>
//         <Stack sx={{ justifyContent: 'space-between' }}>
//           <Stack
//             direction="row"
//             sx={{
//               alignContent: { xs: 'center', sm: 'flex-start' },
//               alignItems: 'center',
//               gap: 1,
//               mb: 1
//             }}
//           >
//             <Typography variant="h4" component="p">
//               75%
//             </Typography>
//             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//               Average Competency
//             </Typography>
//           </Stack>
//         </Stack>
//         <div style={{ width: '100%', height: 250 }}>
//           <ResponsiveContainer>
//             <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
//               <PolarGrid stroke={theme.palette.divider} />
//               <PolarAngleAxis
//                 dataKey="topic"
//                 tick={{ 
//                   fill: theme.palette.text.primary,
//                   fontSize: 12
//                 }}
//               />
//               <PolarRadiusAxis
//                 angle={30}
//                 domain={[0, 100]}
//                 tick={{ 
//                   fill: theme.palette.text.secondary,
//                   fontSize: 12
//                 }}
//                 axisLine={false}
//                 tickCount={5}
//               />
//               <Radar
//                 name="Skills"
//                 dataKey="score"
//                 stroke={theme.palette.primary.main}
//                 fill={theme.palette.primary.main}
//                 fillOpacity={0.3}
//               />
//             </RadarChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles';

export default function SecuritySkillsRadar() {
  const theme = useTheme();

  const data = [
    {
      topic: 'Phishing',
      score: 85,
      fullMark: 100,
    },
    {
      topic: 'Password',
      score: 78,
      fullMark: 100,
    },
    {
      topic: 'Data Protection',
      score: 72,
      fullMark: 100,
    },
    {
      topic: 'Social Eng.',
      score: 68,
      fullMark: 100,
    },
    {
      topic: 'Device Security',
      score: 82,
      fullMark: 100,
    },
    {
      topic: 'Incident Response',
      score: 65,
      fullMark: 100,
    },
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Security Skills Overview
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              gap: 1,
              mb: 1
            }}
          >
            <Typography variant="h4" component="p">
              75%
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Average Competency
            </Typography>
          </Stack>
        </Stack>
        <div style={{ width: '100%', height: 250, marginTop: '1rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid 
                stroke={theme.palette.divider}
              />
              <PolarAngleAxis
                dataKey="topic"
                tick={{ 
                  fill: theme.palette.text.primary,
                  fontSize: 12
                }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ 
                  fill: theme.palette.text.secondary,
                  fontSize: 12
                }}
                axisLine={false}
                tickCount={5}
              />
              <Radar
                name="Skills"
                dataKey="score"
                stroke={theme.palette.primary.main}
                fill={theme.palette.primary.main}
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}