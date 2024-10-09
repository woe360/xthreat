import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
// };

// const componentStyle = {
//   background: 'rgba(17, 24, 39, 0.5)', // This is equivalent to bg-gray-900/50 (with 50% opacity)
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' // Keeping the same boxShadow from your example
// };

const AnalyticsComponent = () => {
  const [timeFrame, setTimeFrame] = useState('day');
  const [graphType, setGraphType] = useState('activity');

  const data = {
    day: [
      { name: '12a', quizzes: 0, simulations: 0, practice: 0 },
      { name: '6a', quizzes: 5, simulations: 0, practice: 10 },
      { name: '12p', quizzes: 15, simulations: 30, practice: 25 },
      { name: '6p', quizzes: 15, simulations: 20, practice: 25 },
      { name: '11p', quizzes: 5, simulations: 10, practice: 15 },
    ],
    week: [
      { name: 'Mon', quizzes: 30, simulations: 45, practice: 60 },
      { name: 'Tue', quizzes: 40, simulations: 35, practice: 55 },
      { name: 'Wed', quizzes: 35, simulations: 40, practice: 50 },
      { name: 'Thu', quizzes: 50, simulations: 30, practice: 70 },
      { name: 'Fri', quizzes: 45, simulations: 35, practice: 65 },
      { name: 'Sat', quizzes: 20, simulations: 25, practice: 40 },
      { name: 'Sun', quizzes: 15, simulations: 20, practice: 30 },
    ],
    month: [
      { name: 'Week 1', quizzes: 200, simulations: 180, practice: 250 },
      { name: 'Week 2', quizzes: 220, simulations: 200, practice: 270 },
      { name: 'Week 3', quizzes: 180, simulations: 220, practice: 240 },
      { name: 'Week 4', quizzes: 240, simulations: 190, practice: 280 },
    ],
  };

  const performanceData = {
    day: [
      { name: '12a', participation: 0, success: 0, application: 0 },
      { name: '6a', participation: 20, success: 15, application: 10 },
      { name: '12p', participation: 60, success: 55, application: 50 },
      { name: '6p', participation: 70, success: 65, application: 60 },
      { name: '11p', participation: 30, success: 25, application: 20 },
    ],
    week: [
      { name: 'Mon', participation: 70, success: 65, application: 60 },
      { name: 'Tue', participation: 75, success: 70, application: 65 },
      { name: 'Wed', participation: 80, success: 75, application: 70 },
      { name: 'Thu', participation: 85, success: 80, application: 75 },
      { name: 'Fri', participation: 90, success: 85, application: 80 },
      { name: 'Sat', participation: 60, success: 55, application: 50 },
      { name: 'Sun', participation: 50, success: 45, application: 40 },
    ],
    month: [
      { name: 'Week 1', participation: 75, success: 70, application: 65 },
      { name: 'Week 2', participation: 80, success: 75, application: 70 },
      { name: 'Week 3', participation: 85, success: 80, application: 75 },
      { name: 'Week 4', participation: 90, success: 85, application: 80 },
    ],
  };

  return (
    <div className="rounded-lg p-4 w-full bg-transparent mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-neutral-200">Analytics</h2>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded text-sm ${graphType === 'activity' ? 'bg-neutral-600 text-neutral-200' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'}`}
            onClick={() => setGraphType('activity')}
          >
            Activity
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${graphType === 'performance' ? 'bg-neutral-600 text-neutral-200' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'}`}
            onClick={() => setGraphType('performance')}
          >
            Performance
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center mb-6">
        <div className="w-full h-80"> {/* Increased height for larger graph */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data[timeFrame]}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} /> {/* Increased font size */}
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} /> {/* Increased font size */}
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#ffffff',
                  fontSize: '14px' // Increased font size
                }}
              />
              <Legend wrapperStyle={{ color: '#9ca3af', fontSize: 12 }} /> {/* Increased font size */}
              {graphType === 'activity' ? (
                <>
                  <Line type="monotone" dataKey="quizzes" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="simulations" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="practice" stroke="#f59e0b" strokeWidth={2} />
                </>
              ) : (
                <>
                  <Line type="monotone" dataKey="participation" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="success" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="application" stroke="#f59e0b" strokeWidth={2} />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex justify-center space-x-2">
        <button
          className={`px-4 py-2 rounded text-sm ${timeFrame === 'day' ? 'bg-neutral-600 text-neutral-200' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'}`}
          onClick={() => setTimeFrame('day')}
        >
          Day
        </button>
        <button
          className={`px-4 py-2 rounded text-sm ${timeFrame === 'week' ? 'bg-neutral-600 text-neutral-200' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'}`}
          onClick={() => setTimeFrame('week')}
        >
          Week
        </button>
        <button
          className={`px-4 py-2 rounded text-sm ${timeFrame === 'month' ? 'bg-neutral-600 text-neutral-200' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'}`}
          onClick={() => setTimeFrame('month')}
        >
          Month
        </button>
      </div>
    </div>
  );
};

export default AnalyticsComponent;