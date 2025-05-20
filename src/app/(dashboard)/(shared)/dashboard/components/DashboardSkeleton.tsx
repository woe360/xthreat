import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton'; // Using MUI Skeleton for a more refined look
// import { SxProps, Theme } from '@mui/material/styles'; // Keep if SxProps/Theme were originally there or used by other parts not shown

const cardSkeletonStyles = {
  backgroundColor: 'rgba(255,255,255,0.04)', // Slightly lighter than card bg for skeleton shapes
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 1, // Matches MainGrid card borderRadius
  height: '100%',
  padding: 2, // Match typical CardContent padding
};

const chartCardHeight = 200; // Approximate height for chart cards
const statCardHeight = 150; // Approximate height for stat cards
const dataGridHeight = 300; // Approximate height for data grid

export default function DashboardSkeleton() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { sm: '100%', md: '1700px' }, // Reverted to original responsive maxWidth
        transition: 'max-width 0.2s ease-in-out',
        backgroundColor: '#0b0b0b',
        mx: 'auto', // Center the skeleton container
        px: 3, // Match MainGrid Stack mx:3 approx
        pb: 5,
        // pt: 2, // Removed pt: 2, reverting the change
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3,
          mt: { xs: 4, md: 3.1 },
          color: 'white'
       }}>
        <Skeleton width="200px" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
      </Typography>

      {/* Top row - 4 equal columns */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {[...Array(4)].map((_, index) => (
          <Grid item xs={12} sm={6} lg={3} key={`top-skel-${index}`}>
            <Box sx={{ ...cardSkeletonStyles, height: statCardHeight }}>
              <Skeleton variant="text" width="60%" sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.1)' }} />
              <Skeleton variant="text" width="80%" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}/>
              <Skeleton variant="rectangular" width="100%" height={50} sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.08)' }} />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Middle row - 2 equal columns */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[...Array(2)].map((_, index) => (
          <Grid item xs={12} md={6} key={`middle-skel-${index}`}>
            <Box sx={{ ...cardSkeletonStyles, height: chartCardHeight }}>
              <Skeleton variant="text" width="40%" sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.1)' }} />
              <Skeleton variant="rectangular" width="100%" sx={{ flexGrow: 1, bgcolor: 'rgba(255,255,255,0.08)' }} />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mb: 3, color: 'white' }}>
        <Skeleton width="250px" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
      </Typography>

      {/* Bottom row */}
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box sx={{ ...cardSkeletonStyles, height: dataGridHeight }}>
            <Skeleton variant="rectangular" width="100%" sx={{ flexGrow: 1, bgcolor: 'rgba(255,255,255,0.08)' }}/>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
} 