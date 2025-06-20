import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronsUp, ChevronsDown } from 'lucide-react'; // Import Lucide icons
import { getTabSpecificSupabaseClient } from '@/lib/supabase/client';

interface LeaderboardItem {
  id: string;
  rank: number;
  name: string;
  email: string;
  role: string;
  department: string;
  points: number;
  streak: string; // e.g., "60 days"
  level: string;
}

type SortKey = 'rank' | 'name' | 'role' | 'points' | 'streak';
type SortDirection = 'asc' | 'desc';
interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

// Function to generate mock points and level based on user data
function generateUserStats(userId: string) {
  // Simple hash-based pseudo-random number generation for consistent results
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  const points = Math.abs(hash % 900) + 100; // Points between 100-1000
  const streakDays = Math.abs(hash % 60) + 1; // Streak between 1-60 days
  
  let level = "Cyber Novice";
  if (points > 800) level = "Cyber Sentinel";
  else if (points > 600) level = "Security Expert";
  else if (points > 400) level = "Awareness Advocate";
  
  return {
    points,
    streak: `${streakDays} days`,
    level
  };
}

const DEFAULT_SORT_CONFIG: SortConfig = { key: 'rank', direction: 'asc' };

function UserTableLeaderboard() {
  const [showAll, setShowAll] = React.useState(false);
  const [sortConfig, setSortConfig] = React.useState<SortConfig>(DEFAULT_SORT_CONFIG);
  const [users, setUsers] = React.useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch users from Supabase
  React.useEffect(() => {
    async function fetchUsers() {
      try {
        const supabase = getTabSpecificSupabaseClient();
        
        // Fetch users and managers (exclude admins)
        const { data, error } = await supabase
          .from('users')
          .select('id, first_name, last_name, email, role, job_title')
          .in('role', ['user', 'manager']);

        if (error) {
          console.error('Error fetching users:', error);
          return;
        }

        if (data) {
          const leaderboardItems: LeaderboardItem[] = data.map((user, index) => {
            const stats = generateUserStats(user.id);
            const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ') || 'Unknown User';
            return {
              id: user.id,
              rank: index + 1,
              name: fullName,
              email: user.email,
              role: user.job_title || 'General',
              department: user.job_title || 'General', // Keep for interface compatibility
              ...stats
            };
          });

          // Sort by points (highest first) and assign ranks
          leaderboardItems.sort((a, b) => b.points - a.points);
          leaderboardItems.forEach((item, index) => {
            item.rank = index + 1;
          });

          setUsers(leaderboardItems);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const requestSort = (clickedKey: SortKey) => {
    if (sortConfig.key === clickedKey) {
      // Clicked on the currently sorted column
      if (sortConfig.direction === 'asc') {
        // Asc -> Desc
        setSortConfig({ key: clickedKey, direction: 'desc' });
      } else {
        // Desc -> Clear sort (revert to default)
        setSortConfig(DEFAULT_SORT_CONFIG);
      }
    } else {
      // Clicked on a new column, sort ascending
      setSortConfig({ key: clickedKey, direction: 'asc' });
    }
  };

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...users];
    if (sortConfig) {
      sortableItems.sort((a, b) => {
        const key = sortConfig.key;
        let comparison = 0;
        const valA = a[key];
        const valB = b[key];

        if (key === 'streak') {
          const numA = parseInt((valA as string).split(' ')[0]);
          const numB = parseInt((valB as string).split(' ')[0]);
          if (numA < numB) comparison = -1;
          if (numA > numB) comparison = 1;
        } else if (typeof valA === 'number' && typeof valB === 'number') {
          if (valA < valB) comparison = -1;
          if (valA > valB) comparison = 1;
        } else {
          const strA = String(valA).toLowerCase();
          const strB = String(valB).toLowerCase();
          if (strA < strB) comparison = -1;
          if (strA > strB) comparison = 1;
        }
        return sortConfig.direction === 'asc' ? comparison : comparison * -1;
      });
    }
    return sortableItems;
  }, [sortConfig, users]);

  const SortIndicator = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortConfig.key === columnKey) {
      return (
        <span className="ml-1">
          {sortConfig.direction === 'asc' ? <ChevronsUp size={16} /> : <ChevronsDown size={16} />}
        </span>
      );
    }
    // Reserve space with an invisible icon
    return <span className="ml-1 opacity-0"><ChevronsUp size={16} /></span>;
  };

  if (loading) {
    return (
      <div className="bg-[#121212] border border-white/10 rounded-lg p-4">
        <div className="text-center py-8 text-white/60">
          Loading users...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] border border-white/10 rounded-lg p-4">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b-white/10">
            {(['rank', 'name', 'role', 'points', 'streak'] as SortKey[]).map((key) => (
              <TableHead 
                key={key} 
                onClick={() => requestSort(key)} 
                className={`cursor-pointer ${key === 'role' || key === 'points' || key === 'streak' ? 'w-1/6' : ''}`}>
                <div className={`flex items-center ${sortConfig.key === key ? 'text-white' : ''}`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize for display */}
                  <SortIndicator columnKey={key} />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedItems.map((item, index) => {
            const isVisible = index < 5 || showAll;
            return (
              <TableRow 
                key={item.id}
                className={`transition-opacity duration-500 hover:bg-neutral-800/30 border-b-white/10 ${!isVisible ? 'opacity-0 border-b-0 hover:bg-transparent pointer-events-none' : 'opacity-100'}`}
              >
                <TableCell className={`${!isVisible ? 'p-0' : ''}`}>
                  <div className={`transition-all ease-in-out duration-500 overflow-hidden ${isVisible ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                    #{item.rank}
                  </div>
                </TableCell>
                <TableCell className={`${!isVisible ? 'p-0' : ''}`}>
                  <div className={`transition-all ease-in-out duration-500 overflow-hidden ${isVisible ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white font-medium">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className={`${!isVisible ? 'p-0' : ''}`}>
                  <div className={`transition-all ease-in-out duration-500 overflow-hidden ${isVisible ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <span className="capitalize">{item.role}</span>
                  </div>
                </TableCell>
                <TableCell className={`${!isVisible ? 'p-0' : ''}`}>
                  <div className={`transition-all ease-in-out duration-500 overflow-hidden ${isVisible ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {item.points}
                  </div>
                </TableCell>
                <TableCell className={`${!isVisible ? 'p-0' : ''}`}>
                  <div className={`transition-all ease-in-out duration-500 overflow-hidden ${isVisible ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {item.streak}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {users.length > 5 && (
        <div className="mt-4 text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 text-sm font-medium text-white bg-neutral-800 rounded-full hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-600"
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        </div>
      )}
    </div>
  );
}

export default UserTableLeaderboard; 