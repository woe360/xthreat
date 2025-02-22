'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PhishingSimulation = () => {
  const [timeFrame, setTimeFrame] = useState('day');

  const dailyData = [
    { name: '12AM', minutes: 0, phishing: 0, escapeRoom: 0, scamSimulator: 0 },
    { name: '4AM', minutes: 0, phishing: 0, escapeRoom: 0, scamSimulator: 0 },
    { name: '8AM', minutes: 30, phishing: 30, escapeRoom: 0, scamSimulator: 0 },
    { name: '12PM', minutes: 45, phishing: 15, escapeRoom: 30, scamSimulator: 0 },
    { name: '4PM', minutes: 60, phishing: 20, escapeRoom: 20, scamSimulator: 20 },
    { name: '8PM', minutes: 15, phishing: 0, escapeRoom: 0, scamSimulator: 15 }
  ];

  const weeklyData = [
    { name: 'Mon', minutes: 45, phishing: 30, escapeRoom: 0, scamSimulator: 15 },
    { name: 'Tue', minutes: 60, phishing: 20, escapeRoom: 40, scamSimulator: 0 },
    { name: 'Wed', minutes: 30, phishing: 0, escapeRoom: 30, scamSimulator: 0 },
    { name: 'Thu', minutes: 75, phishing: 45, escapeRoom: 0, scamSimulator: 30 },
    { name: 'Fri', minutes: 50, phishing: 20, escapeRoom: 20, scamSimulator: 10 },
    { name: 'Sat', minutes: 15, phishing: 0, escapeRoom: 0, scamSimulator: 15 },
    { name: 'Sun', minutes: 20, phishing: 20, escapeRoom: 0, scamSimulator: 0 }
  ];

  const monthlyData = [
    { name: 'Week 1', minutes: 300, phishing: 120, escapeRoom: 90, scamSimulator: 90 },
    { name: 'Week 2', minutes: 270, phishing: 90, escapeRoom: 120, scamSimulator: 60 },
    { name: 'Week 3', minutes: 330, phishing: 150, escapeRoom: 60, scamSimulator: 120 },
    { name: 'Week 4', minutes: 240, phishing: 60, escapeRoom: 90, scamSimulator: 90 }
  ];

  const getDataForTimeFrame = () => {
    switch (timeFrame) {
      case 'day': return dailyData;
      case 'week': return weeklyData;
      case 'month': return monthlyData;
      default: return dailyData;
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 px-10 py-4">
      <div className="border-b border-gray-800 pb-8">
        <div className="flex items-center mb-8">
          <Link href="/practice" className="text-gray-400 hover:text-white flex items-center">
            <ChevronLeft /> Back
          </Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-medium">Campaigns</h1>
          <Link href="/practice/create-campaign" className="bg-blue-500/30 text-blue-400 py-2 px-4 rounded-lg">
            New Campaign
          </Link>
        </div>
      </div>

      <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-medium mb-4">Overview</h2>
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

      <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Performance</h2>
          <div className="flex space-x-2">
            <select className="bg-[#050607] border border-gray-800 p-2 rounded-lg text-gray-400">
              <option>1 week</option>
              <option>1 month</option>
              <option>3 months</option>
            </select>
            <button className="bg-[#050607] border border-gray-800 p-2 rounded-lg text-gray-400">%</button>
            <button className="bg-[#050607] border border-gray-800 p-2 rounded-lg text-gray-400">⟲</button>
          </div>
        </div>
        <div className="h-96">
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

export default PhishingSimulation;