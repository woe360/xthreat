'use client'
import * as React from 'react';

// Placeholder component for individual dashboard items
const DashboardItem: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
  <div className="p-4">
    <h3 className="text-sm font-medium text-neutral-400 mb-2">{title}</h3>
    <div className="text-neutral-100">
      {children || <div className="h-20 bg-neutral-800/50 rounded flex items-center justify-center text-xs text-neutral-500">Chart Placeholder</div>}
    </div>
  </div>
);

export default function NewDashboardPage() {
  return (
    <div className="w-full">
      {/* Removed Dashboard Title */}

      {/* Top row: 4 columns - Removed border-t */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0`}>
        {/* Map through items, removed borders */}
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            // Removed border-b and conditional border-l
            className={`p-4`}
          >
            {/* Render corresponding content based on index */}
            {index === 0 && (
              <DashboardItem title="Awareness Score">
                <p className="text-3xl font-semibold mb-1">86% <span className="text-sm text-green-500">(+25%)</span></p>
                <p className="text-xs text-neutral-500 mb-3">Last 30 days</p>
                <div className="h-10 bg-neutral-800/50 rounded flex items-center justify-center text-xs text-neutral-500">Score Trend Placeholder</div>
              </DashboardItem>
            )}
             {index === 1 && (
              <DashboardItem title="Risk Exposure">
                <p className="text-3xl font-semibold mb-1">14% <span className="text-sm text-red-500">(-25%)</span></p>
                <p className="text-xs text-neutral-500 mb-3">Last 30 days</p>
                <div className="h-10 bg-neutral-800/50 rounded flex items-center justify-center text-xs text-neutral-500">Risk Trend Placeholder</div>
              </DashboardItem>
            )}
             {index === 2 && (
              <DashboardItem title="Engagement Rate">
                <p className="text-3xl font-semibold mb-1">92% <span className="text-sm text-gray-400">(+5%)</span></p>
                <p className="text-xs text-neutral-500 mb-3">Last 30 days</p>
                <div className="h-10 bg-neutral-800/50 rounded flex items-center justify-center text-xs text-neutral-500">Engagement Trend Placeholder</div>
              </DashboardItem>
            )}
            {index === 3 && (
              <DashboardItem title="Today's Micro Lesson">
                <p className="text-sm text-neutral-300 mb-4">Quick security tip: Learn to spot suspicious emails in just 5 minutes.</p>
                <button className="text-sm bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 hover:text-blue-100 px-3 py-1 rounded transition-colors">Start Lesson &gt;</button>
              </DashboardItem>
            )}
          </div>
        ))}
      </div>

      {/* Middle row: 2 columns - Removed borders */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-0`}>
        {/* Activity - Removed borders */}
        <div className={``}>
          <DashboardItem title="Activity">
             {/* Placeholder for Activity Chart */}
          </DashboardItem>
        </div>
        {/* Lesson Completion - Removed borders */}
        <div className={``}>
          <DashboardItem title="Lesson Completion">
            {/* Placeholder for Lesson Completion Chart */}
          </DashboardItem>
        </div>
      </div>

      {/* Bottom row: Leaderboard - Removed borders */}
      <h2 className="text-sm font-light mb-4 mt-6">Leaderboard</h2>
      <div className={``}>
        <div className={`p-4`}>
          <div className="h-60 bg-neutral-800/50 rounded flex items-center justify-center text-xs text-neutral-500">Leaderboard Placeholder</div>
        </div>
      </div>
    </div>
  );
} 