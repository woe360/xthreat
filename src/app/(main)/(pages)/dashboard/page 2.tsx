'use client'
import React from 'react';
import { Shield, Lock, Award, Target, Zap, CheckCircle, Timer, Bell, Eye, Brain, Cpu, TrendingUp, AlertTriangle, Star } from 'lucide-react';
// import Leaderboard from '@/app/(main)/(pages)/dashboard/leaderboard';
// import RecentLessons from '@/app/(main)/(pages)/dashboard/recentLessons';
import { CardContent, CardHeader, CardTitle } from "@/components/global/ui/card";
import { Card } from '@/components/global/ui/card';
import { Progress } from "@/components/global/ui/progress";
import Link from 'next/link';
// import AnalyticsComponent from '@/components/global/charts/AnalyticsPhishDasboard';
import Leaderboard from './components/leaderboard';
import RecentLessons from './components/recentLessons';
import AnalyticsComponent from './components/AnalyticsPhishDasboard';

const componentStyle = {
  background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
};

// const componentStyle = {
//   background: 'linear-gradient(to bottom, #0C1821 5%, #0C1821 70%)',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
// };

const certifications = [
  { name: "CISSP", progress: 60 },
  { name: "CEH", progress: 30 },
  { name: "CompTIA Security+", progress: 85 },
];


// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #1a1a2e 5%, #16213e 70%, #0f3460 100%)', // Deep blues and teals
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
// };



// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #0a0a0a 5%, #13132b 70%, #1b1b40 100%)', // Charcoal to deep navy
// };


// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #060606 5%, #12121f 70%, #202040 100%)', // Black to dark sapphire blue
// };


const RadarChart = ({ data, size = 200 }) => {
  const padding = 22; // Add padding around the chart
  const chartSize = size; // Keep the original size of the chart
  const centerX = (chartSize + padding * 2) / 2; // Adjust center based on the new SVG size
  const centerY = (chartSize + padding * 2) / 2;
  const radius = chartSize * 0.4;

  const getCoordinates = (angle, value) => {
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

// const RadarChart = ({ data, size = 200 }) => {
//   const centerX = size / 2;
//   const centerY = size / 2;
//   const radius = size * 0.4;

//   const getCoordinates = (angle, value) => {
//     const x = centerX + Math.cos(angle - Math.PI / 2) * radius * (value / 100);
//     const y = centerY + Math.sin(angle - Math.PI / 2) * radius * (value / 100);
//     return { x, y };
//   };

//   const points = data.map((skill, index) => {
//     const angle = (index / data.length) * 2 * Math.PI;
//     return getCoordinates(angle, skill.value);
//   });

//   const shapePath = points.map((point, i) => (i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`)).join(' ') + ' Z';

//   return (
//     <svg width={size} height={size}>
//       {[0.25, 0.5, 0.75, 1].map((scale, i) => (
//         <circle
//           key={i}
//           cx={centerX}
//           cy={centerY}
//           r={radius * scale}
//           fill="none"
//           stroke="#4B5563"
//           strokeWidth="0.5"
//         />
//       ))}
//       {data.map((_, index) => {
//         const angle = (index / data.length) * 2 * Math.PI;
//         const endX = centerX + Math.cos(angle - Math.PI / 2) * radius;
//         const endY = centerY + Math.sin(angle - Math.PI / 2) * radius;
//         return (
//           <line
//             key={index}
//             x1={centerX}
//             y1={centerY}
//             x2={endX}
//             y2={endY}
//             stroke="#4B5563"
//             strokeWidth="0.5"
//           />
//         );
//       })}
//       <path d={shapePath} fill="#10B981" fillOpacity="0.6" stroke="#10B981" strokeWidth="2" />
//       {data.map((skill, index) => {
//         const angle = (index / data.length) * 2 * Math.PI;
//         const labelRadius = radius + 20;
//         const x = centerX + Math.cos(angle - Math.PI / 2) * labelRadius;
//         const y = centerY + Math.sin(angle - Math.PI / 2) * labelRadius;
//         return (
//           <text
//             key={index}
//             x={x}
//             y={y}
//             textAnchor="middle"
//             dominantBaseline="middle"
//             fill="#9CA3AF"
//             fontSize="12"
//           >
//             {skill.name}
//           </text>
//         );
//       })}
//     </svg>
//   );
// };

const DashboardPage = () => {
  const skills = [
    { name: 'Network Security', value: 85, icon: Shield, fill: '#10B981' },
    { name: 'Encryption', value: 92, icon: Lock, fill: '#3B82F6' },
    { name: 'Threat Detection', value: 78, icon: Eye, fill: '#F59E0B' },
    { name: 'Social Engineering', value: 70, icon: Brain, fill: '#8B5CF6' },
    { name: 'System Hardening', value: 65, icon: Cpu, fill: '#EC4899' }
  ];

  const milestones = [
    { icon: Shield, title: "Security Posture Score", value: "85/100", subtext: "+5 pts" },
    { icon: Award, title: "Certifications Earned", value: "3", subtext: "of 5 available" },
    { icon: Target, title: "Threat Simulations Passed", value: "12/15", subtext: "80% success rate" },
    { icon: Zap, title: "Incident Response Time", value: "4.2 min", subtext: "-1.3 min" }
  ];

  return (
    <div className="min-h-screen font-sans p-6 space-y-6 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-neutral-300">
      <h1 className="text-3xl font-light mb-8 text-neutral-200">Dashboard</h1>
      
      

      {/* Summary */}
      <div className="rounded-lg border border-gray-700 p-6" style={componentStyle}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: CheckCircle, title: "Total Completed", value: "24 Lessons", color: "text-emerald-500" },
            { icon: Zap, title: "Current Streak", value: "7 Days", color: "text-yellow-500" },
            { icon: Timer, title: "Avg. Completion Time", value: "45 Minutes", color: "text-blue-500" },
            { icon: TrendingUp, title: "Leaderboard Progression", value: "+2 positions", color: "text-red-500"}
          ].map((item, index) => (
            <div
              key={index}
              className={`flex flex-row items-center justify-center space-x-3 ${
                index < 3 ? 'border-r border-neutral-600 pr-6' : ''
              } ${index < 2 ? 'border-b md:border-b-0 pb-6 md:pb-0' : ''}`}
            >
              <item.icon className={`w-8 h-8 ${item.color}`} />
              <div className="flex flex-col text-left">
                <p className="text-xl font-bold text-neutral-200">{item.value}</p>
                <p className="text-sm text-neutral-400">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>




      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Skills */}
        <div className="rounded-lg border border-gray-700 p-8 col-span-2" style={componentStyle}>
          <h2 className="text-2xl font-semibold mb-4 text-neutral-200">Skills</h2>
          <div className="flex">
            <div className="w-2/3 flex justify-center items-center">
              <RadarChart data={skills} size={400} />
            </div>
            <div className="w-1/3 border-l border-neutral-700 pl-4 space-y-4">
              {/* Legend Section */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-200 mb-6">Legend</h3>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <skill.icon className="w-5 h-5 mr-2" style={{ color: skill.fill }} />
                        <span className="text-sm text-neutral-400">{skill.name}</span>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: skill.fill }}>{skill.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Border Bottom */}
              <div className="border-b border-neutral-700 my-4"></div>

              {/* Insights Section */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-200 mb-2">Insights</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />
                    <div>
                      <p className="text-sm text-neutral-400">Most Improved</p>
                      <p className="text-neutral-200">Encryption</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                    <div>
                      <p className="text-sm text-neutral-400">Needs Attention</p>
                      <p className="text-neutral-200">System Hardening</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps Section */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-200 mb-2">Next Steps</h3>
                <ul className="list-disc list-inside text-sm text-neutral-400">
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
              <CardTitle className="text-2xl font-semibold text-neutral-200">Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {milestones.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-2" style={{ color: '#10B981' }} />
                      <span className="text-sm text-neutral-400">{item.title}</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-lg font-semibold text-neutral-200 mr-1">{item.value}</span>
                      <span className="text-sm text-emerald-500">{item.subtext}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-b border-neutral-700 my-4"></div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-neutral-200">Certification Progress</h3>
                {certifications.map((cert, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-s text-neutral-400">{cert.name}</span>
                      <span className="text-s font-semibold text-neutral-200">{`${cert.progress}%`}</span>
                    </div>
                    <Progress value={cert.progress} className="h-1" />
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-neutral-200">Weekly Goals</h3>
                <div className="bg-neutral-800 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-s text-neutral-400">Progress</span>
                    <span className="text-s font-semibold text-neutral-200">4/7 days</span>
                  </div>
                  <Progress value={57} className="h-1 mb-2" />
                  <p className="text-sm text-neutral-400">Keep up the momentum! You're on track to meet your weekly study goal.</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-neutral-200">Recent Achievements</h3>
                <ul className="list-disc list-inside text-s text-neutral-400 space-y-1">
                  <li>Completed Advanced Threat Detection course</li>
                  <li>Improved incident response time by 30%</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-neutral-200">Upcoming Challenges</h3>
                <ul className="list-disc list-inside text-s text-neutral-400 space-y-1">
                  <li>Network Penetration Testing simulation</li>
                  <li>Cloud Security certification exam</li>
                </ul>
              </div>

              <div className="space-y-4">
            <div className="flex items-center">
              <Bell className="w-6 h-6 mr-3 text-amber-500" />
              <p className="text-neutral-300">Current Threat Level: <span className="font-semibold text-amber-500">Elevated</span></p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-200 mb-2">Top Threats This Week</h3>
              <ul className="list-disc list-inside text-neutral-400">
                <li>Phishing campaigns targeting finance sector</li>
                <li>Zero-day vulnerability in popular CMS</li>
                <li>Ransomware attacks on healthcare institutions</li>
              </ul>
            </div>
            <div className="mt-4">
              <div className="space-y-2">
                <div className="bg-neutral-800 rounded-lg p-2">
                  <p className="text-sm text-neutral-300"><span className="text-yellow-400 font-bold">UPDATE:</span> Patch released for critical vulnerability in widely-used network protocol.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

        {/* Recent Lessons Card */}
        <div className="rounded-lg border border-gray-700 p-6" style={componentStyle}>
          <h2 className="text-2xl font-semibold mb-4 text-neutral-200">Recent Lessons</h2>
          <RecentLessons />
        </div>

        {/* Threat Awareness Component */}
        <div className="rounded-lg p-6 border border-gray-700" style={componentStyle}>
          <AnalyticsComponent/>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
        <div className="rounded-lg p-6 border border-gray-700" style={componentStyle}>
          <h2 className="text-2xl font-semibold mb-4 text-neutral-200">Leaderboard</h2>
          <div className="flex space-x-2 mb-4">
            <button className="px-3 py-1 bg-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-600">Filter by Org</button>
            <button className="px-3 py-1 bg-neutral-600 text-neutral-200 rounded-lg hover:bg-neutral-500">Filter by Team</button>
          </div>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;








// 'use client'

// import React from 'react';
// import { Shield, Lock, Award, Target, Zap, CheckCircle, Timer, Bell, Eye, Brain, Cpu, TrendingUp, AlertTriangle, Star } from 'lucide-react';
// import Leaderboard from '@/components/global/leaderboard';
// import RecentLessons from '@/components/global/recentLessons';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import Link from 'next/link';
// import AnalyticsComponent from '@/components/global/AnalyticsPhishDasboard';

// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
// };

// const certifications = [
//   { name: "CISSP", progress: 60 },
//   { name: "CEH", progress: 30 },
//   { name: "CompTIA Security+", progress: 85 },
// ];

// const RadarChart = ({ data, size = 200 }) => {
//   const padding = 22;
//   const chartSize = size;
//   const centerX = (chartSize + padding * 2) / 2;
//   const centerY = (chartSize + padding * 2) / 2;
//   const radius = chartSize * 0.4;

//   const getCoordinates = (angle, value) => {
//     const x = centerX + Math.cos(angle - Math.PI / 2) * radius * (value / 100);
//     const y = centerY + Math.sin(angle - Math.PI / 2) * radius * (value / 100);
//     return { x, y };
//   };

//   const points = data.map((skill, index) => {
//     const angle = (index / data.length) * 2 * Math.PI;
//     return getCoordinates(angle, skill.value);
//   });

//   const shapePath = points
//     .map((point, i) => (i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`))
//     .join(' ') + ' Z';

//   return (
//     <svg width={chartSize + padding * 2} height={chartSize + padding * 2}>
//       {[0.25, 0.5, 0.75, 1].map((scale, i) => (
//         <circle
//           key={i}
//           cx={centerX}
//           cy={centerY}
//           r={radius * scale}
//           fill="none"
//           stroke="#4B5563"
//           strokeWidth="1"
//         />
//       ))}
//       {data.map((_, index) => {
//         const angle = (index / data.length) * 2 * Math.PI;
//         const endX = centerX + Math.cos(angle - Math.PI / 2) * radius;
//         const endY = centerY + Math.sin(angle - Math.PI / 2) * radius;
//         return (
//           <line
//             key={index}
//             x1={centerX}
//             y1={centerY}
//             x2={endX}
//             y2={endY}
//             stroke="#4B5563"
//             strokeWidth="0.5"
//           />
//         );
//       })}
//       <path d={shapePath} fill="#10B981" fillOpacity="0.6" stroke="#10B981" strokeWidth="2" />
//       {data.map((skill, index) => {
//         const angle = (index / data.length) * 2 * Math.PI;
//         const labelRadius = radius + 20;
//         const x = centerX + Math.cos(angle - Math.PI / 2) * labelRadius;
//         const y = centerY + Math.sin(angle - Math.PI / 2) * labelRadius;
//         return (
//           <text
//             key={index}
//             x={x}
//             y={y}
//             textAnchor="middle"
//             dominantBaseline="middle"
//             fill="#9CA3AF"
//             fontSize="12"
//           >
//             {skill.name}
//           </text>
//         );
//       })}
//     </svg>
//   );
// };

// const DashboardPage = () => {
//   const skills = [
//     { name: 'Network Security', value: 85, icon: Shield, fill: '#10B981' },
//     { name: 'Encryption', value: 92, icon: Lock, fill: '#3B82F6' },
//     { name: 'Threat Detection', value: 78, icon: Eye, fill: '#F59E0B' },
//     { name: 'Social Engineering', value: 70, icon: Brain, fill: '#8B5CF6' },
//     { name: 'System Hardening', value: 65, icon: Cpu, fill: '#EC4899' }
//   ];

//   const milestones = [
//     { icon: Shield, title: "Security Posture Score", value: "85/100", subtext: "+5 pts" },
//     { icon: Award, title: "Certifications Earned", value: "3", subtext: "of 5 available" },
//     { icon: Target, title: "Threat Simulations Passed", value: "12/15", subtext: "80% success rate" },
//     { icon: Zap, title: "Incident Response Time", value: "4.2 min", subtext: "-1.3 min" }
//   ];

//   return (
//     <div className="min-h-screen font-sans p-6 space-y-6 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-neutral-300">
//       <h1 className="text-3xl font-light mb-8 text-neutral-200">Dashboard</h1>
      
//       {/* Summary */}
//       <div className="rounded-lg border border-gray-700 p-6" style={componentStyle}>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {[
//             { icon: CheckCircle, title: "Total Completed", value: "24 Lessons", color: "text-emerald-500" },
//             { icon: Zap, title: "Current Streak", value: "7 Days", color: "text-yellow-500" },
//             { icon: Timer, title: "Avg. Completion Time", value: "45 Minutes", color: "text-blue-500" },
//             { icon: TrendingUp, title: "Leaderboard Progression", value: "+2 positions", color: "text-red-500"}
//           ].map((item, index) => (
//             <div
//               key={index}
//               className={`flex flex-row items-center justify-center space-x-3 ${
//                 index < 3 ? 'border-r border-neutral-600 pr-6' : ''
//               } ${index < 2 ? 'border-b md:border-b-0 pb-6 md:pb-0' : ''}`}
//             >
//               <item.icon className={`w-8 h-8 ${item.color}`} />
//               <div className="flex flex-col text-left">
//                 <p className="text-xl font-bold text-neutral-200">{item.value}</p>
//                 <p className="text-sm text-neutral-400">{item.title}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Skills */}
//         <div className="rounded-lg border border-gray-700 p-8 col-span-2" style={componentStyle}>
//           <h2 className="text-2xl font-semibold mb-4 text-neutral-200">Skills</h2>
//           <div className="flex">
//             <div className="w-2/3 flex justify-center items-center">
//               <RadarChart data={skills} size={400} />
//             </div>
//             <div className="w-1/3 border-l border-neutral-700 pl-4 space-y-4">
//               {/* Legend Section */}
//               <div>
//                 <h3 className="text-lg font-semibold text-neutral-200 mb-2">Legend</h3>
//                 <div className="space-y-3">
//                   {skills.map((skill, index) => (
//                     <div key={index} className="flex items-center justify-between">
//                       <div className="flex items-center ">
//                         <skill.icon className="w-5 h-5 mr-2" style={{ color: skill.fill }} />
//                         <span className="text-sm text-neutral-400">{skill.name}</span>
//                       </div>
//                       <span className="text-sm font-semibold" style={{ color: skill.fill }}>{skill.value}%</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Border Bottom */}
//               <div className="border-b border-neutral-700 my-4"></div>

//               {/* Insights Section */}
//               <div>
//                 <h3 className="text-lg font-semibold text-neutral-200 mb-2">Insights</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center">
//                     <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />
//                     <div>
//                       <p className="text-sm text-neutral-400">Most Improved</p>
//                       <p className="text-neutral-200">Encryption</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center">
//                     <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
//                     <div>
//                       <p className="text-sm text-neutral-400">Needs Attention</p>
//                       <p className="text-neutral-200">System Hardening</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Next Steps Section */}
//               <div>
//                 <h3 className="text-lg font-semibold text-neutral-200 mb-2">Next Steps</h3>
//                 <ul className="list-disc list-inside text-sm text-neutral-400">
//                   <li>Complete System Hardening course</li>
//                   <li>Practice Threat Detection scenarios</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Achievements */}
//           <Card className="row-span-2" style={componentStyle}>
//             <CardHeader>
//               <CardTitle className="text-2xl font-semibold text-neutral-200">Achievements</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-3">
//                 {milestones.map((item, index) => (
//                   <div key={index} className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <item.icon className="w-5 h-5 mr-2" style={{ color: '#10B981' }} />
//                       <span className="text-sm text-neutral-400">{item.title}</span>
//                     </div>
//                     <div className="flex items-baseline">
//                       <span className="text-lg font-semibold text-neutral-200 mr-1">{item.value}</span>
//                       <span className="text-sm text-emerald-500">{item.subtext}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-b border-neutral-700 my-4"></div>

//               <div className="space-y-3">
//                 <h3 className="text-xl font-semibold text-neutral-200">Certification Progress</h3>
//                 {certifications.map((cert, index) => (
//                   <div key={index} className="space-y-1">
//                     <div className="flex justify-between items-baseline">
//                       <span className="text-s text-neutral-400">{cert.name}</span>
//                       <span className="text-s font-semibold text-neutral-200">{`${cert.progress}%`}</span>
//                     </div>
//                     <Progress value={cert.progress} className="h-1" />
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-3">
//                 <h3 className="text-xl font-semibold text-neutral-200">Weekly Goals</h3>
//                 <div className="bg-neutral-800 rounded-lg p-3">
//                   <div className="flex justify-between items-center mb-1">
//                     <span className="text-s text-neutral-400">Progress</span>
//                     <span className="text-s font-semibold text-neutral-200">4/7 days</span>
//                   </div>
//                   <Progress value={57} className="h-1 mb-2" />
//                   <p className="text-sm text-neutral-400">Keep up the momentum! You're on track to meet your weekly study goal.</p>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <h3 className="text-xl font-semibold text-neutral-200">Recent Achievements</h3>
//                 <ul className="list-disc list-inside text-s text-neutral-400 space-y-1">
//                   <li>Completed Advanced Threat Detection course</li>
//                   <li>Improved incident response time by 30%</li>
//                 </ul>
//               </div>

//               <div className="space-y-3">
//                 <h3 className="text-xl font-semibold text-neutral-200">Upcoming Challenges</h3>
//                 <ul className="list-disc list-inside text-s text-neutral-400 space-y-1">
//                   <li>Network Penetration Testing simulation</li>
//                   <li>Cloud Security certification exam</li>
//                 </ul>
//               </div>

//               <div className="space-y-4">
//             <div className="flex items-center">
//               <Bell className="w-6 h-6 mr-3 text-amber-500" />
//               <p className="text-neutral-300">Current Threat Level: <span className="font-semibold text-amber-500">Elevated</span></p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-neutral-200 mb-2">Top Threats This Week</h3>
//               <ul className="list-disc list-inside text-neutral-400">
//                 <li>Phishing campaigns targeting finance sector</li>
//                 <li>Zero-day vulnerability in popular CMS</li>
//                 <li>Ransomware attacks on healthcare institutions</li>
//               </ul>
//             </div>
//             <div className="mt-4">
//               <div className="space-y-2">
//                 <div className="bg-neutral-800 rounded-lg p-2">
//                   <p className="text-sm text-neutral-300"><span className="text-yellow-400 font-bold">UPDATE:</span> Patch released for critical vulnerability in widely-used network protocol.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//         {/* Recent Lessons Card */}
//         <div className="rounded-lg border border-gray-700 p-6" style={componentStyle}>
//           <h2 className="text-2xl font-semibold mb-4 text-neutral-200">Recent Lessons</h2>
//           <RecentLessons />
//         </div>

//         {/* Threat Awareness Component */}
//         <div className="rounded-lg p-6 border border-gray-700" style={componentStyle}>
//           <AnalyticsComponent />
//       </div>

//       {/* Leaderboard */}
//       <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
//         <div className="rounded-lg p-6 border border-gray-700" style={componentStyle}>
//           <h2 className="text-2xl font-semibold mb-4 text-neutral-200">Leaderboard</h2>
//           <div className="flex space-x-2 mb-4">
//             <button className="px-3 py-1 bg-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-600">Filter by Org</button>
//             <button className="px-3 py-1 bg-neutral-600 text-neutral-200 rounded-lg hover:bg-neutral-500">Filter by Team</button>
//           </div>
//           <Leaderboard />
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default DashboardPage;




// // import React from 'react';
// // import Link from 'next/link';
// // import { Shield, Award, Target, Zap, Lock, Eye, Brain, Cpu, TrendingUp, AlertTriangle, CheckCircle, Timer, Bell, Calendar } from 'lucide-react';
// // import ProgressChart from '@/components/global/charts/progressDashboard';
// // import Leaderboard from '@/components/global/leaderboard';
// // import RecentLessons from '@/components/global/recentLessons';

// // const componentStyle = {
// //   background: 'radial-gradient(125% 125% at 50% 25%, #000 20%, #223 100%)',
// //   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
// // };

// // const DashboardPage = () => {
// //   const skills = [
// //     { name: 'Network Security', icon: Shield, progress: 85 },
// //     { name: 'Encryption Techniques', icon: Lock, progress: 92 },
// //     { name: 'Threat Detection', icon: Eye, progress: 78 },
// //     { name: 'Social Engineering', icon: Brain, progress: 70 },
// //     { name: 'System Hardening', icon: Cpu, progress: 65 }
// //   ];

// //   const milestones = [
// //     { icon: Shield, title: "Security Posture Score", value: "85/100", subtext: "+5 pts" },
// //     { icon: Award, title: "Certifications Earned", value: "3", subtext: "of 5 available" },
// //     { icon: Target, title: "Threat Simulations Passed", value: "12/15", subtext: "80% success rate" },
// //     { icon: Zap, title: "Incident Response Time", value: "4.2 min", subtext: "-1.3 min" }
// //   ];

// //   return (
// //     <div className="min-h-screen font-sans bg-black p-6 text-white">
// //       {/* Header */}
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-4xl font-bold">Cybersecurity Training Dashboard</h1>
// //         <Link className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition" href="/practice">
// //           Practice Area
// //         </Link>
// //       </div>

// //       {/* Learning Summary */}
// //       <div className="p-6 rounded-lg shadow-lg mb-8 border border-gray-700" style={componentStyle}>
// //         <h2 className="text-xl font-semibold mb-4">Your Learning Summary</h2>
// //         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// //           {[
// //             { icon: CheckCircle, title: "Total Completed", value: "24 Lessons" },
// //             { icon: Zap, title: "Current Streak", value: "7 Days" },
// //             { icon: Timer, title: "Avg. Completion Time", value: "45 Minutes" }
// //           ].map((item, index) => (
// //             <div key={index} className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
// //               <item.icon className="w-8 h-8 mx-auto mb-2 text-purple-500" />
// //               <p className="text-2xl font-bold">{item.value}</p>
// //               <p className="text-gray-400">{item.title}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         {/* Skill Mastery Card */}
// //         <div className="lg:col-span-2 p-6 rounded-lg shadow-lg border border-gray-700" style={componentStyle}>
// //           <h2 className="text-xl font-semibold mb-4">Skill Mastery</h2>
// //           <div className="space-y-4">
// //             {skills.map((skill, index) => (
// //               <div key={index} className="flex items-center">
// //                 <skill.icon className="w-8 h-8 mr-4 text-purple-500" />
// //                 <div className="flex-grow">
// //                   <p className="text-lg font-semibold">{skill.name}</p>
// //                   <div className="flex items-center">
// //                     <div className="w-full bg-gray-700 rounded-full h-2 mr-3">
// //                       <div className="bg-purple-600 h-2 rounded-full" style={{width: `${skill.progress}%`}}></div>
// //                     </div>
// //                     <span className="text-gray-400 w-12">{skill.progress}%</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="mt-6 grid grid-cols-2 gap-4">
// //             <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
// //               <h3 className="text-lg font-semibold mb-2">Insights</h3>
// //               <div className="space-y-2">
// //                 <div className="flex items-center">
// //                   <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
// //                   <p className="text-sm">Most Improved: Encryption Techniques</p>
// //                 </div>
// //                 <div className="flex items-center">
// //                   <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
// //                   <p className="text-sm">Needs Attention: System Hardening</p>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
// //               <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
// //               <ul className="list-disc list-inside text-sm text-gray-400">
// //                 <li>Complete System Hardening course</li>
// //                 <li>Practice Threat Detection scenarios</li>
// //               </ul>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Security Milestones Card */}
// //         <div className="p-6 rounded-lg shadow-lg border border-gray-700" style={componentStyle}>
// //           <h2 className="text-xl font-semibold mb-4">Security Milestones</h2>
// //           <div className="space-y-4 mb-6">
// //             {milestones.map((item, index) => (
// //               <div key={index} className="bg-gray-800 p-3 rounded-lg border border-gray-700">
// //                 <div className="flex items-center">
// //                   <item.icon className="w-8 h-8 mr-3 text-purple-500" />
// //                   <div>
// //                     <p className="text-sm text-gray-400">{item.title}</p>
// //                     <div className="flex items-center">
// //                       <span className="text-xl font-bold mr-2">{item.value}</span>
// //                       <span className="text-green-500 text-sm">{item.subtext}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
// //             <h3 className="text-lg font-semibold mb-2">Certification Progress</h3>
// //             <div className="flex items-center justify-between">
// //               <span className="text-gray-400">CISSP</span>
// //               <div className="w-2/3 bg-gray-700 rounded-full h-2">
// //                 <div className="bg-purple-600 h-2 rounded-full" style={{width: '60%'}}></div>
// //               </div>
// //               <span>60%</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Threat Awareness Component */}
// //         <div className="p-6 rounded-lg shadow-lg border border-gray-700" style={componentStyle}>
// //           <h2 className="text-xl font-semibold mb-4">Threat Awareness</h2>
// //           <div className="space-y-4">
// //             <div className="flex items-center bg-gray-800 p-3 rounded-lg border border-gray-700">
// //               <Bell className="w-6 h-6 mr-3 text-amber-500" />
// //               <p>Current Threat Level: <span className="font-semibold text-amber-500">Elevated</span></p>
// //             </div>
// //             <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
// //               <h3 className="text-lg font-semibold mb-2">Top Threats This Week</h3>
// //               <ul className="list-disc list-inside text-sm text-gray-400">
// //                 <li>Phishing campaigns targeting finance sector</li>
// //                 <li>Zero-day vulnerability in popular CMS</li>
// //                 <li>Ransomware attacks on healthcare institutions</li>
// //               </ul>
// //             </div>
// //             <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
// //               <h4 className="font-semibold mb-2">Recommended Action</h4>
// //               <p className="text-sm text-gray-400">Review and update incident response plans for ransomware scenarios.</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Recent Lessons Card */}
// //         <div className="p-6 rounded-lg shadow-lg border border-gray-700" style={componentStyle}>
// //           <h2 className="text-xl font-semibold mb-4">Recent Lessons</h2>
// //           <RecentLessons />
// //         </div>


// //         {/* Leaderboard */}
// //         <div className="p-6 rounded-lg shadow-lg border border-gray-700" style={componentStyle}>
// //           <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
// //           <div className="flex space-x-2 mb-4">
// //             <button className="bg-gray-800 px-3 py-1 rounded-lg border border-gray-700 text-white hover:bg-gray-700 transition">Filter by Org</button>
// //             <button className="bg-gray-800 px-3 py-1 rounded-lg border border-gray-700 text-white hover:bg-gray-700 transition">Filter by Team</button>
// //           </div>
// //           <Leaderboard />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DashboardPage;


