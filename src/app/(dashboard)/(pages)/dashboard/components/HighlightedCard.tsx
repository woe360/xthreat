// 'use client'
// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
// import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';

// export default function HighlightedCard() {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Card sx={{ height: '100%' }}>
//       <CardContent>
//         <InsightsRoundedIcon />
//         <Typography
//           component="h2"
//           variant="subtitle2"
//           gutterBottom
//           sx={{ fontWeight: '600' }}
//         >
//           Explore your data
//         </Typography>
//         <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
//           Uncover performance and visitor insights with our data wizardry.
//         </Typography>
//         <Button
//           variant="contained"
//           size="small"
//           color="primary"
//           endIcon={<ChevronRightRoundedIcon />}
//           fullWidth={isSmallScreen}
//         >
//           Get insights
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }



// 'use client'
// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
// import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';

// export default function HighlightedCard() {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Card 
//       sx={{ 
//         height: '100%',
//         position: 'relative',
//         border: '1px solid',
//         borderColor: '#121212',
//         '&::before': {
//           content: '""',
//           position: 'absolute',
//           top: '10px',
//           right: '10px',
//           bottom: '10px',
//           left: '10px',
//           border: '1px dashed',
//           borderColor: 'primary.main',
//           opacity: 0.5,
//           pointerEvents: 'none'
//         }
//       }}
//     >
//       <CardContent>
//         <Box sx={{ 
//           display: 'flex',
//           alignItems: 'center',
//           gap: 1,
//           mb: 1,
//         }}>
//           <SchoolRoundedIcon 
//             sx={{ 
//               color: 'primary.main',
//               fontSize: '2rem' 
//             }}
//           />
//           <Box sx={{ 
//             height: '24px',
//             px: 1,
//             bgcolor: 'primary.main',
//             color: 'white',
//             borderRadius: '12px',
//             display: 'flex',
//             alignItems: 'center',
//             fontSize: '0.75rem',
//             fontWeight: 'medium'
//           }}>
//             5 min
//           </Box>
//         </Box>
//         <Typography
//           component="h2"
//           variant="subtitle2"
//           gutterBottom
//           sx={{ fontWeight: '600' }}
//         >
//           Today's Micro Lesson
//         </Typography>
//         <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
//           Quick security tip: Learn to spot suspicious emails in just 5 minutes.
//         </Typography>
//         <Button
//           variant="contained"
//           size="small"
//           color="primary"
//           endIcon={<ChevronRightRoundedIcon />}
//           fullWidth={isSmallScreen}
//           sx={{
//             boxShadow: 'none',
//             '&:hover': {
//               boxShadow: 'none'
//             }
//           }}
//         >
//           Start Lesson
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

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
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        color: 'white',
      }}
    >
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
        </Box>
        <Typography
          component="h2"
          variant="h6"
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
          flexGrow: 1
        }}>
          Quick security tip: Learn to spot suspicious emails in just 5 minutes.
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={handleStartLesson}
          sx={{
            bgcolor: 'rgba(59, 130, 246, 0.3)', // equivalent to bg-blue-500/30
            color: '#60A5FA', // equivalent to text-blue-400
            textTransform: 'none',
            borderRadius: '4px',
            '&:hover': {
              bgcolor: 'rgba(59, 130, 246, 0.5)', // equivalent to bg-blue-500/50
              color: '#BFDBFE', // equivalent to text-blue-200
            },
            alignSelf: 'flex-start'
          }}
          endIcon={<ChevronRightRoundedIcon />}
          fullWidth={isSmallScreen}
        >
          Start Lesson
        </Button>
      </CardContent>
    </Card>
  );
}