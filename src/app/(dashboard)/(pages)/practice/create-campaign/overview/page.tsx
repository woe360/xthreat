'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CampaignState from '@/lib/state/campaignState';
import { Users, Mail, Calendar, CheckCircle } from 'lucide-react';

const OverviewPage = () => {
  const router = useRouter();
  const campaignState = CampaignState.getInstance();
  const [campaignData, setCampaignData] = useState({
    recipients: [],
    template: null,
    schedule: null
  });

  useEffect(() => {
    const recipients = campaignState.getData('recipients') || [];
    const template = campaignState.getData('template') || null;
    const schedule = campaignState.getData('schedule') || null;

    setCampaignData({
      recipients,
      template,
      schedule
    });
  }, []);

  const handleLaunchCampaign = () => {
    // Get existing campaigns or initialize empty array
    const existingCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    
    // Create new campaign object
    const newCampaign = {
      id: Date.now(), // Use timestamp as unique ID
      name: campaignData.schedule?.campaignName || 'Campaign 1',
      status: 'active',
      recipients: campaignData.recipients.length,
      startDate: campaignData.schedule?.startDate,
      endDate: campaignData.schedule?.endDate,
      progress: 0,
      ...campaignData // Save all campaign data
    };

    // Add new campaign to the list
    existingCampaigns.push(newCampaign);
    
    // Save updated campaigns list
    localStorage.setItem('campaigns', JSON.stringify(existingCampaigns));
    
    // Clear campaign creation state
    campaignState.clearData();
    
    // Redirect to practice page
    router.push('/practice');
  };

  return (
    <div className="space-y-6 mt-8">
      <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-medium text-white mb-2">
          {campaignData.schedule?.campaignName || 'Campaign Overview'}
        </h1>
        <p className="text-gray-400">Review your campaign details before launch</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recipients Section */}
        <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-blue-400" size={24} />
            <h2 className="text-lg font-medium">Recipients</h2>
          </div>
          <div className="space-y-3">
            <p className="text-gray-400">Total recipients: {campaignData.recipients.length}</p>
            <div className="max-h-40 overflow-y-auto">
              {Array.isArray(campaignData.recipients) && campaignData.recipients.map((recipient, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                  <div>
                    <p className="text-gray-300">
                      {typeof recipient === 'object' ? 
                        `${recipient.firstName} ${recipient.lastName}` : 
                        recipient}
                    </p>
                    {typeof recipient === 'object' && recipient.role && (
                      <p className="text-sm text-gray-400">{recipient.role}</p>
                    )}
                  </div>
                  {typeof recipient === 'object' && recipient.email && (
                    <span className="text-gray-400">{recipient.email}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Template Section */}
        <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="text-blue-400" size={24} />
            <h2 className="text-lg font-medium">Email Template</h2>
          </div>
          <div className="space-y-3">
            {campaignData.template && (
              <>
                <div className="bg-[#050607] rounded-lg p-4">
                  <p className="text-sm text-gray-400">From:</p>
                  <p className="text-gray-300">{campaignData.template.from}</p>
                </div>
                <div className="bg-[#050607] rounded-lg p-4">
                  <p className="text-sm text-gray-400">Subject:</p>
                  <p className="text-gray-300">{campaignData.template.subject}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="text-blue-400" size={24} />
          <h2 className="text-lg font-medium">Schedule Details</h2>
        </div>
        {campaignData.schedule && (
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-gray-400">Campaign Duration</p>
              <p className="text-gray-300">
                {new Date(campaignData.schedule.startDate).toLocaleDateString()} - {new Date(campaignData.schedule.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">Business Hours</p>
              <p className="text-gray-300">
                {campaignData.schedule.startTime} - {campaignData.schedule.endTime}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">Selected Days</p>
              <div className="flex flex-wrap gap-2">
                {campaignData.schedule.selectedDays.map((day) => (
                  <span key={day} className="px-2 py-1 bg-blue-500/10 rounded text-blue-400">
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Launch Section */}
      <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-400" size={24} />
            <div>
              <h2 className="text-lg font-medium">Ready to Launch</h2>
              <p className="text-gray-400">Your campaign is ready to be launched</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-800 rounded-lg text-gray-400 hover:border-gray-700"
            >
              Draft
            </button>
            <button
              onClick={handleLaunchCampaign}
              className="px-6 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30"
            >
              Launch Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage; 