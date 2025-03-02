'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CampaignState from '@/lib/state/campaignState';

const SchedulePage = () => {
  const router = useRouter();
  const campaignState = CampaignState.getInstance();
  
  const savedSchedule = campaignState.getData('schedule') || {};
  const [campaignName, setCampaignName] = useState(savedSchedule.campaignName || 'Campaign 1');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [startTime, setStartTime] = useState('8:00 AM');
  const [endTime, setEndTime] = useState('6:00 PM');
  const [timezone, setTimezone] = useState('GMT-08:00 - Pacific Time (US & Canada)');

  // Load saved schedule data on mount
  useEffect(() => {
    setStartDate(savedSchedule.startDate || '');
    setEndDate(savedSchedule.endDate || '');
    setSelectedDays(savedSchedule.selectedDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
    setStartTime(savedSchedule.startTime || '8:00 AM');
    setEndTime(savedSchedule.endTime || '6:00 PM');
    setTimezone(savedSchedule.timezone || 'GMT-08:00 - Pacific Time (US & Canada)');
  }, []);

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDayToggle = (day) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSaveAndContinue = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }

    const scheduleData = {
      campaignName,
      startDate,
      endDate,
      selectedDays,
      startTime,
      endTime,
      timezone
    };

    campaignState.updateData('schedule', scheduleData);
    router.push('/practice/create-campaign/overview');
  };

  const handleCampaignNameChange = (e) => {
    const newName = e.target.value;
    setCampaignName(newName);
    campaignState.updateData('schedule', {
      ...savedSchedule,
      campaignName: newName
    });
    // Dispatch custom event for layout update
    window.dispatchEvent(new Event('campaignStateUpdate'));
  };

  return (
    <div className="space-y-6 mt-8">
      <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Campaign name</h2>
        <input 
          value={campaignName}
          onChange={handleCampaignNameChange}
          className="w-full bg-[#050607] border border-gray-800 rounded-lg p-2 text-gray-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Start and end</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">Start date</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#050607] border border-gray-800 rounded-lg p-2 text-gray-400" 
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">End date</label>
              <input 
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-[#050607] border border-gray-800 rounded-lg p-2 text-gray-400" 
              />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-3xl font-medium text-purple-600">{calculateDuration()} days</h3>
            <p className="text-gray-400">Duration</p>
          </div>
        </div>

        <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Business hours</h2>
            <span className="text-gray-400">ⓘ</span>
          </div>

          <select 
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full bg-[#050607] border border-gray-800 rounded-lg p-2 text-gray-400 mb-4"
          >
            <option>GMT-08:00 - Pacific Time (US & Canada)</option>
            <option>GMT-05:00 - Eastern Time (US & Canada)</option>
            <option>GMT+00:00 - London</option>
            <option>GMT+01:00 - Paris</option>
            <option>GMT+02:00 - Helsinki</option>
          </select>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <input 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-[#050607] border border-gray-800 rounded-lg p-2 text-gray-400"
              />
            </div>
            <div className="flex-1">
              <input 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-[#050607] border border-gray-800 rounded-lg p-2 text-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <label 
                key={day} 
                className="flex items-center gap-2 bg-[#050607] border border-gray-800 px-3 py-2 rounded-lg cursor-pointer"
              >
                <input 
                  type="checkbox" 
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDayToggle(day)}
                  className="form-checkbox"
                />
                <span className="text-gray-400">{day}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSaveAndContinue}
          className="bg-blue-500/30 text-blue-400 py-2 px-6 rounded-lg hover:bg-blue-500/40"
        >
          Continue to Overview
        </button>
      </div>
    </div>
  );
};

export default SchedulePage; 