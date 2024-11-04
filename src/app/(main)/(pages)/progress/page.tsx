// 'use client'
// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   Line
// } from 'recharts';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import ProgressSpiderWeb from './components/progressSpiderWeb';

// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
// };

// const ProgressPage = () => {
//   const securitySkills = [
//     { subject: 'Phishing Detection', A: 120, fullMark: 150 },
//     { subject: 'Password Security', A: 98, fullMark: 150 },
//     { subject: 'Data Protection', A: 86, fullMark: 150 },
//     { subject: 'Social Engineering', A: 99, fullMark: 150 },
//     { subject: 'Device Security', A: 85, fullMark: 150 },
//     { subject: 'Incident Reporting', A: 65, fullMark: 150 },
//   ];

//   const simulationProgress = [
//     { week: 'Week 1', score: 65 },
//     { week: 'Week 2', score: 72 },
//     { week: 'Week 3', score: 78 },
//     { week: 'Week 4', score: 85 },
//     { week: 'Week 5', score: 82 },
//     { week: 'Week 6', score: 88 },
//     { week: 'Week 7', score: 92 },
//   ];

//   const quizPerformance = [
//     { quiz: 'Quiz 1', participation: 100, success: 80, failure: 20 },
//     { quiz: 'Quiz 2', participation: 95, success: 75, failure: 20 },
//     { quiz: 'Quiz 3', participation: 90, success: 85, failure: 5 },
//     { quiz: 'Quiz 4', participation: 100, success: 90, failure: 10 },
//     { quiz: 'Quiz 5', participation: 85, success: 70, failure: 15 },
//   ];

//   const dailyEngagement = [
//     { name: 'Mon', minutes: 45 },
//     { name: 'Tue', minutes: 60 },
//     { name: 'Wed', minutes: 30 },
//     { name: 'Thu', minutes: 75 },
//     { name: 'Fri', minutes: 50 },
//     { name: 'Sat', minutes: 15 },
//     { name: 'Sun', minutes: 20 },
//   ];

//   const chartConfig = {
//     style: {
//       background: 'transparent',
//     },
//     textColor: '#ffffff',
//     gridColor: 'rgba(255, 255, 255, 0.1)',
//   };

//   return (
//     <div className="min-h-screen font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-6 text-white">
//       <h1 className="text-3xl font-light mb-8">Progress</h1>


//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

//         {/* Security Skills Radar Chart */}
//         <ProgressSpiderWeb />
//         {/* <Card style={componentStyle}>
//           <CardHeader>
//             <CardTitle className="flex items-center text-white">
//               Security Skills Overview
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={350}>
//               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={securitySkills}>
//                 <PolarGrid stroke={chartConfig.gridColor} />
//                 <PolarAngleAxis dataKey="subject" stroke={chartConfig.textColor} />
//                 <PolarRadiusAxis angle={30} domain={[0, 150]} stroke={chartConfig.textColor} />
//                 <Radar
//                   name="Your Skills"
//                   dataKey="A"
//                   stroke="#4CAF50"
//                   fill="#4CAF50"
//                   fillOpacity={0.6}
//                 />
//                 <Legend wrapperStyle={{ color: chartConfig.textColor }} />
//               </RadarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card> */}

//         {/* Daily Engagement */}
//         <Card style={componentStyle}>
//           <CardHeader>
//             <CardTitle className="text-white">Daily Engagement (Last 7 Days)</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={350}>
//               <LineChart data={dailyEngagement}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} />
//                 <XAxis dataKey="name" stroke={chartConfig.textColor} />
//                 <YAxis stroke={chartConfig.textColor} />
//                 <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
//                 <Legend wrapperStyle={{ color: chartConfig.textColor }} />
//                 <Line type="monotone" dataKey="minutes" stroke="#4CAF50" strokeWidth={3} activeDot={{ r: 8 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//         {/* Simulation Progress */}
//         <Card style={componentStyle}>
//           <CardHeader>
//             <CardTitle className="flex items-center text-white">
//               Simulation Progress
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={350}>
//               <LineChart data={simulationProgress}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} />
//                 <XAxis dataKey="week" stroke={chartConfig.textColor} />
//                 <YAxis stroke={chartConfig.textColor} />
//                 <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
//                 <Legend wrapperStyle={{ color: chartConfig.textColor }} />
//                 <Line type="monotone" dataKey="score" stroke="#2196F3" strokeWidth={3} activeDot={{ r: 8 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Quiz Performance */}
//         <Card style={componentStyle}>
//           <CardHeader>
//             <CardTitle className="text-white">Quiz Performance</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={350}>
//               <BarChart data={quizPerformance}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} />
//                 <XAxis dataKey="quiz" stroke={chartConfig.textColor} />
//                 <YAxis stroke={chartConfig.textColor} />
//                 <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
//                 <Legend wrapperStyle={{ color: chartConfig.textColor }} />
//                 <Bar dataKey="participation" fill="#EFEFF0" name="Participation" />
//                 <Bar dataKey="success" fill="#D5CAD6" name="Success" />
//                 <Bar dataKey="failure" fill="#FFECD1" name="Failure" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

      
//     </div>
//   );
// };

// export default ProgressPage;

// 'use client'
// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   Line
// } from 'recharts';
// import { Card } from "@/components/ui/card";
// import ProgressSpiderWeb from './components/progressSpiderWeb';

// const ProgressPage = () => {
//   const simulationProgress = [
//     { week: 'Week 1', score: 65 },
//     { week: 'Week 2', score: 72 },
//     { week: 'Week 3', score: 78 },
//     { week: 'Week 4', score: 85 },
//     { week: 'Week 5', score: 82 },
//     { week: 'Week 6', score: 88 },
//     { week: 'Week 7', score: 92 },
//   ];

//   const quizPerformance = [
//     { quiz: 'Quiz 1', participation: 100, success: 80, failure: 20 },
//     { quiz: 'Quiz 2', participation: 95, success: 75, failure: 20 },
//     { quiz: 'Quiz 3', participation: 90, success: 85, failure: 5 },
//     { quiz: 'Quiz 4', participation: 100, success: 90, failure: 10 },
//     { quiz: 'Quiz 5', participation: 85, success: 70, failure: 15 },
//   ];

//   const dailyEngagement = [
//     { name: 'Mon', minutes: 45 },
//     { name: 'Tue', minutes: 60 },
//     { name: 'Wed', minutes: 30 },
//     { name: 'Thu', minutes: 75 },
//     { name: 'Fri', minutes: 50 },
//     { name: 'Sat', minutes: 15 },
//     { name: 'Sun', minutes: 20 },
//   ];

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-[#1F2937] border border-gray-800 rounded-lg p-3">
//           <p className="text-gray-300 mb-1">{label}</p>
//           {payload.map((item, index) => (
//             <p key={index} className="text-sm" style={{ color: item.color }}>
//               {item.name}: {item.value}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-[#0D1018] text-gray-100 p-4 pl-1">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-white">Progress</h1>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
//         <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-gray-400 text-sm">Overall Score</h3>
//             <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">+12%</span>
//           </div>
//           <p className="text-2xl font-bold">92%</p>
//           <div className="text-sm text-gray-400 mt-2">Last 30 days</div>
//         </div>
        
//         <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-gray-400 text-sm">Completed Modules</h3>
//             <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">+5</span>
//           </div>
//           <p className="text-2xl font-bold">24</p>
//           <div className="text-sm text-gray-400 mt-2">Out of 30</div>
//         </div>
        
//         <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-gray-400 text-sm">Active Time</h3>
//             <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">+2.5h</span>
//           </div>
//           <p className="text-2xl font-bold">18.5h</p>
//           <div className="text-sm text-gray-400 mt-2">This month</div>
//         </div>
        
//         <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-gray-400 text-sm">Certifications</h3>
//             <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded">New</span>
//           </div>
//           <p className="text-2xl font-bold">3</p>
//           <div className="text-sm text-gray-400 mt-2">In progress: 2</div>
//         </div>
//       </div>

//       {/* Main Charts Grid - 50/50 split */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6">
//           <h2 className="text-lg font-semibold mb-6">Skills Overview</h2>
//           <div className="h-[400px]">
//             {/* <ProgressSpiderWeb /> */}
//           </div>
//         </div>

//         <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6">
//           <h2 className="text-lg font-semibold mb-6">Daily Engagement</h2>
//           <div className="h-[400px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={dailyEngagement}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
//                 <XAxis dataKey="name" stroke="#6B7280" />
//                 <YAxis stroke="#6B7280" />
//                 <Tooltip content={CustomTooltip} />
//                 <Line 
//                   type="monotone" 
//                   dataKey="minutes" 
//                   stroke="#3B82F6" 
//                   strokeWidth={2}
//                   dot={{ fill: '#3B82F6', strokeWidth: 2 }}
//                   activeDot={{ r: 8 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Charts Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6">
//           <h2 className="text-lg font-semibold mb-6">Simulation Progress</h2>
//           <div className="h-[400px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={simulationProgress}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
//                 <XAxis dataKey="week" stroke="#6B7280" />
//                 <YAxis stroke="#6B7280" />
//                 <Tooltip content={CustomTooltip} />
//                 <Line 
//                   type="monotone" 
//                   dataKey="score" 
//                   stroke="#10B981" 
//                   strokeWidth={2}
//                   dot={{ fill: '#10B981', strokeWidth: 2 }}
//                   activeDot={{ r: 8 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6">
//           <h2 className="text-lg font-semibold mb-6">Quiz Performance</h2>
//           <div className="h-[400px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={quizPerformance}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
//                 <XAxis dataKey="quiz" stroke="#6B7280" />
//                 <YAxis stroke="#6B7280" />
//                 <Tooltip content={CustomTooltip} />
//                 <Bar dataKey="participation" fill="#3B82F6" fillOpacity={0.8} />
//                 <Bar dataKey="success" fill="#10B981" fillOpacity={0.8} />
//                 <Bar dataKey="failure" fill="#EF4444" fillOpacity={0.8} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgressPage;

'use client'
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Card } from "@/components/ui/card";
import ProgressSpiderWeb from './components/progressSpiderWeb';

const ProgressPage = () => {
  const simulationProgress = [
    { week: 'Week 1', score: 65 },
    { week: 'Week 2', score: 72 },
    { week: 'Week 3', score: 78 },
    { week: 'Week 4', score: 85 },
    { week: 'Week 5', score: 82 },
    { week: 'Week 6', score: 88 },
    { week: 'Week 7', score: 92 },
  ];

  const quizPerformance = [
    { quiz: 'Quiz 1', participation: 100, success: 80, failure: 20 },
    { quiz: 'Quiz 2', participation: 95, success: 75, failure: 20 },
    { quiz: 'Quiz 3', participation: 90, success: 85, failure: 5 },
    { quiz: 'Quiz 4', participation: 100, success: 90, failure: 10 },
    { quiz: 'Quiz 5', participation: 85, success: 70, failure: 15 },
  ];

  const dailyEngagement = [
    { name: 'Mon', minutes: 45 },
    { name: 'Tue', minutes: 60 },
    { name: 'Wed', minutes: 30 },
    { name: 'Thu', minutes: 75 },
    { name: 'Fri', minutes: 50 },
    { name: 'Sat', minutes: 15 },
    { name: 'Sun', minutes: 20 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1F2937] border border-gray-800 rounded-lg p-3">
          <p className="text-gray-300 mb-1">{label}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {item.name}: {item.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6">
      <div className="flex justify-between items-center mb-6 mt-3">
        <h1 className="text-xl font-base text-white">Progress</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400 text-sm">Overall Score</h3>
            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">+12%</span>
          </div>
          <p className="text-2xl font-bold">92%</p>
          <div className="text-sm text-gray-400 mt-2">Last 30 days</div>
        </div>
        
        <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400 text-sm">Completed Modules</h3>
            <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">+5</span>
          </div>
          <p className="text-2xl font-bold">24</p>
          <div className="text-sm text-gray-400 mt-2">Out of 30</div>
        </div>
        
        <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400 text-sm">Active Time</h3>
            <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">+2.5h</span>
          </div>
          <p className="text-2xl font-bold">18.5h</p>
          <div className="text-sm text-gray-400 mt-2">This month</div>
        </div>
        
        <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400 text-sm">Certifications</h3>
            <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded">New</span>
          </div>
          <p className="text-2xl font-bold">3</p>
          <div className="text-sm text-gray-400 mt-2">In progress: 2</div>
        </div>
      </div>

      {/* Main Charts Grid - 50/50 split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Skills Overview</h2>
          <div className="h-[220px]">
            {/* <ProgressSpiderWeb /> */}
          </div>
        </div>

        <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Daily Engagement</h2>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyEngagement}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={CustomTooltip} />
                <Line 
                  type="monotone" 
                  dataKey="minutes" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Simulation Progress</h2>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={simulationProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={CustomTooltip} />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Quiz Performance</h2>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quizPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="quiz" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={CustomTooltip} />
                <Bar dataKey="participation" fill="#3B82F6" fillOpacity={0.8} />
                <Bar dataKey="success" fill="#10B981" fillOpacity={0.8} />
                <Bar dataKey="failure" fill="#EF4444" fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;