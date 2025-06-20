'use client';

import * as React from 'react';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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

export default function Page() {
  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#0b0b0b',
        }}
      >
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: '#0b0b0b',
            overflow: 'auto',
            maxWidth: '1650px',
            margin: '0 auto',
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

            <MainGrid />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}

export const runtime = 'nodejs';