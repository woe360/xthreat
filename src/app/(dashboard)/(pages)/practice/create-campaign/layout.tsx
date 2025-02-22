'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import CampaignState from '@/lib/state/campaignState';

const steps = [
  { id: 'recipients', label: 'Recipients', path: '/practice/create-campaign/recipients' },
  { id: 'template', label: 'Template', path: '/practice/create-campaign/template' },
  { id: 'schedule', label: 'Schedule', path: '/practice/create-campaign/schedule' },
  { id: 'overview', label: 'Overview', path: '/practice/create-campaign/overview' }
];

const CampaignLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const campaignState = CampaignState.getInstance();
  const [pageData, setPageData] = useState({
    mounted: false,
    campaignName: 'Campaign 1',
    recipientCount: 0,
    isEditing: false
  });

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => pathname.includes(step.id));
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setPageData(prev => ({
      ...prev,
      campaignName: newName
    }));
    
    // Update campaign state
    const currentSchedule = campaignState.getData('schedule') || {};
    campaignState.updateData('schedule', {
      ...currentSchedule,
      campaignName: newName
    });
  };

  const toggleEdit = () => {
    setPageData(prev => ({
      ...prev,
      isEditing: !prev.isEditing
    }));
  };

  useEffect(() => {
    const recipients = campaignState.getData('recipients') || [];
    const schedule = campaignState.getData('schedule');

    setPageData(prev => ({
      mounted: true,
      campaignName: schedule?.campaignName || prev.campaignName,
      recipientCount: recipients.length,
      isEditing: false
    }));

    window.scrollTo(0, 0);
  }, [pathname]);

  if (!pageData.mounted) return null;

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100">
      <div className="w-full px-6 md:px-10 py-4">
        <div className="border-b border-gray-800 pb-8">
          <div className="grid grid-cols-3 items-center mb-8">
            <button 
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white justify-self-start"
            >
              ‹ {getCurrentStepIndex() === 0 ? 'Practice' : steps[getCurrentStepIndex() - 1].label}
            </button>
            <div className="flex items-center flex-col justify-self-center">
              {pageData.isEditing ? (
                <input
                  type="text"
                  value={pageData.campaignName}
                  onChange={handleNameChange}
                  onBlur={toggleEdit}
                  autoFocus
                  className="text-2xl font-medium text-white bg-transparent border-b border-gray-700 text-center focus:outline-none focus:border-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      toggleEdit();
                    }
                  }}
                />
              ) : (
                <h1 
                  className="text-2xl font-medium text-white cursor-pointer hover:text-blue-400"
                  onClick={toggleEdit}
                >
                  {pageData.campaignName}
                </h1>
              )}
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <span>{pageData.recipientCount} recipients</span>
                <span>0 days left</span>
              </div>
            </div>
            <div className="bg-[#181b24] border border-transparent hover:border-gray-800 text-gray-400 py-2 px-4 rounded-lg justify-self-end">
              Draft
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-4 w-full mb-4">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  onClick={() => router.push(step.path)}
                  className={`
                    cursor-pointer transition-colors text-center
                    ${pathname.includes(step.id) ? 'text-blue-400' : 'text-gray-400'}
                    hover:text-blue-400
                  `}
                >
                  {step.label}
                </div>
              ))}
            </div>

            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300" 
                style={{ 
                  width: `${((getCurrentStepIndex() + 1) / steps.length) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CampaignLayout; 