// import React from 'react';

// const leaderboardData = [
//   {
//     name: 'Jane Doe',
//     department: 'Engineering',
//     level: 10,
//     points: 9500,
//     streak: 15,
//     lastActivity: 'Aug 20, 2024',
//     orgRank: '1/200',
//     caq: 95,
//     completedQuiz: 30,
//     teamRank: '1/10',
//   },
//   {
//     name: 'John Smith',
//     department: 'Marketing',
//     level: 9,
//     points: 8750,
//     streak: 10,
//     lastActivity: 'Aug 19, 2024',
//     orgRank: '2/200',
//     caq: 92,
//     completedQuiz: 28,
//     teamRank: '2/10',
//   },
//   {
//     name: 'Emily Johnson',
//     department: 'Sales',
//     level: 8,
//     points: 8300,
//     streak: 12,
//     lastActivity: 'Aug 21, 2024',
//     orgRank: '3/200',
//     caq: 90,
//     completedQuiz: 25,
//     teamRank: '3/10',
//   },
//   {
//     name: 'Michael Brown',
//     department: 'Product',
//     level: 7,
//     points: 7800,
//     streak: 9,
//     lastActivity: 'Aug 22, 2024',
//     orgRank: '4/200',
//     caq: 88,
//     completedQuiz: 22,
//     teamRank: '4/10',
//   },
// ];

// const Leaderboard = () => {
//   return (
//     <div className="rounded-lg">
//       <div className="flex justify-between items-center mb-4">
//         {/* Optional header content here */}
//       </div>

//       <div className="overflow-hidden overflow-y-scroll">
//         <div className="flex flex-col">
//           {/* Header row */}
//           <div className="flex justify-between py-2 px-4 border-b border-gray-700">
//           <div className="text-gray-500 text-center flex-1">Name</div>
//             <div className="text-gray-500 text-center flex-1">Rank</div>
//             <div className="text-gray-500 text-center flex-1">Team Rank</div>
            
//             <div className="text-gray-500 text-center flex-1">Points</div>
//             <div className="text-gray-500 text-center flex-1">Level</div>
//             <div className="text-gray-500 text-center flex-1">Completed Quiz</div>
//             <div className="text-gray-500 text-center flex-1">Streak</div>
            
//             <div className="text-gray-500 text-center flex-1">Department</div>
//           </div>

//           {/* Data rows */}
//           {leaderboardData.map((user, index) => (
//             <div key={index} className="flex justify-between py-2 px-4 border-b border-gray-700">
//               <div className="text-white text-center flex-1 cursor-pointer hover:text-gray-400">{user.name}</div>
//               <div className="text-white text-center flex-1">{index + 1}</div>
//               <div className="text-white text-center flex-1">{user.teamRank}</div>
              
//               <div className="text-white text-center flex-1">{user.points}</div>
//               <div className="text-white text-center flex-1">{user.level}</div>
//               <div className="text-white text-center flex-1">{user.completedQuiz}</div>
//               <div className="text-white text-center flex-1">{user.streak} days</div>
              
//               <div className="text-white text-center flex-1">{user.department}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;

'use client'
import React from 'react';

interface LeaderboardUser {
  name: string;
  department: string;
  level: number;
  points: number;
  streak: number;
  lastActivity: string;
  orgRank: string;
  caq: number;
  completedQuiz: number;
  teamRank: string;
}

interface ColumnDefinition {
  key: keyof LeaderboardUser | 'rank';
  label: string;
}

const columns: ColumnDefinition[] = [
  { key: 'name', label: 'Name' },
  { key: 'rank', label: 'Rank' },
  { key: 'teamRank', label: 'Team Rank' },
  { key: 'points', label: 'Points' },
  { key: 'level', label: 'Level' },
  { key: 'completedQuiz', label: 'Completed Quiz' },
  { key: 'streak', label: 'Streak' },
  { key: 'department', label: 'Department' },
];

const leaderboardData: LeaderboardUser[] = [
  {
    name: 'Jane Doe',
    department: 'Engineering',
    level: 10,
    points: 9500,
    streak: 15,
    lastActivity: 'Aug 20, 2024',
    orgRank: '1/200',
    caq: 95,
    completedQuiz: 30,
    teamRank: '1/10',
  },
  {
    name: 'John Smith',
    department: 'Marketing',
    level: 9,
    points: 8750,
    streak: 10,
    lastActivity: 'Aug 19, 2024',
    orgRank: '2/200',
    caq: 92,
    completedQuiz: 28,
    teamRank: '2/10',
  },
  {
    name: 'Emily Johnson',
    department: 'Sales',
    level: 8,
    points: 8300,
    streak: 12,
    lastActivity: 'Aug 21, 2024',
    orgRank: '3/200',
    caq: 90,
    completedQuiz: 25,
    teamRank: '3/10',
  },
  {
    name: 'Michael Brown',
    department: 'Product',
    level: 7,
    points: 7800,
    streak: 9,
    lastActivity: 'Aug 22, 2024',
    orgRank: '4/200',
    caq: 88,
    completedQuiz: 22,
    teamRank: '4/10',
  },
];

const Leaderboard: React.FC = () => {
  const handleUserClick = (user: LeaderboardUser): void => {
    console.log('User clicked:', user.name);
    // Add your click handler logic here
  };

  return (
    <div className="rounded-lg">
      <div className="flex justify-between items-center mb-4">
        {/* Optional header content here */}
      </div>

      <div className="overflow-hidden overflow-y-scroll">
        <div className="flex flex-col">
          {/* Header row */}
          <div className="flex justify-between py-2 px-4 border-b border-gray-700">
            {columns.map((column) => (
              <div key={column.key} className="text-gray-500 text-center flex-1">
                {column.label}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {leaderboardData.map((user, index) => (
            <div key={`${user.name}-${index}`} className="flex justify-between py-2 px-4 border-b border-gray-700">
              <div 
                className="text-white text-center flex-1 cursor-pointer hover:text-gray-400"
                onClick={() => handleUserClick(user)}
              >
                {user.name}
              </div>
              <div className="text-white text-center flex-1">{index + 1}</div>
              <div className="text-white text-center flex-1">{user.teamRank}</div>
              <div className="text-white text-center flex-1">{user.points}</div>
              <div className="text-white text-center flex-1">{user.level}</div>
              <div className="text-white text-center flex-1">{user.completedQuiz}</div>
              <div className="text-white text-center flex-1">{user.streak} days</div>
              <div className="text-white text-center flex-1">{user.department}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;