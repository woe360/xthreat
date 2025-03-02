'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface AppThemeProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions['components'];
}

export default function AppTheme({
  children,
  disableCustomTheme,
  themeComponents,
}: AppThemeProps) {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          background: {
            default: '#050607', // Keep main background dark
            paper: '#181b24', // Update component background to match
          },
          primary: {
            main: '#007FFF',
            light: '#66B2FF',
            dark: '#0059B2',
            contrastText: '#fff',
          },
          text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
          },
          divider: 'rgba(194, 224, 255, 0.08)',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: '#050607', // Keep main background dark
                color: '#fff',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: '#181b24', // Update component background
                backgroundImage: 'none',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: '#181b24', // Update component background
                backgroundImage: 'none',
                borderRadius: 7,
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                borderBottom: '1px solid rgba(194, 224, 255, 0.08)',
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: '#181b24', // Update drawer background
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                backgroundColor: '#181b24', // Update dialog background
              },
            },
          },
          MuiPopover: {
            styleOverrides: {
              paper: {
                backgroundColor: '#181b24', // Update popover background
              },
            },
          },
          MuiMenu: {
            styleOverrides: {
              paper: {
                backgroundColor: '#181b24', // Update menu background
              },
            },
          },
          ...themeComponents,
        },
      }),
    [disableCustomTheme, themeComponents]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}