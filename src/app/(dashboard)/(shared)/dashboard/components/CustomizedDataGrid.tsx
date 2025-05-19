import * as React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Avatar, Box, Typography, Chip, Tab, Tabs, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

// Types for our leaderboard data
interface LeaderboardRow {
  id: number;
  rank: number;
  name: string;
  department: string;
  securityScore: number;
  accuracy: number;
  currentStreak: number;
  level: {
    title: string;
    progress: number;
  };
  completedModules: string[];
  lastActive: string;
}

// Sample data
const sampleData: LeaderboardRow[] = [
  {
    id: 1,
    rank: 1,
    name: 'Sarah Connor',
    department: 'Engineering',
    securityScore: 950,
    accuracy: 98,
    currentStreak: 45,
    level: { title: 'Security Master', progress: 85 },
    completedModules: ['Phishing Defense', 'Password Security', 'Social Engineering'],
    lastActive: '2024-03-15',
  },
  {
    id: 2,
    rank: 2,
    name: 'John Smith',
    department: 'HR',
    securityScore: 885,
    accuracy: 92,
    currentStreak: 30,
    level: { title: 'Security Expert', progress: 75 },
    completedModules: ['Data Privacy', 'Compliance Basics'],
    lastActive: '2024-03-15',
  },
  {
    id: 3,
    rank: 3,
    name: 'Maria Garcia',
    department: 'Sales',
    securityScore: 860,
    accuracy: 90,
    currentStreak: 28,
    level: { title: 'Security Expert', progress: 60 },
    completedModules: ['Email Security', 'Device Protection'],
    lastActive: '2024-03-15',
  },
  {
    id: 4,
    rank: 4,
    name: 'Maria Garcia',
    department: 'Sales',
    securityScore: 860,
    accuracy: 90,
    currentStreak: 28,
    level: { title: 'Security Expert', progress: 60 },
    completedModules: ['Email Security', 'Device Protection'],
    lastActive: '2024-03-15',
  },
  {
    id: 5,
    rank: 5,
    name: 'Maria Garcia',
    department: 'Sales',
    securityScore: 860,
    accuracy: 90,
    currentStreak: 28,
    level: { title: 'Security Expert', progress: 60 },
    completedModules: ['Email Security', 'Device Protection'],
    lastActive: '2024-03-15',
  },
  {
    id: 6,
    rank: 6,
    name: 'Maria Garcia',
    department: 'Sales',
    securityScore: 860,
    accuracy: 90,
    currentStreak: 28,
    level: { title: 'Security Expert', progress: 60 },
    completedModules: ['Email Security', 'Device Protection'],
    lastActive: '2024-03-15',
  },
];

// Styled components
const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ModuleChip = styled(Chip)(({ theme }) => ({
  margin: '2px',
  height: '24px',
  backgroundColor: theme.palette.action.selected,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Define columns
const columns: GridColDef<LeaderboardRow>[] = [
  {
    field: 'rank',
    headerName: 'Rank',
    width: 70,
    renderCell: (params: GridRenderCellParams<LeaderboardRow>) => (
      <Typography variant="body2" fontWeight="bold">
        #{params.value}
      </Typography>
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 180,
    renderCell: (params: GridRenderCellParams<LeaderboardRow>) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar sx={{ width: 32, height: 32 }}>
          {params.value.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.department}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: 'securityScore',
    headerName: 'Security Score',
    width: 120,
    renderCell: (params: GridRenderCellParams<LeaderboardRow>) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" fontWeight="bold">
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'accuracy',
    headerName: 'Accuracy',
    width: 90,
    renderCell: (params: GridRenderCellParams<LeaderboardRow>) => (
      <Typography variant="body2">
        {params.value}%
      </Typography>
    ),
  },
  {
    field: 'currentStreak',
    headerName: 'Streak',
    width: 90,
    renderCell: (params: GridRenderCellParams<LeaderboardRow>) => (
      <Typography variant="body2">
        {params.value} days
      </Typography>
    ),
  },
  {
    field: 'level',
    headerName: 'Level',
    width: 180,
    renderCell: (params: GridRenderCellParams<LeaderboardRow>) => (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2">{params.value.title}</Typography>
          <Typography variant="caption">{params.value.progress}%</Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={params.value.progress}
          sx={{ height: 4, borderRadius: 2 }}
        />
      </Box>
    ),
  },
  {
    field: 'completedModules',
    headerName: 'Completed Modules',
    flex: 1,
    minWidth: 300,
    renderCell: (params: GridRenderCellParams<LeaderboardRow>) => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {params.value.map((module: string, index: number) => (
          <ModuleChip
            key={index}
            label={module}
            size="small"
          />
        ))}
      </Box>
    ),
  },
];

export default function CustomizedDataGrid() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ 
      bgcolor: '#121212',
      p: 2,
      borderRadius: 1,
    }}>
      <StyledTabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Individual Rankings" />
        <Tab label="Department Rankings" />
        <Tab label="Most Improved" />
        <Tab label="Top Achievers" />
      </StyledTabs>

      <DataGrid
        rows={sampleData}
        columns={columns}
        autoHeight
        disableColumnMenu
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        sx={{
          border: 'none',
          bgcolor: '#121212',
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid',
            borderColor: 'divider',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '2px solid',
            borderColor: 'divider',
            bgcolor: '#1a1a1a',
          },
          '& .MuiDataGrid-row:hover': {
            bgcolor: 'action.hover',
          },
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: {
            sortModel: [{ field: 'securityScore', sort: 'desc' }],
          },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </Box>
  );
}