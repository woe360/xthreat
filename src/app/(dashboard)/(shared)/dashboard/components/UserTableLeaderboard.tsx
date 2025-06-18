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
// import { cn } from "@/lib/utils"; // cn might not be used if classNames are simple

interface LeaderboardItem {
  id: string;
  rank: number;
  name: string;
  username: string; // Kept in data for completeness, though not displayed
  image: string;
  department: string;
  points: number;
  streak: string; // e.g., "60 days"
  level: string;
}

type SortKey = 'rank' | 'name' | 'department' | 'points' | 'streak' | 'level';
type SortDirection = 'asc' | 'desc';
interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

const allItems: LeaderboardItem[] = [
  {
    id: "1",
    rank: 1,
    name: "Alex Thompson",
    username: "@alexthompson",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format",
    department: "Engineering",
    points: 980,
    streak: "60 days",
    level: "Cyber Sentinel",
  },
  {
    id: "2",
    rank: 2,
    name: "Sarah Chen",
    username: "@sarahchen",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face&auto=format",
    department: "Marketing",
    points: 920,
    streak: "30 days",
    level: "Security Expert",
  },
  {
    id: "3",
    rank: 3,
    name: "Maria Garcia",
    username: "@mariagarcia",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format",
    department: "Sales",
    points: 880,
    streak: "15 days",
    level: "Awareness Advocate",
  },
  {
    id: "4",
    rank: 4,
    name: "David Kim",
    username: "@davidkim",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format",
    department: "HR",
    points: 850,
    streak: "7 days",
    level: "Awareness Advocate",
  },
  {
    id: "5",
    rank: 5,
    name: "Emily White",
    username: "@emilywhite",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face&auto=format",
    department: "Finance",
    points: 820,
    streak: "45 days",
    level: "Security Expert",
  },
  {
    id: "6",
    rank: 6,
    name: "Michael Brown",
    username: "@michaelbrown",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face&auto=format",
    department: "Engineering",
    points: 790,
    streak: "22 days",
    level: "Awareness Advocate",
  },
  {
    id: "7",
    rank: 7,
    name: "Jessica Lee",
    username: "@jessicalee",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face&auto=format",
    department: "Operations",
    points: 760,
    streak: "10 days",
    level: "Cyber Novice",
  },
  {
    id: "8",
    rank: 8,
    name: "Kevin Green",
    username: "@kevingreen",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face&auto=format",
    department: "Marketing",
    points: 730,
    streak: "5 days",
    level: "Cyber Novice",
  },
  {
    id: "9",
    rank: 9,
    name: "Olivia Martinez",
    username: "@oliviamartinez",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face&auto=format",
    department: "HR",
    points: 700,
    streak: "2 days",
    level: "Cyber Novice",
  },
  {
    id: "10",
    rank: 10,
    name: "Daniel Rodriguez",
    username: "@danielrodriguez",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face&auto=format",
    department: "Sales",
    points: 680,
    streak: "1 day",
    level: "Cyber Novice",
  },
];

const DEFAULT_SORT_CONFIG: SortConfig = { key: 'rank', direction: 'asc' };

function UserTableLeaderboard() {
  const [showAll, setShowAll] = React.useState(false);
  const [sortConfig, setSortConfig] = React.useState<SortConfig>(DEFAULT_SORT_CONFIG);

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
    let sortableItems = [...allItems];
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
  }, [sortConfig]);

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

  return (
    <div className="bg-[#121212] border border-white/10 rounded-lg p-4">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b-white/10">
            {(['rank', 'name', 'department', 'points', 'streak', 'level'] as SortKey[]).map((key) => (
              <TableHead 
                key={key} 
                onClick={() => requestSort(key)} 
                className={`cursor-pointer ${key === 'department' || key === 'points' || key === 'streak' ? 'w-1/6' : ''}`}>
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
                      <img
                        className="rounded-full"
                        src={item.image}
                        width={40}
                        height={40}
                        alt={item.name}
                      />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        {/* Username removed from display */}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className={`${!isVisible ? 'p-0' : ''}`}>
                  <div className={`transition-all ease-in-out duration-500 overflow-hidden ${isVisible ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {item.department}
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
                <TableCell className={`${!isVisible ? 'p-0' : ''}`}>
                  <div className={`transition-all ease-in-out duration-500 overflow-hidden ${isVisible ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {item.level}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-4 text-center">
        <button 
          onClick={() => setShowAll(!showAll)}
          className="px-4 py-2 text-sm font-medium text-white bg-neutral-800 rounded-full hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-600"
        >
          {showAll ? 'Show Less' : 'View All'}
        </button>
      </div>
    </div>
  );
}

export default UserTableLeaderboard; 