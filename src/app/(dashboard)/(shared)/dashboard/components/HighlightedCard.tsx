'use client'
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRight';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

export default function HighlightedCard() {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleStartLesson = () => {
    router.push('/modules');  // Navigate to modules page
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '8px',
        color: 'white',
      }}
    >
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ 
            fontWeight: '500',
            color: 'white'
          }}
        >
          Today's Micro Lesson
        </Typography>
        <Typography sx={{ 
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.875rem',
        }}>
          Quick security tip: Learn to spot suspicious emails in just 5 minutes.
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          size="small"
          onClick={handleStartLesson}
          sx={{
            bgcolor: 'rgba(59, 130, 246, 0.3)',
            color: '#60A5FA',
            textTransform: 'none',
            borderRadius: '999px',
            '&:hover': {
              bgcolor: 'rgba(59, 130, 246, 0.5)',
              color: '#BFDBFE',
            },
            alignSelf: 'flex-start'
          }}
          fullWidth={isSmallScreen}
        >
          Start Lesson
        </Button>
      </CardContent>
    </Card>
  );
}