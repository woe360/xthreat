'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaShieldAlt, FaLock, FaUserSecret } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const componentStyle = {
  background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
};

const PracticePage = () => {
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

  return (
    <div className="min-h-min font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white flex flex-col p-4 sm:p-6">
      <h1 className="text-3xl font-light sm:text-3xl mb-6 sm:mb-8">Practice</h1>

      {/* Practice Topics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-8">
        <Link href="/practice/phishing-simulation" passHref>
          <div
            className="p-4 sm:p-6 rounded-lg cursor-pointer flex items-center"
            style={componentStyle}
          >
            <FaShieldAlt className="text-2xl sm:text-3xl text-white mr-4" />
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">Phishing Simulation</h2>
              <p className="text-gray-300 text-sm sm:text-base">Simulate phishing attacks to test your skills.</p>
            </div>
          </div>
        </Link>

        <Link href="/practice/escape-rooms" passHref>
          <div
            className="p-4 sm:p-6 rounded-lg cursor-pointer flex items-center"
            style={componentStyle}
          >
            <FaLock className="text-2xl sm:text-3xl text-white mr-4" />
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">Escape Rooms</h2>
              <p className="text-gray-300 text-sm sm:text-base">Navigate through scenarios to escape.</p>
            </div>
          </div>
        </Link>

        {/* <Link href="/practice/social-engineering" passHref>
          <div
            className="p-4 sm:p-6 rounded-lg cursor-pointer flex items-center"
            style={componentStyle}
          >
            <FaUserSecret className="text-2xl sm:text-3xl text-white mr-4" />
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">Scam Simulator</h2>
              <p className="text-gray-300 text-sm sm:text-base">Identifying scammers in chat scenarios.</p>
            </div>
          </div>
        </Link> */}
      </div>

      {/* Engagement Chart Section */}
      <div className="mt-8 sm:mt-10 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-light">Engagement</h2>
          <div className="flex space-x-3">
            <button
              className={`px-4 py-2 rounded ${timeFrame === 'day' ? 'bg-white text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setTimeFrame('day')}
            >
              Day
            </button>
            <button
              className={`px-4 py-2 rounded ${timeFrame === 'week' ? 'bg-white text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setTimeFrame('week')}
            >
              Week
            </button>
            <button
              className={`px-4 py-2 rounded ${timeFrame === 'month' ? 'bg-white text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setTimeFrame('month')}
            >
              Month
            </button>
          </div>
        </div>
        <div
          className="p-4 sm:p-6 rounded-lg shadow-lg"
          style={{ ...componentStyle, height: '60vh' }}
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
  );
};

export default PracticePage;
