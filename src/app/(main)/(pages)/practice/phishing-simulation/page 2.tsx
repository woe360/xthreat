'use client'

import React, { useState }  from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { FaShieldAlt, FaLock, FaUserSecret } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const componentStyle = {
  background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
};

const PhishingCampaigns = () => {
  const [timeFrame, setTimeFrame] = useState('day');

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


// const PhishingCampaigns = () => {
  return (
    <div className="min-h-screen font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-6 ">
      {/* Back Button */}
      <div className="flex justify-between items-center mb-8">
        {/* <Link className="text-gray-400 hover:text-white transition flex items-center" href="/practice">
          ‹ Back
        </Link> */}
        <Link className="text-gray-400 hover:text-white transition flex items-center" href="/practice">
        <ChevronLeft/> Back
        </Link>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
      
        <h1 className="text-4xl font-light text-white">Campaigns</h1>
        
        <Link className="bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-white transition" href="/practice/create-campaign" passHref>
            New Campaign
        </Link>
      </div>

      {/* Overview Section */}
      <div
        className="p-6 rounded-lg shadow-lg mb-8 border border-gray-700"
        style={{ 
          background: 'radial-gradient(125% 125% at 50% 25%, #000 20%, #223 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
            <p className="text-2xl font-bold text-white">56</p>
            <p className="text-gray-400">Active Campaigns</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
            <p className="text-2xl font-bold text-white">70%</p>
            <p className="text-gray-400">Opened</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
            <p className="text-2xl font-bold text-white">9%</p>
            <p className="text-gray-400">Reported</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
            <p className="text-2xl font-bold text-white">36%</p>
            <p className="text-gray-400">Failed</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
            <p className="text-2xl font-bold text-white">3%</p>
            <p className="text-gray-400">Training done</p>
          </div>
        </div>
      </div>

      {/* Performance Section */}
      <div
        className="p-6 rounded-lg shadow-lg border border-gray-700"
        style={{
          background: 'radial-gradient(125% 125% at 50% 25%, #000 20%, #223 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Performance</h2>
          <div className="flex space-x-2">
            <select className="bg-gray-800 p-2 rounded-lg border border-gray-700 text-white">
              <option>1 week</option>
              <option>1 month</option>
              <option>3 months</option>
            </select>
            <button className="bg-gray-800 p-2 rounded-lg border border-gray-700 text-white">
              %
            </button>
            <button className="bg-gray-800 p-2 rounded-lg border border-gray-700 text-white">
              ⟲
            </button>
          </div>
        </div>
        <div className="h-84 bg-neutral-800 rounded-lg flex items-center justify-center border border-gray-700">
          {/* Placeholder for the performance chart */}
          <div className="mt-8 sm:mt-10 flex-grow">
        <div className="flex justify-between items-center mb-4">
          
        </div>
        <div
          className="p-4 sm:p-6 rounded-lg shadow-lg"
          style={{ ...componentStyle, height: '50vh' }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getDataForTimeFrame()}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#ffffff'
                }}
              />
              <Legend wrapperStyle={{ color: '#ffffff' }} />
              <Line type="monotone" dataKey="minutes" name="Total Minutes" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="phishing" name="Phishing Simulation" stroke="#82ca9d" />
              <Line type="monotone" dataKey="escapeRoom" name="Escape Room" stroke="#ffc658" />
              <Line type="monotone" dataKey="scamSimulator" name="Scam Simulator" stroke="#ff8042" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default PhishingCampaigns;



// 'use client'

// import React, { useState } from 'react';
// import Link from 'next/link';

// const PhishingCampaigns = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div className="min-h-screen bg-black p-6">
//       {/* Back Button */}
//       <div className="flex justify-between items-center mb-8">
//         <Link className="text-gray-400 hover:text-white transition flex items-center" href="/practice">
//           ‹ Back
//         </Link>
//       </div>

//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold text-white">Campaigns</h1>
//         <button
//           onClick={openModal}
//           className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
//         >
//           New Campaign
//         </button>
//       </div>

//       {/* Overview Section */}
//       <div
//         className="p-6 rounded-lg shadow-lg mb-8 border border-gray-700"
//         style={{ 
//           background: 'radial-gradient(125% 125% at 50% 25%, #000 20%, #223 100%)',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
//         }}
//       >
//         <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
//             <p className="text-2xl font-bold text-white">56</p>
//             <p className="text-gray-400">Active Campaigns</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
//             <p className="text-2xl font-bold text-white">70%</p>
//             <p className="text-gray-400">Opened</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
//             <p className="text-2xl font-bold text-white">9%</p>
//             <p className="text-gray-400">Reported</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
//             <p className="text-2xl font-bold text-white">36%</p>
//             <p className="text-gray-400">Failed</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
//             <p className="text-2xl font-bold text-white">3%</p>
//             <p className="text-gray-400">Training done</p>
//           </div>
//         </div>
//       </div>

//       {/* Performance Section */}
//       <div
//         className="p-6 rounded-lg shadow-lg border border-gray-700"
//         style={{
//           background: 'radial-gradient(125% 125% at 50% 25%, #000 20%, #223 100%)',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
//         }}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-white">Performance</h2>
//           <div className="flex space-x-2">
//             <select className="bg-gray-800 p-2 rounded-lg border border-gray-700 text-white">
//               <option>1 week</option>
//               <option>1 month</option>
//               <option>3 months</option>
//             </select>
//             <button className="bg-gray-800 p-2 rounded-lg border border-gray-700 text-white">
//               %
//             </button>
//             <button className="bg-gray-800 p-2 rounded-lg border border-gray-700 text-white">
//               ⟲
//             </button>
//           </div>
//         </div>
//         <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
//           {/* Placeholder for the performance chart */}
//           <p className="text-gray-400">Performance Chart Here</p>
//         </div>
//       </div>

//       {/* Modal for New Campaign */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-96">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold text-gray-900">New Campaign</h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
//                 ✕
//               </button>
//             </div>
//             <p className="text-gray-600 mb-4">Set up the details for your new phishing campaign.</p>
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Campaign Name"
//                 className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
//               />
//               <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition w-full">
//                 Save Campaign
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PhishingCampaigns;
