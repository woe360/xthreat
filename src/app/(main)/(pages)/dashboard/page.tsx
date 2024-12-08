
// 'use client';

// import * as React from 'react';
// import type {} from '@mui/x-date-pickers/themeAugmentation';
// import type {} from '@mui/x-charts/themeAugmentation';
// import type {} from '@mui/x-data-grid/themeAugmentation';
// import type {} from '@mui/x-tree-view/themeAugmentation';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Header from './components/Header';
// import MainGrid from './components/MainGrid';
// import AppTheme from './shared-theme/AppTheme';
// import RouteGuard from '@/components/auth/RouteGuard';

// import {
//   chartsCustomizations,
//   dataGridCustomizations,
//   datePickersCustomizations,
//   treeViewCustomizations,
// } from './theme/customization';

// const xThemeComponents = {
//   ...chartsCustomizations,
//   ...dataGridCustomizations,
//   ...datePickersCustomizations,
//   ...treeViewCustomizations,
// };

// export default function Dashboard(props: { disableCustomTheme?: boolean }) {
//   return (
//     <RouteGuard>
//       <AppTheme {...props} themeComponents={xThemeComponents}>
//         <div data-mui-color-scheme="dark">
//           <CssBaseline />
//           <Box sx={{ display: 'flex' }}>
//             <Box
//               component="main"
//               sx={{
//                 flexGrow: 1,
//                 backgroundColor: 'var(--template-palette-background-default)',
//                 overflow: 'auto',
//               }}
//             >
//               <Stack
//                 spacing={2}
//                 sx={{
//                   alignItems: 'center',
//                   mx: 3,
//                   pb: 5,
//                   mt: { xs: 8, md: 0 },
//                 }}
//               >
//                 <Header />
//                 <MainGrid />
//               </Stack>
//             </Box>
//           </Box>
//         </div>
//       </AppTheme>
//     </RouteGuard>
//   );
// }



// 'use client';

// import * as React from 'react';
// import { useProtectedRoute } from '@/providers/session-provider';
// import type {} from '@mui/x-date-pickers/themeAugmentation';
// import type {} from '@mui/x-charts/themeAugmentation';
// import type {} from '@mui/x-data-grid/themeAugmentation';
// import type {} from '@mui/x-tree-view/themeAugmentation';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import CircularProgress from '@mui/material/CircularProgress';
// import Header from './components/Header';
// import MainGrid from './components/MainGrid';
// import AppTheme from './shared-theme/AppTheme';

// import {
//   chartsCustomizations,
//   dataGridCustomizations,
//   datePickersCustomizations,
//   treeViewCustomizations,
// } from './theme/customization';

// const xThemeComponents = {
//   ...chartsCustomizations,
//   ...dataGridCustomizations,
//   ...datePickersCustomizations,
//   ...treeViewCustomizations,
// };

// const LoadingScreen = () => (
//   <AppTheme themeComponents={xThemeComponents}>
//     <div data-mui-color-scheme="dark">
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: '100vh',
//           backgroundColor: 'var(--template-palette-background-default)',
//         }}
//       >
//         <Stack spacing={2} alignItems="center">
//           <CircularProgress size={40} />
//           <Box sx={{ color: 'text.secondary' }}>Loading dashboard...</Box>
//         </Stack>
//       </Box>
//     </div>
//   </AppTheme>
// );

// export default function Dashboard(props: { disableCustomTheme?: boolean }) {
//   const { isLoading, isAuthenticated } = useProtectedRoute();

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   if (!isAuthenticated) {
//     return null;
//   }

//   return (
//     <AppTheme {...props} themeComponents={xThemeComponents}>
//       <div data-mui-color-scheme="dark">
//         <CssBaseline />
//         <Box sx={{ display: 'flex' }}>
//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,
//               backgroundColor: 'var(--template-palette-background-default)',
//               overflow: 'auto',
//             }}
//           >
//             <Stack
//               spacing={2}
//               sx={{
//                 alignItems: 'center',
//                 mx: 3,
//                 pb: 5,
//                 mt: { xs: 8, md: 0 },
//               }}
//             >
//               <Header />
//               <MainGrid />
//             </Stack>
//           </Box>
//         </Box>
//       </div>
//     </AppTheme>
//   );
// }

// // Add runtime config for additional security
// Dashboard.runtime = {
//   protected: true,
// };



'use client';

import * as React from 'react';
import { useProtectedRoute } from '@/providers/session-provider';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import AppTheme from './shared-theme/AppTheme';

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customization';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

const LoadingScreen = () => (
  <AppTheme themeComponents={xThemeComponents}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default', // Using MUI's system props
        color: 'text.primary',
      }}
    >
      <Stack spacing={2} alignItems="center">
        <CircularProgress size={40} sx={{ color: 'primary.main' }} />
        <Box sx={{ color: 'text.secondary' }}>Loading dashboard...</Box>
      </Stack>
    </Box>
  </AppTheme>
);

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  // const { isLoading, isAuthenticated } = useProtectedRoute();

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box 
        sx={{ 
          display: 'flex',
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 5,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            {/* <Header /> */}
            <MainGrid />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}

// Add runtime config for additional security
Dashboard.runtime = {
  protected: true,
};