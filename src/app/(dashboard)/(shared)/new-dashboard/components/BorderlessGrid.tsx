'use client'
import * as React from 'react';
import StatCard, { StatCardProps } from '../../dashboard/components/StatCard';
import HighlightedCard from '../../dashboard/components/HighlightedCard';
import SessionsChart from '../../dashboard/components/SessionsChart';
import PageViewsBarChart from '../../dashboard/components/PageViewsBarChart';
import CustomizedDataGrid from '../../dashboard/components/CustomizedDataGrid';

// Mock data - adjust as needed
const statCardData: StatCardProps[] = [
  {
    title: 'Awareness Score',
    value: '86%',
    interval: 'Last 30 days',
    trend: 'up',
    data: [200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920],
  },
  {
    title: 'Risk Exposure',
    value: '14%',
    interval: 'Last 30 days',
    trend: 'down',
    data: [1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220],
  },
  {
    title: 'Engagement Rate',
    value: '92%',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510],
  },
];

export default function BorderlessGrid() {
  const borderColor = 'border-neutral-700'; // Define border color class

  return (
    <div className="w-full">
      {/* Top row: 4 columns */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t ${borderColor}`}>
        {statCardData.map((card, index) => (
          <div key={index} className={`p-4 border-b border-l ${borderColor} ${index === 0 ? '' : 'sm:border-l'} ${index < 2 ? '' : 'lg:border-l'}`}>
            {/* We'll need to adjust StatCard internal styles */}
            <StatCard {...card} />
          </div>
        ))}
        <div className={`p-4 border-b border-l ${borderColor} sm:border-l lg:border-l`}>
           {/* We'll need to adjust HighlightedCard internal styles */}
          <HighlightedCard />
        </div>
      </div>

      {/* Middle row: 2 columns */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-0`}>
        <div className={`p-4 border-b border-l ${borderColor}`}>
           {/* We'll need to adjust SessionsChart internal styles */}
          <SessionsChart />
        </div>
        <div className={`p-4 border-b border-l ${borderColor}`}>
           {/* We'll need to adjust PageViewsBarChart internal styles */}
          <PageViewsBarChart />
        </div>
      </div>

      {/* Bottom row: Leaderboard */}
      <h2 className="text-xl font-semibold mb-4 mt-6">Leaderboard</h2>
      <div className={`border-t border-b border-l border-r ${borderColor}`}>
        <div className={`p-4`}>
           {/* We'll need to adjust CustomizedDataGrid internal styles */}
          <CustomizedDataGrid />
        </div>
      </div>
    </div>
  );
} 