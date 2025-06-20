'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { formatDistanceToNow } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { withRoleAccess } from '@/app/(auth)/components/auth/withRoleAccess'
import { Database } from "@/lib/database.types"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Stack, Chip } from '@mui/material'
import { SparkLineChart } from '@mui/x-charts/SparkLineChart'
import { areaElementClasses } from '@mui/x-charts/LineChart'
import SessionsChart from '../../(shared)/dashboard/components/SessionsChart'
import PageViewsBarChart from '../../(shared)/dashboard/components/PageViewsBarChart'
import { StatCard } from '@/components/ui/stat-card'

interface SessionLog {
  id: string
  user_id: string
  event_type: 'login' | 'logout' | 'login_failed' | 'session_expired'
  timestamp: string
  ip_address: string | null
  user_agent: string | null
  error_message: string | null
  device_info: {
    browser?: string
    os?: string
    [key: string]: any
  } | null
  location_info: {
    country?: string
    city?: string
    [key: string]: any
  } | null
  session_id: string | null
  session_duration: number | null
  last_active_at: string | null
  session_status: 'active' | 'expired' | 'terminated' | null
  created_at: string
  userEmail?: string
}

interface User {
  id: string
  email: string
}

interface StatCardProps {
  title: string;
  value: string;
  interval: string;
  trend: 'up' | 'neutral' | 'down';
  data: number[];
}

const sessionStats: StatCardProps[] = [
  {
    title: 'Active Sessions',
    value: '1.2K',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 240, 220, 260, 240, 280, 300, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 440, 420, 460, 440, 480, 460, 500, 480, 520,
    ],
  },
  {
    title: 'Average Duration',
    value: '15m',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      15, 14, 15, 13, 15, 14, 16, 15, 14, 15, 16, 14, 15, 16, 15, 14,
      15, 16, 15, 14, 15, 14, 15, 16, 15, 14, 15, 16, 15, 14,
    ],
  },
  {
    title: 'Success Rate',
    value: '94%',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      90, 91, 92, 93, 92, 94, 93, 95, 94, 93, 95, 94, 93, 94, 95, 94,
      93, 95, 94, 93, 94, 95, 94, 93, 95, 94, 93, 94, 95, 94,
    ],
  },
  {
    title: 'Suspicious Activity',
    value: '2.1%',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      5, 4.8, 4.5, 4.2, 4.0, 3.8, 3.5, 3.2, 3.0, 2.8, 2.5, 2.3, 2.1, 2.0, 1.9, 1.8,
      2.0, 1.9, 1.8, 2.0, 1.9, 2.1, 2.0, 1.9, 2.0, 2.1, 2.0, 1.9, 2.0, 2.1,
    ],
  },
];

const SessionLogsPage = () => {
  const [sessions, setSessions] = useState<SessionLog[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all")
  const [userFilter, setUserFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [analytics, setAnalytics] = useState<{
    totalSessions: number;
    averageDuration: number;
    loginsByDay: Array<{ date: string; count: number }>;
    deviceStats: Array<{ name: string; value: number }>;
    suspiciousActivities: SessionLog[];
  }>({
    totalSessions: 0,
    averageDuration: 0,
    loginsByDay: [],
    deviceStats: [],
    suspiciousActivities: []
  })
  
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    fetchSessions()
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email')
        
      if (error) {
        console.error("Error fetching users:", error)
        return
      }

      setUsers(data || [])
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const fetchSessions = async () => {
    try {
      setLoading(true)
      console.log('Fetching sessions...')
      
      // First check if we have access to the table
      const { data: tableCheck, error: tableError } = await supabase
        .from('user_sessions')
        .select('count')
        .limit(1)

      if (tableError) {
        console.error('Error checking table access:', tableError)
        throw new Error(`Table access error: ${tableError.message}`)
      }

      // Fetch all users first
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email')

      if (userError) {
        console.error('Error fetching users:', userError)
        throw new Error(`Failed to fetch users: ${userError.message}`)
      }

      const userMap = new Map(userData?.map(user => [user.id, user.email]) || [])

      // Fetch sessions
      const { data, error } = await supabase
        .from('user_sessions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching sessions data:', error)
        throw new Error(`Failed to fetch sessions: ${error.message}`)
      }

      if (!data) {
        console.log('No sessions found')
        setSessions([])
        return
      }

      // Transform the data to match our interface
      const transformedData = data.map(session => ({
        ...session,
        userEmail: userMap.get(session.user_id) || 'Unknown',
        device_info: session.device_info ? {
          ...session.device_info,
          browser: session.device_info.browser || 'Unknown',
          os: session.device_info.os || 'Unknown'
        } : null
      }))

      console.log('Sessions fetched:', transformedData.length)
      setSessions(transformedData)
      calculateAnalytics(transformedData)
    } catch (error) {
      console.error('Error in fetchSessions:', error)
      setSessions([])
    } finally {
      setLoading(false)
    }
  }

  const calculateAnalytics = (sessionData: SessionLog[]) => {
    // Calculate total sessions
    const totalSessions = sessionData.length

    // Calculate average duration
    const validDurations = sessionData.filter(s => s.session_duration != null)
    const averageDuration = validDurations.length > 0
      ? validDurations.reduce((acc, curr) => acc + (curr.session_duration || 0), 0) / validDurations.length
      : 0

    // Calculate logins by day
    const loginsByDay = sessionData
      .filter(s => s.event_type === 'login')
      .reduce((acc: any[], session) => {
        const date = format(new Date(session.timestamp), 'yyyy-MM-dd')
        const existing = acc.find(item => item.date === date)
        if (existing) {
          existing.count++
        } else {
          acc.push({ date, count: 1 })
        }
        return acc
      }, [])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Calculate device stats
    const deviceStats = sessionData.reduce((acc: any[], session) => {
      if (session.device_info?.browser) {
        const browser = session.device_info.browser
        const existing = acc.find(item => item.name === browser)
        if (existing) {
          existing.value++
        } else {
          acc.push({ name: browser, value: 1 })
        }
      }
      return acc
    }, [])

    // Detect suspicious activities
    const suspiciousActivities = sessionData
      .filter(session => {
        // Example criteria - multiple logins in short time
        const timestamp = new Date(session.timestamp).getTime()
        const multipleLogins = sessionData.filter(s => 
          s.user_id === session.user_id &&
          Math.abs(new Date(s.timestamp).getTime() - timestamp) < 300000 // 5 minutes
        ).length > 3

        return multipleLogins
      })

    setAnalytics({
      totalSessions,
      averageDuration,
      loginsByDay,
      deviceStats,
      suspiciousActivities
    })
  }

  const filteredSessions = sessions.filter((session) => {
    const matchesEventType = eventTypeFilter === "all" || session.event_type === eventTypeFilter
    const matchesUser = userFilter === "all" || session.user_id === userFilter
    const matchesSearch = searchTerm === "" ||
      session.ip_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.user_agent?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.session_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.error_message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (session.location_info?.city && session.location_info.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (session.location_info?.country && session.location_info.country.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDateRange = (!startDate || new Date(session.timestamp) >= startDate) &&
      (!endDate || new Date(session.timestamp) <= endDate)

    return matchesEventType && matchesUser && matchesSearch && matchesDateRange
  })

  const formatDuration = (duration: number | null) => {
    if (!duration) return "N/A"
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${minutes}m ${seconds}s`
  }

  // function SessionsOverTime({ sessions }: { sessions: SessionLog[] }) {
  //   const last30Days = [...Array(30)].map((_, i) => {
  //     const date = new Date();
  //     date.setDate(date.getDate() - (29 - i));
  //     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  //   });

  //   const sessionsByDay = last30Days.map(day => ({
  //     day,
  //     active: sessions.filter(s => 
  //       new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === day &&
  //       s.session_status === 'active'
  //     ).length,
  //     terminated: sessions.filter(s => 
  //       new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === day &&
  //       s.session_status === 'terminated'
  //     ).length,
  //     total: sessions.filter(s => 
  //       new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === day
  //     ).length,
  //   }));

  //   return (
  //     <Card className="p-6">
  //       <div className="space-y-4">
  //         <h3 className="text-lg font-semibold">Sessions Over Time</h3>
  //         <div className="flex items-center justify-between">
  //           <div className="flex items-center gap-2">
  //             <span className="text-2xl font-bold">{sessions.length}</span>
  //             <span className="text-xs font-medium text-green-500 bg-green-500/20 px-2 py-1 rounded-full">+12%</span>
  //           </div>
  //           <span className="text-sm text-muted-foreground">Total sessions in the last 30 days</span>
  //         </div>
  //         <ResponsiveContainer width="100%" height={250}>
  //           <AreaChart data={sessionsByDay}>
  //             <defs>
  //               <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
  //                 <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
  //                 <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
  //               </linearGradient>
  //               <linearGradient id="colorTerminated" x1="0" y1="0" x2="0" y2="1">
  //                 <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
  //                 <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
  //               </linearGradient>
  //             </defs>
  //             <XAxis 
  //               dataKey="day" 
  //               interval={4}
  //               tick={{ fontSize: 12 }}
  //             />
  //             <YAxis 
  //               tick={{ fontSize: 12 }}
  //             />
  //             <Tooltip />
  //             <Area 
  //               type="monotone" 
  //               dataKey="active" 
  //               stackId="1"
  //               stroke="#2563eb" 
  //               fillOpacity={1}
  //               fill="url(#colorActive)"
  //             />
  //             <Area 
  //               type="monotone" 
  //               dataKey="terminated" 
  //               stackId="1"
  //               stroke="#ef4444" 
  //               fillOpacity={1}
  //               fill="url(#colorTerminated)"
  //             />
  //           </AreaChart>
  //         </ResponsiveContainer>
  //       </div>
  //     </Card>
  //   );
  // }

  // function SessionsByDevice({ sessions }: { sessions: SessionLog[] }) {
  //   const deviceCounts = sessions.reduce((acc, session) => {
  //     const browser = session.device_info?.browser || 'Unknown';
  //     acc[browser] = (acc[browser] || 0) + 1;
  //     return acc;
  //   }, {} as Record<string, number>);

  //   const data = Object.entries(deviceCounts)
  //     .sort((a, b) => b[1] - a[1])
  //     .slice(0, 5)
  //     .map(([name, value]) => ({ name, value }));

  //   return (
  //     <Card className="p-6">
  //       <div className="space-y-4">
  //         <h3 className="text-lg font-semibold">Sessions by Browser</h3>
  //         <ResponsiveContainer width="100%" height={250}>
  //           <BarChart data={data}>
  //             <defs>
  //               <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
  //                 <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
  //                 <stop offset="95%" stopColor="#2563eb" stopOpacity={0.4}/>
  //               </linearGradient>
  //             </defs>
  //             <XAxis 
  //               dataKey="name"
  //               tick={{ fontSize: 12 }}
  //             />
  //             <YAxis 
  //               tick={{ fontSize: 12 }}
  //             />
  //             <Tooltip />
  //             <Bar 
  //               dataKey="value" 
  //               fill="url(#colorBar)"
  //               radius={[4, 4, 0, 0]}
  //             />
  //           </BarChart>
  //         </ResponsiveContainer>
  //       </div>
  //     </Card>
  //   );
  // }

  return (
    <div className="h-screen overflow-hidden bg-[#050607]">
      <div className="h-full overflow-y-auto">
        <div className="w-full max-w-full px-10 py-4">
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 3,
              mt: 0.1
           }}>
            Session Logs
          </Typography>

          {/* Top row - Real session analytics */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} lg={3}>
              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-lg p-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Total Sessions</p>
                  <p className="text-2xl font-bold text-white">{analytics.totalSessions}</p>
                  <p className="text-xs text-neutral-500">All time</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-lg p-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Avg Duration</p>
                  <p className="text-2xl font-bold text-white">{formatDuration(Math.round(analytics.averageDuration))}</p>
                  <p className="text-xs text-neutral-500">Average session length</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-lg p-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Failed Logins</p>
                  <p className="text-2xl font-bold text-white">{sessions.filter(s => s.event_type === 'login_failed').length}</p>
                  <p className="text-xs text-neutral-500">Security events</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-lg p-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Active Sessions</p>
                  <p className="text-2xl font-bold text-white">{sessions.filter(s => s.session_status === 'active').length}</p>
                  <p className="text-xs text-neutral-500">Currently active</p>
                </div>
              </div>
            </Grid>
          </Grid>

          {/* Middle row - 2 equal columns */}
          {/* <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <SessionsChart />
            </Grid>
            <Grid item xs={12} md={6}>
              <PageViewsBarChart />
            </Grid>
          </Grid> */}

          {/* Session logs table */}
          <div className="rounded-md">
            <div className="mb-8">
              <div className="grid grid-cols-6 gap-4">
                <div>
                  <Select
                    value={userFilter}
                    onValueChange={(value) => setUserFilter(value)}
                  >
                    <SelectTrigger className="bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800">
                      <SelectValue placeholder="Filter by user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      {users.map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select
                    value={eventTypeFilter}
                    onValueChange={(value) => setEventTypeFilter(value)}
                  >
                    <SelectTrigger className="bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800">
                      <SelectValue placeholder="Filter by event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="logout">Logout</SelectItem>
                      <SelectItem value="login_failed">Login Failed</SelectItem>
                      <SelectItem value="session_expired">Session Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Start date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>End date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Input
                    placeholder="Search sessions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-[#181b24] hover:bg-[#232734] transition-colors border-gray-800"
                  />
                </div>
                
                <div>
                  <Button 
                    onClick={fetchSessions}
                    className="w-full bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-200"
                  >
                    Refresh
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-md border bg-[#181b24] border-gray-800">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-500/10 transition-colors">
                    <TableHead>Event Type</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Device Info</TableHead>
                    <TableHead>Session ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center">
                        Loading sessions...
                      </TableCell>
                    </TableRow>
                  ) : filteredSessions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center">
                        No sessions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSessions.map((session) => (
                      <TableRow 
                        key={session.id} 
                        className={cn(
                          "hover:bg-gray-500/10 transition-colors",
                          analytics.suspiciousActivities.some(s => s.id === session.id) && "bg-red-500/10"
                        )}
                      >
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-md text-xs capitalize ${
                              session.event_type === "login"
                                ? "bg-green-500/20 text-green-400"
                                : session.event_type === "logout"
                                ? "bg-blue-500/20 text-blue-400"
                                : session.event_type === "login_failed"
                                ? "bg-red-500/20 text-red-400"
                                : session.event_type === "session_expired"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {session.event_type.replace('_', ' ')}
                          </span>
                        </TableCell>
                        <TableCell>{session.userEmail}</TableCell>
                        <TableCell>
                          {formatDistanceToNow(new Date(session.timestamp), {
                            addSuffix: true,
                          })}
                        </TableCell>
                        <TableCell>{session.ip_address || "N/A"}</TableCell>
                        <TableCell>
                          {session.location_info ? (
                            <span title={JSON.stringify(session.location_info, null, 2)}>
                              {session.location_info.city && session.location_info.country 
                                ? `${session.location_info.city}, ${session.location_info.country}`
                                : session.location_info.country || session.location_info.city || "Unknown"
                              }
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        <TableCell>
                          {session.device_info ? (
                            <span title={JSON.stringify(session.device_info, null, 2)}>
                              {session.device_info.browser || "Unknown"} on{" "}
                              {session.device_info.os || "Unknown"}
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="font-mono text-sm">
                            {session.session_id || "N/A"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-md text-xs ${
                              session.session_status === "active"
                                ? "bg-green-500/20 text-green-400"
                                : session.session_status === "expired"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : session.session_status === "terminated"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {session.session_status || "N/A"}
                          </span>
                        </TableCell>
                        <TableCell>{formatDuration(session.session_duration)}</TableCell>
                        <TableCell>
                          {session.error_message ? (
                            <span 
                              className="text-red-400 text-sm cursor-help truncate max-w-[200px] block"
                              title={session.error_message}
                            >
                              {session.error_message}
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Only allow admin access to this page
export default withRoleAccess(SessionLogsPage, { requiredRole: 'admin' }) 