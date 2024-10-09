// 'use client'

// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from 'recharts';
// import { Shield, AlertTriangle, Trophy, Target, Brain, Clock } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

//   const simulationPerformance = [
//     { name: 'Phishing Sim', success: 80, attempts: 100 },
//     { name: 'Password Crack', success: 60, attempts: 80 },
//     { name: 'Social Eng.', success: 70, attempts: 90 },
//     { name: 'Data Breach', success: 85, attempts: 100 },
//   ];

//   const learningProgress = {
//     completedModules: 7,
//     totalModules: 10,
//     avgScore: 85,
//     timeSpent: '12h 30m',
//   };

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
//     <div className="min-h-screen font-sans bg-black p-6 text-white">
//       <h1 className="text-3xl font-light mb-8">Progress</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//         <Card className="col-span-2" style={componentStyle}>
//           <CardHeader>
//             <CardTitle className="flex items-center text-white">
//               <Shield className="mr-2" /> Security Skills Overview
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={securitySkills}>
//                 <PolarGrid stroke={chartConfig.gridColor} />
//                 <PolarAngleAxis dataKey="subject" stroke={chartConfig.textColor} />
//                 <PolarRadiusAxis angle={30} domain={[0, 150]} stroke={chartConfig.textColor} />
//                 <Radar name="Your Skills" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//                 <Legend wrapperStyle={{ color: chartConfig.textColor }} />
//               </RadarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card style={componentStyle}>
//           <CardHeader>
//             <CardTitle className="flex items-center text-white">
//               <Brain className="mr-2" /> Learning Progress
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="mb-4">
//               <p className="text-gray-300 mb-2">Modules Completed: {learningProgress.completedModules}/{learningProgress.totalModules}</p>
//               <div className="w-full bg-gray-700 rounded-full h-2.5">
//                 <div
//                   className="bg-blue-600 h-2.5 rounded-full"
//                   style={{ width: `${(learningProgress.completedModules / learningProgress.totalModules) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
//             <p className="text-gray-300 flex items-center mb-2">
//               <Trophy className="mr-2" /> Average Score: {learningProgress.avgScore}%
//             </p>
//             <p className="text-gray-300 flex items-center">
//               <Clock className="mr-2" /> Time Spent: {learningProgress.timeSpent}
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <Card style={componentStyle}>
//           <CardHeader>
//             <CardTitle className="flex items-center text-white">
//               <Target className="mr-2" /> Simulation Performance
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={simulationPerformance}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} />
//                 <XAxis dataKey="name" stroke={chartConfig.textColor} />
//                 <YAxis stroke={chartConfig.textColor} />
//                 <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
//                 <Legend wrapperStyle={{ color: chartConfig.textColor }} />
//                 <Bar dataKey="success" fill="#4CAF50" name="Successful" />
//                 <Bar dataKey="attempts" fill="#FFA000" name="Total Attempts" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card style={componentStyle}>
//           <CardHeader>
//             <CardTitle className="text-white">Daily Engagement (Last 7 Days)</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={dailyEngagement}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} />
//                 <XAxis dataKey="name" stroke={chartConfig.textColor} />
//                 <YAxis stroke={chartConfig.textColor} />
//                 <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
//                 <Legend wrapperStyle={{ color: chartConfig.textColor }} />
//                 <Line type="monotone" dataKey="minutes" stroke="#8884d8" activeDot={{ r: 8 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       <Card style={componentStyle}>
//         <CardHeader>
//           <CardTitle className="flex items-center text-white">
//             <AlertTriangle className="mr-2" /> Areas for Improvement
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ul className="space-y-2">
//             <li className="flex items-center text-yellow-400">
//               <AlertTriangle className="mr-2" /> Strengthen your incident reporting skills
//             </li>
//             <li className="flex items-center text-yellow-400">
//               <AlertTriangle className="mr-2" /> Practice more on device security scenarios
//             </li>
//           </ul>
//         </CardContent>
//       </Card>
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
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
//   LineChart,
//   Line
// } from 'recharts';
// import { Shield, AlertTriangle, Trophy, Target, Brain, Clock } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

//   const simulationPerformance = [
//     { name: 'Phishing Sim', success: 80, attempts: 100 },
//     { name: 'Password Crack', success: 60, attempts: 80 },
//     { name: 'Social Eng.', success: 70, attempts: 90 },
//     { name: 'Data Breach', success: 85, attempts: 100 },
//   ];

//   const learningProgress = {
//     completedModules: 7,
//     totalModules: 10,
//     avgScore: 85,
//     timeSpent: '12h 30m',
//   };

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
//     <div className="min-h-screen font-sans bg-black p-6 text-white">
//       <h1 className="text-4xl font-semibold mb-8">Progress Dashboard</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//         {/* Security Skills Radar Chart */}
//         <Card className="col-span-2" style={componentStyle}>
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
//         </Card>

//         {/* Learning Progress */}
//         <Card style={componentStyle}>
//           <CardHeader>
//             <CardTitle className="flex items-center text-white">
//               Learning Progress
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="mb-6">
//               <p className="text-gray-300 mb-2">
//                 Modules Completed: {learningProgress.completedModules}/{learningProgress.totalModules}
//               </p>
//               <div className="w-full bg-gray-700 rounded-full h-3">
//                 <div
//                   className="bg-blue-500 h-3 rounded-full"
//                   style={{ width: `${(learningProgress.completedModules / learningProgress.totalModules) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
//             <p className="text-gray-300 flex items-center mb-4">
//               <Trophy className="mr-2" /> Average Score: {learningProgress.avgScore}%
//             </p>
//             <p className="text-gray-300 flex items-center">
//               <Clock className="mr-2" /> Time Spent: {learningProgress.timeSpent}
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//         {/* Simulation Performance */}
//         <Card style={componentStyle}>
//           <CardHeader>
//             <CardTitle className="flex items-center text-white">
//               Simulation Performance
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={350}>
//               <BarChart data={simulationPerformance}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} />
//                 <XAxis dataKey="name" stroke={chartConfig.textColor} />
//                 <YAxis stroke={chartConfig.textColor} />
//                 <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
//                 <Legend wrapperStyle={{ color: chartConfig.textColor }} />
//                 <Bar dataKey="success" fill="#4CAF50" name="Successful" />
//                 <Bar dataKey="attempts" fill="#FFA000" name="Total Attempts" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

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

//       {/* Areas for Improvement */}
//       <Card style={componentStyle}>
//         <CardHeader>
//           <CardTitle className="flex items-center text-white">
//             <AlertTriangle className="mr-2" /> Areas for Improvement
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ul className="space-y-4">
//             <li className="flex items-center text-yellow-400">
//               <AlertTriangle className="mr-2" /> Strengthen your incident reporting skills
//             </li>
//             <li className="flex items-center text-yellow-400">
//               <AlertTriangle className="mr-2" /> Practice more on device security scenarios
//             </li>
//           </ul>
//         </CardContent>
//       </Card>
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line
} from 'recharts';
import { Shield, AlertTriangle, Trophy, Target, Brain, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressSpiderWeb from './components/progressSpiderWeb';
// import ProgressSpiderWeb from '@/app/(main)/(pages)/progress/progressSpiderWeb';

const componentStyle = {
  background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
};

const ProgressPage = () => {
  const securitySkills = [
    { subject: 'Phishing Detection', A: 120, fullMark: 150 },
    { subject: 'Password Security', A: 98, fullMark: 150 },
    { subject: 'Data Protection', A: 86, fullMark: 150 },
    { subject: 'Social Engineering', A: 99, fullMark: 150 },
    { subject: 'Device Security', A: 85, fullMark: 150 },
    { subject: 'Incident Reporting', A: 65, fullMark: 150 },
  ];

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

  const chartConfig = {
    style: {
      background: 'transparent',
    },
    textColor: '#ffffff',
    gridColor: 'rgba(255, 255, 255, 0.1)',
  };

  return (
    <div className="min-h-screen font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-6 text-white">
      <h1 className="text-3xl font-light mb-8">Progress</h1>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* Security Skills Radar Chart */}
        <ProgressSpiderWeb />
        {/* <Card style={componentStyle}>
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              Security Skills Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={securitySkills}>
                <PolarGrid stroke={chartConfig.gridColor} />
                <PolarAngleAxis dataKey="subject" stroke={chartConfig.textColor} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} stroke={chartConfig.textColor} />
                <Radar
                  name="Your Skills"
                  dataKey="A"
                  stroke="#4CAF50"
                  fill="#4CAF50"
                  fillOpacity={0.6}
                />
                <Legend wrapperStyle={{ color: chartConfig.textColor }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}

        {/* Daily Engagement */}
        <Card style={componentStyle}>
          <CardHeader>
            <CardTitle className="text-white">Daily Engagement (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={dailyEngagement}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} />
                <XAxis dataKey="name" stroke={chartConfig.textColor} />
                <YAxis stroke={chartConfig.textColor} />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                <Legend wrapperStyle={{ color: chartConfig.textColor }} />
                <Line type="monotone" dataKey="minutes" stroke="#4CAF50" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Simulation Progress */}
        <Card style={componentStyle}>
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              Simulation Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={simulationProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} />
                <XAxis dataKey="week" stroke={chartConfig.textColor} />
                <YAxis stroke={chartConfig.textColor} />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                <Legend wrapperStyle={{ color: chartConfig.textColor }} />
                <Line type="monotone" dataKey="score" stroke="#2196F3" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quiz Performance */}
        <Card style={componentStyle}>
          <CardHeader>
            <CardTitle className="text-white">Quiz Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={quizPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} />
                <XAxis dataKey="quiz" stroke={chartConfig.textColor} />
                <YAxis stroke={chartConfig.textColor} />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                <Legend wrapperStyle={{ color: chartConfig.textColor }} />
                <Bar dataKey="participation" fill="#EFEFF0" name="Participation" />
                <Bar dataKey="success" fill="#D5CAD6" name="Success" />
                <Bar dataKey="failure" fill="#FFECD1" name="Failure" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      
    </div>
  );
};

export default ProgressPage;