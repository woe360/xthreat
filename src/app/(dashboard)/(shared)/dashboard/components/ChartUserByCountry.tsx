// import * as React from 'react';
// import { PieChart } from '@mui/x-charts/PieChart';
// import { useDrawingArea } from '@mui/x-charts/hooks';
// import { styled } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// // import {
// //   IndiaFlag,
// //   UsaFlag,
// //   BrazilFlag,
// //   GlobeFlag,
// // } from '../internals/components/CustomIcons';

// const data = [
//   { label: 'India', value: 50000 },
//   { label: 'USA', value: 35000 },
//   { label: 'Brazil', value: 10000 },
//   { label: 'Other', value: 5000 },
// ];

// const countries = [
//   {
//     name: 'India',
//     value: 50,
//     // flag: <IndiaFlag />,
//     color: 'hsl(220, 25%, 65%)',
//   },
//   {
//     name: 'USA',
//     value: 35,
//     // flag: <UsaFlag />,
//     color: 'hsl(220, 25%, 45%)',
//   },
//   {
//     name: 'Brazil',
//     value: 10,
//     // flag: <BrazilFlag />,
//     color: 'hsl(220, 25%, 30%)',
//   },
//   {
//     name: 'Other',
//     value: 5,
//     // flag: <GlobeFlag />,
//     color: 'hsl(220, 25%, 20%)',
//   },
// ];

// interface StyledTextProps {
//   variant: 'primary' | 'secondary';
// }

// const StyledText = styled('text', {
//   shouldForwardProp: (prop) => prop !== 'variant',
// })<StyledTextProps>(({ theme }) => ({
//   textAnchor: 'middle',
//   dominantBaseline: 'central',
//   fill: (theme.vars || theme).palette.text.secondary,
//   variants: [
//     {
//       props: {
//         variant: 'primary',
//       },
//       style: {
//         fontSize: theme.typography.h5.fontSize,
//       },
//     },
//     {
//       props: ({ variant }) => variant !== 'primary',
//       style: {
//         fontSize: theme.typography.body2.fontSize,
//       },
//     },
//     {
//       props: {
//         variant: 'primary',
//       },
//       style: {
//         fontWeight: theme.typography.h5.fontWeight,
//       },
//     },
//     {
//       props: ({ variant }) => variant !== 'primary',
//       style: {
//         fontWeight: theme.typography.body2.fontWeight,
//       },
//     },
//   ],
// }));

// interface PieCenterLabelProps {
//   primaryText: string;
//   secondaryText: string;
// }

// function PieCenterLabel({ primaryText, secondaryText }: PieCenterLabelProps) {
//   const { width, height, left, top } = useDrawingArea();
//   const primaryY = top + height / 2 - 10;
//   const secondaryY = primaryY + 24;

//   return (
//     <React.Fragment>
//       <StyledText variant="primary" x={left + width / 2} y={primaryY}>
//         {primaryText}
//       </StyledText>
//       <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
//         {secondaryText}
//       </StyledText>
//     </React.Fragment>
//   );
// }

// const colors = [
//   'hsl(220, 20%, 65%)',
//   'hsl(220, 20%, 42%)',
//   'hsl(220, 20%, 35%)',
//   'hsl(220, 20%, 25%)',
// ];

// export default function ChartUserByCountry() {
//   return (
//     <Card
//       variant="outlined"
//       sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
//     >
//       <CardContent>
//         <Typography component="h2" variant="subtitle2">
//           Users by country
//         </Typography>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <PieChart
//             colors={colors}
//             margin={{
//               left: 80,
//               right: 80,
//               top: 80,
//               bottom: 80,
//             }}
//             series={[
//               {
//                 data,
//                 innerRadius: 75,
//                 outerRadius: 100,
//                 paddingAngle: 0,
//                 highlightScope: { faded: 'global', highlighted: 'item' },
//               },
//             ]}
//             height={260}
//             width={260}
//             slotProps={{
//               legend: { hidden: true },
//             }}
//           >
//             <PieCenterLabel primaryText="98.5K" secondaryText="Total" />
//           </PieChart>
//         </Box>
//         {countries.map((country, index) => (
//           <Stack
//             key={index}
//             direction="row"
//             sx={{ alignItems: 'center', gap: 2, pb: 2 }}
//           >
//             {country.flag}
//             <Stack sx={{ gap: 1, flexGrow: 1 }}>
//               <Stack
//                 direction="row"
//                 sx={{
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   gap: 2,
//                 }}
//               >
//                 <Typography variant="body2" sx={{ fontWeight: '500' }}>
//                   {country.name}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                   {country.value}%
//                 </Typography>
//               </Stack>
//               <LinearProgress
//                 variant="determinate"
//                 aria-label="Number of users by country"
//                 value={country.value}
//                 sx={{
//                   [`& .${linearProgressClasses.bar}`]: {
//                     backgroundColor: country.color,
//                   },
//                 }}
//               />
//             </Stack>
//           </Stack>
//         ))}
//       </CardContent>
//     </Card>
//   );
// }

'use client';

import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { label: 'India', value: 50000 },
  { label: 'USA', value: 35000 },
  { label: 'Brazil', value: 10000 },
  { label: 'Other', value: 5000 },
];

const countries = [
  {
    name: 'India',
    value: 50,
    color: 'rgb(158, 166, 187)'
  },
  {
    name: 'USA',
    value: 35,
    color: 'rgb(108, 117, 142)'
  },
  {
    name: 'Brazil',
    value: 10,
    color: 'rgb(71, 78, 94)'
  },
  {
    name: 'Other',
    value: 5,
    color: 'rgb(47, 52, 63)'
  },
];

const ChartUserByCountry = () => {
  return (
    <div className="rounded-lg border border-gray-200 flex flex-col gap-2 flex-grow-1">
      <div className="p-6">
        <h2 className="text-sm font-semibold mb-4">Users by country</h2>
        
        <div className="flex items-center justify-center relative mb-6">
          <PieChart width={260} height={260}>
            <Pie
              data={data}
              innerRadius={75}
              outerRadius={100}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={countries[index].color} />
              ))}
            </Pie>
          </PieChart>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-xl font-semibold">98.5K</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>

        {countries.map((country, index) => (
          <div key={index} className="flex items-center gap-4 pb-4">
            <div className="flex-grow">
              <div className="flex justify-between items-center gap-4 mb-2">
                <span className="text-sm font-medium">{country.name}</span>
                <span className="text-sm text-gray-600">{country.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className="h-1 rounded-full"
                  style={{
                    width: `${country.value}%`,
                    backgroundColor: country.color
                  }}
                  role="progressbar"
                  aria-label={`Number of users from ${country.name}`}
                  aria-valuenow={country.value}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartUserByCountry;