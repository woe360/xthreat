// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { FaShieldAlt, FaLock, FaUserSecret } from 'react-icons/fa';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
// };

// const PracticePage = () => {
//   const [timeFrame, setTimeFrame] = useState('day');

//   const dailyData = [
//     { name: '12AM', minutes: 0, phishing: 0, escapeRoom: 0, scamSimulator: 0 },
//     { name: '4AM', minutes: 0, phishing: 0, escapeRoom: 0, scamSimulator: 0 },
//     { name: '8AM', minutes: 30, phishing: 30, escapeRoom: 0, scamSimulator: 0 },
//     { name: '12PM', minutes: 45, phishing: 15, escapeRoom: 30, scamSimulator: 0 },
//     { name: '4PM', minutes: 60, phishing: 20, escapeRoom: 20, scamSimulator: 20 },
//     { name: '8PM', minutes: 15, phishing: 0, escapeRoom: 0, scamSimulator: 15 },
//   ];

//   const weeklyData = [
//     { name: 'Mon', minutes: 45, phishing: 30, escapeRoom: 0, scamSimulator: 15 },
//     { name: 'Tue', minutes: 60, phishing: 20, escapeRoom: 40, scamSimulator: 0 },
//     { name: 'Wed', minutes: 30, phishing: 0, escapeRoom: 30, scamSimulator: 0 },
//     { name: 'Thu', minutes: 75, phishing: 45, escapeRoom: 0, scamSimulator: 30 },
//     { name: 'Fri', minutes: 50, phishing: 20, escapeRoom: 20, scamSimulator: 10 },
//     { name: 'Sat', minutes: 15, phishing: 0, escapeRoom: 0, scamSimulator: 15 },
//     { name: 'Sun', minutes: 20, phishing: 20, escapeRoom: 0, scamSimulator: 0 },
//   ];

//   const monthlyData = [
//     { name: 'Week 1', minutes: 300, phishing: 120, escapeRoom: 90, scamSimulator: 90 },
//     { name: 'Week 2', minutes: 270, phishing: 90, escapeRoom: 120, scamSimulator: 60 },
//     { name: 'Week 3', minutes: 330, phishing: 150, escapeRoom: 60, scamSimulator: 120 },
//     { name: 'Week 4', minutes: 240, phishing: 60, escapeRoom: 90, scamSimulator: 90 },
//   ];

//   const getDataForTimeFrame = () => {
//     switch (timeFrame) {
//       case 'day':
//         return dailyData;
//       case 'week':
//         return weeklyData;
//       case 'month':
//         return monthlyData;
//       default:
//         return dailyData;
//     }
//   };

//   return (
//     <div className="min-h-min font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white flex flex-col p-4 sm:p-6">
//       <h1 className="text-3xl font-light sm:text-3xl mb-6 sm:mb-8">Practice</h1>

//       {/* Practice Topics Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-8">
//         <Link href="/practice/phishing-simulation" passHref>
//           <div
//             className="p-4 sm:p-6 rounded-lg cursor-pointer flex items-center"
//             style={componentStyle}
//           >
//             <FaShieldAlt className="text-2xl sm:text-3xl text-white mr-4" />
//             <div>
//               <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">Phishing Simulation</h2>
//               <p className="text-gray-300 text-sm sm:text-base">Simulate phishing attacks to test your skills.</p>
//             </div>
//           </div>
//         </Link>

//         <Link href="/practice/escape-rooms" passHref>
//           <div
//             className="p-4 sm:p-6 rounded-lg cursor-pointer flex items-center"
//             style={componentStyle}
//           >
//             <FaLock className="text-2xl sm:text-3xl text-white mr-4" />
//             <div>
//               <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">Escape Rooms</h2>
//               <p className="text-gray-300 text-sm sm:text-base">Navigate through scenarios to escape.</p>
//             </div>
//           </div>
//         </Link>

//         {/* <Link href="/practice/social-engineering" passHref>
//           <div
//             className="p-4 sm:p-6 rounded-lg cursor-pointer flex items-center"
//             style={componentStyle}
//           >
//             <FaUserSecret className="text-2xl sm:text-3xl text-white mr-4" />
//             <div>
//               <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">Scam Simulator</h2>
//               <p className="text-gray-300 text-sm sm:text-base">Identifying scammers in chat scenarios.</p>
//             </div>
//           </div>
//         </Link> */}
//       </div>

//       {/* Engagement Chart Section */}
//       <div className="mt-8 sm:mt-10 flex-grow">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl sm:text-3xl font-light">Engagement</h2>
//           <div className="flex space-x-3">
//             <button
//               className={`px-4 py-2 rounded ${timeFrame === 'day' ? 'bg-white text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
//               onClick={() => setTimeFrame('day')}
//             >
//               Day
//             </button>
//             <button
//               className={`px-4 py-2 rounded ${timeFrame === 'week' ? 'bg-white text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
//               onClick={() => setTimeFrame('week')}
//             >
//               Week
//             </button>
//             <button
//               className={`px-4 py-2 rounded ${timeFrame === 'month' ? 'bg-white text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
//               onClick={() => setTimeFrame('month')}
//             >
//               Month
//             </button>
//           </div>
//         </div>
//         <div
//           className="p-4 sm:p-6 rounded-lg shadow-lg"
//           style={{ ...componentStyle, height: '60vh' }}
//         >
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={getDataForTimeFrame()}>
//               <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
//               <XAxis dataKey="name" stroke="#ffffff" />
//               <YAxis stroke="#ffffff" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                   border: 'none',
//                   borderRadius: '4px',
//                   color: '#ffffff'
//                 }}
//               />
//               <Legend wrapperStyle={{ color: '#ffffff' }} />
//               <Line type="monotone" dataKey="minutes" name="Total Minutes" stroke="#8884d8" strokeWidth={2} />
//               <Line type="monotone" dataKey="phishing" name="Phishing Simulation" stroke="#82ca9d" />
//               <Line type="monotone" dataKey="escapeRoom" name="Escape Room" stroke="#ffc658" />
//               <Line type="monotone" dataKey="scamSimulator" name="Scam Simulator" stroke="#ff8042" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PracticePage;


// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { FaShieldAlt, FaLock, FaUserSecret } from 'react-icons/fa';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const componentStyle = {
//   background: '#050607',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
// };

// const PracticePage = () => {
//   const [timeFrame, setTimeFrame] = useState('day');

//   const dailyData = [
//     { name: '12AM', minutes: 0, phishing: 0, escapeRoom: 0, scamSimulator: 0 },
//     { name: '4AM', minutes: 0, phishing: 0, escapeRoom: 0, scamSimulator: 0 },
//     { name: '8AM', minutes: 30, phishing: 30, escapeRoom: 0, scamSimulator: 0 },
//     { name: '12PM', minutes: 45, phishing: 15, escapeRoom: 30, scamSimulator: 0 },
//     { name: '4PM', minutes: 60, phishing: 20, escapeRoom: 20, scamSimulator: 20 },
//     { name: '8PM', minutes: 15, phishing: 0, escapeRoom: 0, scamSimulator: 15 },
//   ];

//   const weeklyData = [
//     { name: 'Mon', minutes: 45, phishing: 30, escapeRoom: 0, scamSimulator: 15 },
//     { name: 'Tue', minutes: 60, phishing: 20, escapeRoom: 40, scamSimulator: 0 },
//     { name: 'Wed', minutes: 30, phishing: 0, escapeRoom: 30, scamSimulator: 0 },
//     { name: 'Thu', minutes: 75, phishing: 45, escapeRoom: 0, scamSimulator: 30 },
//     { name: 'Fri', minutes: 50, phishing: 20, escapeRoom: 20, scamSimulator: 10 },
//     { name: 'Sat', minutes: 15, phishing: 0, escapeRoom: 0, scamSimulator: 15 },
//     { name: 'Sun', minutes: 20, phishing: 20, escapeRoom: 0, scamSimulator: 0 },
//   ];

//   const monthlyData = [
//     { name: 'Week 1', minutes: 300, phishing: 120, escapeRoom: 90, scamSimulator: 90 },
//     { name: 'Week 2', minutes: 270, phishing: 90, escapeRoom: 120, scamSimulator: 60 },
//     { name: 'Week 3', minutes: 330, phishing: 150, escapeRoom: 60, scamSimulator: 120 },
//     { name: 'Week 4', minutes: 240, phishing: 60, escapeRoom: 90, scamSimulator: 90 },
//   ];

//   const getDataForTimeFrame = () => {
//     switch (timeFrame) {
//       case 'day':
//         return dailyData;
//       case 'week':
//         return weeklyData;
//       case 'month':
//         return monthlyData;
//       default:
//         return dailyData;
//     }
//   };

//   return (
//     <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6">
//       <div className="flex justify-between items-center mb-4 mt-3">
//         <h1 className="text-xl font-base text-white">Practice</h1>
//       </div>

//       {/* Practice Topics Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
//         <Link href="/practice/phishing-simulation" passHref>
//           <div className="bg-[#050607] border border-gray-800 rounded-lg p-6 cursor-pointer flex items-center">
//             <FaShieldAlt className="text-2xl sm:text-3xl text-gray-400 mr-4" />
//             <div>
//               <h2 className="text-xl font-semibold mb-2 text-gray-100">Phishing Simulation</h2>
//               <p className="text-gray-400 text-sm">Simulate phishing attacks to test your skills.</p>
//             </div>
//           </div>
//         </Link>

//         <Link href="/practice/escape-rooms" passHref>
//           <div className="bg-[#050607] border border-gray-800 rounded-lg p-6 cursor-pointer flex items-center">
//             <FaLock className="text-2xl sm:text-3xl text-gray-400 mr-4" />
//             <div>
//               <h2 className="text-xl font-semibold mb-2 text-gray-100">Escape Rooms</h2>
//               <p className="text-gray-400 text-sm">Navigate through scenarios to escape.</p>
//             </div>
//           </div>
//         </Link>

//         {/* <Link href="/practice/social-engineering" passHref>
//           <div className="bg-[#050607] border border-gray-800 rounded-lg p-6 cursor-pointer flex items-center">
//             <FaUserSecret className="text-2xl sm:text-3xl text-gray-400 mr-4" />
//             <div>
//               <h2 className="text-xl font-semibold mb-2 text-gray-100">Scam Simulator</h2>
//               <p className="text-gray-400 text-sm">Identifying scammers in chat scenarios.</p>
//             </div>
//           </div>
//         </Link> */}
//       </div>

//       {/* Engagement Chart Section */}
//       <div className="mt-8">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-lg font-base text-gray-100">Engagement</h2>
//           <div className="flex space-x-3">
//             <button
//               className={`px-4 py-1 rounded ${timeFrame === 'day' ? 'bg-blue-500/30 text-blue-400 ' : 'bg-[#050607] border border-gray-800 hover:border-gray-700'}`}
//               onClick={() => setTimeFrame('day')}
//             >
//               Day
//             </button>
//             <button
//               className={`px-4 py-2 rounded ${timeFrame === 'week' ? 'bg-blue-500/30 text-blue-400 ' : 'bg-[#050607] border border-gray-800 hover:border-gray-700'}`}
//               onClick={() => setTimeFrame('week')}
//             >
//               Week
//             </button>
//             <button
//               className={`px-4 py-2 rounded ${timeFrame === 'month' ? 'bg-blue-500/30 text-blue-400 ' : 'bg-[#050607] border border-gray-800 hover:border-gray-700'}`}
//               onClick={() => setTimeFrame('month')}
//             >
//               Month
//             </button>
//           </div>
//         </div>
//         <div className="bg-[#050607] border border-gray-800 rounded-lg p-6" style={{ height: '60vh' }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={getDataForTimeFrame()}>
//               <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
//               <XAxis dataKey="name" stroke="#6B7280" />
//               <YAxis stroke="#6B7280" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: '#1F2937',
//                   border: '1px solid #374151',
//                   borderRadius: '8px',
//                   color: '#F3F4F6'
//                 }}
//               />
//               <Legend wrapperStyle={{ color: '#6B7280' }} />
//               <Line type="monotone" dataKey="minutes" name="Total Minutes" stroke="#3B82F6" strokeWidth={2} />
//               <Line type="monotone" dataKey="phishing" name="Phishing Simulation" stroke="#10B981" strokeWidth={2} />
//               <Line type="monotone" dataKey="escapeRoom" name="Escape Room" stroke="#F59E0B" strokeWidth={2} />
//               <Line type="monotone" dataKey="scamSimulator" name="Scam Simulator" stroke="#EF4444" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PracticePage;




'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaShieldAlt, FaLock, FaUserSecret } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useRouter } from 'next/navigation';

const PracticePage = () => {
  const [timeFrame, setTimeFrame] = useState('day');
  const router = useRouter();

  const dailyData = [
    { name: '12AM', minutes: 0, phishing: 0, escapeRoom: 0, scamSimulator: 0 },
    { name: '4AM', minutes: 0, phishing: 0, escapeRoom: 0, scamSimulator: 0 },
    { name: '8AM', minutes: 30, phishing: 30, escapeRoom: 0, scamSimulator: 0 },
    { name: '12PM', minutes: 45, phishing: 15, escapeRoom: 30, scamSimulator: 0 },
    { name: '4PM', minutes: 60, phishing: 20, escapeRoom: 20, scamSimulator: 20 },
    { name: '8PM', minutes: 15, phishing: 0, escapeRoom: 0, scamSimulator: 15 },
  ];

  const weeklyData = [
    { name: 'Mon', minutes: 45, phishing: 30, escapeRoom: 0, scamSimulator: 15 },
    { name: 'Tue', minutes: 60, phishing: 20, escapeRoom: 40, scamSimulator: 0 },
    { name: 'Wed', minutes: 30, phishing: 0, escapeRoom: 30, scamSimulator: 0 },
    { name: 'Thu', minutes: 75, phishing: 45, escapeRoom: 0, scamSimulator: 30 },
    { name: 'Fri', minutes: 50, phishing: 20, escapeRoom: 20, scamSimulator: 10 },
    { name: 'Sat', minutes: 15, phishing: 0, escapeRoom: 0, scamSimulator: 15 },
    { name: 'Sun', minutes: 20, phishing: 20, escapeRoom: 0, scamSimulator: 0 },
  ];

  const monthlyData = [
    { name: 'Week 1', minutes: 300, phishing: 120, escapeRoom: 90, scamSimulator: 90 },
    { name: 'Week 2', minutes: 270, phishing: 90, escapeRoom: 120, scamSimulator: 60 },
    { name: 'Week 3', minutes: 330, phishing: 150, escapeRoom: 60, scamSimulator: 120 },
    { name: 'Week 4', minutes: 240, phishing: 60, escapeRoom: 90, scamSimulator: 90 },
  ];

  const getDataForTimeFrame = () => {
    switch (timeFrame) {
      case 'day':
        return dailyData;
      case 'week':
        return weeklyData;
      case 'month':
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const handleCreateCampaign = () => {
    router.push('/practice/create-campaign/recipients');
  };

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 px-10 py-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium">Practice</h1>
        <button
          onClick={handleCreateCampaign}
          className="bg-blue-500/30 text-blue-400 py-2 px-6 rounded-lg hover:bg-blue-500/40"
        >
          New Campaign
        </button>
      </div>

      <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
        <p className="text-gray-400">No active campaigns</p>
      </div>

      <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { value: '56', label: 'Active Campaigns' },
            { value: '70%', label: 'Opened' },
            { value: '9%', label: 'Reported' },
            { value: '36%', label: 'Failed' },
            { value: '3%', label: 'Training done' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#050607] border border-gray-800 p-4 rounded-lg text-center">
              <p className="text-2xl font-medium text-white">{stat.value}</p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-100">Engagement</h2>
          <div className="flex space-x-3">
            {['day', 'week', 'month'].map((frame) => (
              <button
                key={frame}
                className={`px-4 py-1 rounded ${
                  timeFrame === frame 
                    ? 'bg-blue-500/30 text-blue-400' 
                    : 'bg-[#181b24] border border-transparent hover:border-gray-800'
                }`}
                onClick={() => setTimeFrame(frame)}
              >
                {frame.charAt(0).toUpperCase() + frame.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6" style={{ height: '60vh' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getDataForTimeFrame()}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
              <Legend wrapperStyle={{ color: '#6B7280' }} />
              <Line type="monotone" dataKey="minutes" name="Total Minutes" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="phishing" name="Phishing Simulation" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="escapeRoom" name="Escape Room" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="scamSimulator" name="Scam Simulator" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;