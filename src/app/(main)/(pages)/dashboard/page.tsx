//adding types

'use client'
import React from 'react';
import { Shield, Lock, Award, Target, Zap, CheckCircle, Timer, Bell, Eye, Brain, Cpu, TrendingUp, AlertTriangle, Star } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';
import Leaderboard from './components/leaderboard';
import RecentLessons from './components/recentLessons';
import AnalyticsComponent from './components/AnalyticsPhishDasboard';
import { LucideIcon } from 'lucide-react';

interface ComponentStyle {
  background: string;
  border: string;
  boxShadow: string;
}

interface Skill {
  name: string;
  value: number;
  icon: LucideIcon;
  fill: string;
}

interface Milestone {
  icon: LucideIcon;
  title: string;
  value: string;
  subtext: string;
}

interface Certification {
  name: string;
  progress: number;
}

interface RadarChartProps {
  data: Skill[];
  size?: number;
}

interface SummaryCard {
  icon: LucideIcon;
  title: string;
  value: string;
  color: string;
}

interface Point {
  x: number;
  y: number;
}

const componentStyle: ComponentStyle = {
  background: 'black-900 bg-opacity-50',
  border: '1px solid rgba(31, 41, 55)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
};

const certifications: Certification[] = [
  { name: "CISSP", progress: 60 },
  { name: "CEH", progress: 30 },
  { name: "CompTIA Security+", progress: 85 },
];

const RadarChart: React.FC<RadarChartProps> = ({ data, size = 200 }) => {
  const padding = 22;
  const chartSize = size;
  const centerX = (chartSize + padding * 2) / 2;
  const centerY = (chartSize + padding * 2) / 2;
  const radius = chartSize * 0.4;

  const getCoordinates = (angle: number, value: number): Point => {
    const x = centerX + Math.cos(angle - Math.PI / 2) * radius * (value / 100);
    const y = centerY + Math.sin(angle - Math.PI / 2) * radius * (value / 100);
    return { x, y };
  };

  const points = data.map((skill, index) => {
    const angle = (index / data.length) * 2 * Math.PI;
    return getCoordinates(angle, skill.value);
  });

  const shapePath = points
    .map((point, i) => (i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`))
    .join(' ') + ' Z';

  return (
    <svg width={chartSize + padding * 2} height={chartSize + padding * 2}>
      {[0.25, 0.5, 0.75, 1].map((scale, i) => (
        <circle
          key={i}
          cx={centerX}
          cy={centerY}
          r={radius * scale}
          fill="none"
          stroke="#4B5563"
          strokeWidth="1"
        />
      ))}
      {data.map((_, index) => {
        const angle = (index / data.length) * 2 * Math.PI;
        const endX = centerX + Math.cos(angle - Math.PI / 2) * radius;
        const endY = centerY + Math.sin(angle - Math.PI / 2) * radius;
        return (
          <line
            key={index}
            x1={centerX}
            y1={centerY}
            x2={endX}
            y2={endY}
            stroke="#4B5563"
            strokeWidth="0.5"
          />
        );
      })}
      <path d={shapePath} fill="#10B981" fillOpacity="0.6" stroke="#10B981" strokeWidth="2" />
      {data.map((skill, index) => {
        const angle = (index / data.length) * 2 * Math.PI;
        const labelRadius = radius + 20;
        const x = centerX + Math.cos(angle - Math.PI / 2) * labelRadius;
        const y = centerY + Math.sin(angle - Math.PI / 2) * labelRadius;
        return (
          <text
            key={index}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#9CA3AF"
            fontSize="12"
          >
            {skill.name}
          </text>
        );
      })}
    </svg>
  );
};

const DashboardPage: React.FC = () => {
  const skills: Skill[] = [
    { name: 'Network Security', value: 85, icon: Shield, fill: '#10B981' },
    { name: 'Encryption', value: 92, icon: Lock, fill: '#3B82F6' },
    { name: 'Threat Detection', value: 78, icon: Eye, fill: '#F59E0B' },
    { name: 'Social Engineering', value: 70, icon: Brain, fill: '#8B5CF6' },
    { name: 'System Hardening', value: 65, icon: Cpu, fill: '#EC4899' }
  ];

  const milestones: Milestone[] = [
    { icon: Shield, title: "Security Posture Score", value: "85/100", subtext: "+5 pts" },
    { icon: Award, title: "Certifications Earned", value: "3", subtext: "of 5 available" },
    { icon: Target, title: "Threat Simulations Passed", value: "12/15", subtext: "80% success rate" },
    { icon: Zap, title: "Incident Response Time", value: "4.2 min", subtext: "-1.3 min" }
  ];

  const summaryCards: SummaryCard[] = [
    { icon: CheckCircle, title: "Total Completed", value: "24 Lessons", color: "text-emerald-500" },
    { icon: Zap, title: "Current Streak", value: "7 Days", color: "text-yellow-500" },
    { icon: Timer, title: "Avg. Completion Time", value: "45 Minutes", color: "text-blue-500" },
    { icon: TrendingUp, title: "Leaderboard Progression", value: "+2 positions", color: "text-red-500"}
  ];
  return (
    <div className="min-h-screen font-sans p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-r from-gray-900/20 via-transparent to-gray-900/20 text-neutral-300">
      <h1 className="text-xl font-light text-neutral-200">Dashboard</h1>
      
      {/* Summary */}
      <div className="rounded-lg border border-gray-700 p-4 sm:p-6" style={componentStyle}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {summaryCards.map((item, index) => (
            <div
              key={index}
              className={`flex flex-row items-center justify-start space-x-3 ${
                index < 3 ? 'sm:border-r sm:border-neutral-600 sm:pr-6' : ''
              } ${index < 3 ? 'border-b sm:border-b-0 pb-4 sm:pb-0' : ''}`}
            >
              <item.icon className={`w-8 h-8 ${item.color}`} />
              <div className="flex flex-col text-left">
                <p className="text-lg sm:text-xl text-neutral-200">{item.value}</p>
                <p className="text-xs sm:text-sm text-neutral-400">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Skills */}
        <div className="rounded-lg border border-gray-700 p-4 sm:p-8 col-span-1 lg:col-span-2" style={componentStyle}>
          <h2 className="text-lg sm:text-xl mb-4 text-neutral-200">Skills</h2>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/3 flex justify-center items-center mb-4 lg:mb-0">
              <RadarChart data={skills} size={300} />
            </div>
            <div className="w-full lg:w-1/3 lg:border-l lg:border-neutral-700 lg:pl-4 space-y-4">
              {/* Legend Section */}
              <div>
                <h3 className="text-lg text-neutral-200 mb-4 sm:mb-6">Legend</h3>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <skill.icon className="w-5 h-5 mr-2" style={{ color: skill.fill }} />
                        <span className="text-xs sm:text-sm text-neutral-400">{skill.name}</span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold" style={{ color: skill.fill }}>{skill.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Border Bottom */}
              <div className="border-b border-neutral-700 my-4"></div>

              {/* Insights Section */}
              <div>
                <h3 className="text-lg text-neutral-200 mb-2">Insights</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />
                    <div>
                      <p className="text-xs sm:text-sm text-neutral-400">Most Improved</p>
                      <p className="text-sm sm:text-base text-neutral-200">Encryption</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                    <div>
                      <p className="text-xs sm:text-sm text-neutral-400">Needs Attention</p>
                      <p className="text-sm sm:text-base text-neutral-200">System Hardening</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps Section */}
              <div>
                <h3 className="text-lg text-neutral-200 mb-2">Next Steps</h3>
                <ul className="list-disc list-inside text-xs sm:text-sm text-neutral-400">
                  <li>Complete System Hardening course</li>
                  <li>Practice Threat Detection scenarios</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <Card className="row-span-2" style={componentStyle}>
          <CardHeader>
            <CardTitle className="text-xl sm:text-xl text-neutral-200">Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {milestones.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" style={{ color: '#10B981' }} />
                    <span className="text-xs sm:text-sm text-neutral-400">{item.title}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-sm sm:text-lg text-neutral-200 mr-1">{item.value}</span>
                    <span className="text-xs sm:text-sm text-emerald-500">{item.subtext}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-b border-neutral-700 my-4"></div>

            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl text-neutral-200">Certification Progress</h3>
              {certifications.map((cert, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs sm:text-sm text-neutral-400">{cert.name}</span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-200">{`${cert.progress}%`}</span>
                  </div>
                  <Progress value={cert.progress} className="h-1" />
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl text-neutral-200">Weekly Goals</h3>
              <div className="bg-neutral-800 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs sm:text-sm text-neutral-400">Progress</span>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-200">4/7 days</span>
                </div>
                <Progress value={57} className="h-1 mb-2" />
                <p className="text-xs sm:text-sm text-neutral-400">Keep up the momentum! You're on track to meet your weekly study goal.</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl text-neutral-200">Recent Achievements</h3>
              <ul className="list-disc list-inside text-xs sm:text-sm text-neutral-400 space-y-1">
                <li>Completed Advanced Threat Detection course</li>
                <li>Improved incident response time by 30%</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl text-neutral-200">Upcoming Challenges</h3>
              <ul className="list-disc list-inside text-xs sm:text-sm text-neutral-400 space-y-1">
                <li>Network Penetration Testing simulation</li>
                <li>Cloud Security certification exam</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-amber-500" />
                <p className="text-sm sm:text-base text-neutral-300">Current Threat Level: <span className="font-semibold text-amber-500">Elevated</span></p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg text-neutral-200 mb-2">Top Threats This Week</h3>
                <ul className="list-disc list-inside text-xs sm:text-sm text-neutral-400">
                  <li>Phishing campaigns targeting finance sector</li>
                  <li>Zero-day vulnerability in popular CMS</li>
                  <li>Ransomware attacks on healthcare institutions</li>
                </ul>
              </div>
              <div className="mt-4">
                <div className="space-y-2">
                  <div className="bg-neutral-800 rounded-lg p-2">
                    <p className="text-xs sm:text-sm text-neutral-300">
                      <span className="text-yellow-400 font-bold">UPDATE:</span> Patch released for critical vulnerability in widely-used network protocol.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Lessons Card */}
        <div className="rounded-lg border border-gray-700 p-4 sm:p-6" style={componentStyle}>
          <h2 className="text-xl sm:text-2xl mb-4 text-neutral-200">Recent Lessons</h2>
          <RecentLessons />
        </div>

        {/* Threat Awareness Component */}
        <div className="rounded-lg p-4 sm:p-6 border border-gray-700" style={componentStyle}>
          <AnalyticsComponent />
        </div>
      </div>
    </div>
  );
  
};

export default DashboardPage;




// import * as React from 'react';
// import type {} from '@mui/x-date-pickers/themeAugmentation';
// import type {} from '@mui/x-charts/themeAugmentation';
// import type {} from '@mui/x-data-grid/themeAugmentation';
// import type {} from '@mui/x-tree-view/themeAugmentation';
// import { alpha } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import AppNavbar from './components/AppNavbar';
// import Header from './components/Header';
// import MainGrid from './components/MainGrid';
// import SideMenu from './components/SideMenu';
// import AppTheme from './shared-theme/AppTheme';
// import {
//   chartsCustomizations,
//   dataGridCustomizations,
//   datePickersCustomizations,
//   treeViewCustomizations,
// } from './theme/customization';


// const xThemeComponents = {
//   ...chartsCustomizations,
//   ...dataGridCustomizations,
//   ...datePickersCustomizations,
//   ...treeViewCustomizations,
// };

// export default function Dashboard(props: { disableCustomTheme?: boolean }) {
//   return (
//     <AppTheme {...props} themeComponents={xThemeComponents}>
//       <CssBaseline enableColorScheme />
//       <Box sx={{ display: 'flex' }}>
//         <SideMenu />
//         <AppNavbar />
//         {/* Main content */}
//         <Box
//           component="main"
//           sx={(theme) => ({
//             flexGrow: 1,
//             backgroundColor: theme.vars
//               ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
//               : alpha(theme.palette.background.default, 1),
//             overflow: 'auto',
//           })}
//         >
//           <Stack
//             spacing={2}
//             sx={{
//               alignItems: 'center',
//               mx: 3,
//               pb: 5,
//               mt: { xs: 8, md: 0 },
//             }}
//           >
//             <Header />
//             <MainGrid />
//           </Stack>
//         </Box>
//       </Box>
//     </AppTheme>
//   );
// }