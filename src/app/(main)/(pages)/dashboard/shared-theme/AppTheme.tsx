// 'use client'
// import * as React from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import type { ThemeOptions } from '@mui/material/styles';
// import { inputsCustomizations } from '../customizations/inputs';
// import { dataDisplayCustomizations } from '../customizations/dataDisplay';
// import { feedbackCustomizations } from '../customizations/feedback';
// import { navigationCustomizations } from '../customizations/navigation';
// import { surfacesCustomizations } from '../customizations/surfaces';
// import { colorSchemes, typography, shadows, shape } from './themePrimitives';

// interface AppThemeProps {
//   children: React.ReactNode;
//   /**
//    * This is for the docs site. You can ignore it or remove it.
//    */
//   disableCustomTheme?: boolean;
//   themeComponents?: ThemeOptions['components'];
// }

// export default function AppTheme({
//   children,
//   disableCustomTheme,
//   themeComponents,
// }: AppThemeProps) {
//   const theme = React.useMemo(() => {
//     return disableCustomTheme
//       ? {}
//       : createTheme({
//           // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
//           cssVariables: {
//             colorSchemeSelector: 'data-mui-color-scheme',
//             cssVarPrefix: 'template',
//           },
//           colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
//           typography,
//           shadows,
//           shape,
//           components: {
//             ...inputsCustomizations,
//             ...dataDisplayCustomizations,
//             ...feedbackCustomizations,
//             ...navigationCustomizations,
//             ...surfacesCustomizations,
//             ...themeComponents,
//           },
//         });
//   }, [disableCustomTheme, themeComponents]);
//   if (disableCustomTheme) {
//     return <React.Fragment>{children}</React.Fragment>;
//   }
//   return (
//     <ThemeProvider theme={theme} disableTransitionOnChange>
//       {children}
//     </ThemeProvider>
//   );
// }



// 'use client'
// import * as React from 'react';
// import { ThemeProvider, createTheme, experimental_extendTheme } from '@mui/material/styles';
// import type { ThemeOptions } from '@mui/material/styles';
// import { inputsCustomizations } from '../customizations/inputs';
// import { dataDisplayCustomizations } from '../customizations/dataDisplay';
// import { feedbackCustomizations } from '../customizations/feedback';
// import { navigationCustomizations } from '../customizations/navigation';
// import { surfacesCustomizations } from '../customizations/surfaces';
// import { colorSchemes, typography, shadows, shape } from './themePrimitives';

// interface AppThemeProps {
//   children: React.ReactNode;
//   disableCustomTheme?: boolean;
//   themeComponents?: ThemeOptions['components'];
// }

// export default function AppTheme({
//   children,
//   disableCustomTheme,
//   themeComponents,
// }: AppThemeProps) {
//   const theme = React.useMemo(() => {
//     return disableCustomTheme
//       ? {}
//       : createTheme({
//           cssVariables: {
//             colorSchemeSelector: 'data-mui-color-scheme',
//             cssVarPrefix: 'template',
//           },
//           // Set default mode to dark
//           palette: {
//             mode: 'dark',
//           },
//           colorSchemes,
//           typography,
//           shadows,
//           shape,
//           components: {
//             ...inputsCustomizations,
//             ...dataDisplayCustomizations,
//             ...feedbackCustomizations,
//             ...navigationCustomizations,
//             ...surfacesCustomizations,
//             ...themeComponents,
//             MuiCssBaseline: {
//               styleOverrides: {
//                 body: {
//                   backgroundColor: colorSchemes.dark.palette.background.default,
//                   color: colorSchemes.dark.palette.text.primary,
//                 }
//               }
//             }
//           },
//         });
//   }, [disableCustomTheme, themeComponents]);

//   if (disableCustomTheme) {
//     return <React.Fragment>{children}</React.Fragment>;
//   }

//   return (
//     <ThemeProvider theme={theme} disableTransitionOnChange>
//       {children}
//     </ThemeProvider>
//   );
// }



// 'use client';

// import * as React from 'react';
// import { ThemeProvider, createTheme, experimental_extendTheme } from '@mui/material/styles';
// import type { ThemeOptions } from '@mui/material/styles';
// import { inputsCustomizations } from '../customizations/inputs';
// import { dataDisplayCustomizations } from '../customizations/dataDisplay';
// import { feedbackCustomizations } from '../customizations/feedback';
// import { navigationCustomizations } from '../customizations/navigation';
// import { surfacesCustomizations } from '../customizations/surfaces';
// import { colorSchemes, typography, shadows, shape } from './themePrimitives';

// interface AppThemeProps {
//   children: React.ReactNode;
//   disableCustomTheme?: boolean;
//   themeComponents?: ThemeOptions['components'];
// }

// export default function AppTheme({
//   children,
//   disableCustomTheme,
//   themeComponents,
// }: AppThemeProps) {
//   const theme = React.useMemo(() => {
//     return disableCustomTheme
//       ? {}
//       : experimental_extendTheme({
//           cssVariables: {
//             colorSchemeSelector: '[data-mui-color-scheme="dark"]',
//             cssVarPrefix: 'template',
//           },
//           colorSchemes: {
//             dark: colorSchemes.dark,
//             light: colorSchemes.light,
//           },
//           // Set initial color scheme to dark
//           initialColorScheme: "dark",
//           typography,
//           shadows,
//           shape,
//           components: {
//             ...inputsCustomizations,
//             ...dataDisplayCustomizations,
//             ...feedbackCustomizations,
//             ...navigationCustomizations,
//             ...surfacesCustomizations,
//             ...themeComponents,
//             MuiCssBaseline: {
//               styleOverrides: {
//                 body: {
//                   backgroundColor: colorSchemes.dark.palette.background.default,
//                   color: colorSchemes.dark.palette.text.primary,
//                 }
//               }
//             }
//           },
//         });
//   }, [disableCustomTheme, themeComponents]);

//   if (disableCustomTheme) {
//     return <React.Fragment>{children}</React.Fragment>;
//   }

//   return (
//     <ThemeProvider theme={theme} disableTransitionOnChange>
//       {children}
//     </ThemeProvider>
//   );
// }



// 'use client';

// import * as React from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import type { ThemeOptions } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

// interface AppThemeProps {
//   children: React.ReactNode;
//   disableCustomTheme?: boolean;
//   themeComponents?: ThemeOptions['components'];
// }

// export default function AppTheme({
//   children,
//   disableCustomTheme,
//   themeComponents,
// }: AppThemeProps) {
//   const theme = React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode: 'dark',
//           background: {
//             default: '#050607', // Dark blue background
//             paper: '#050607', // Slightly lighter blue for cards
//           },
//           primary: {
//             main: '#007FFF',
//             light: '#66B2FF',
//             dark: '#0059B2',
//             contrastText: '#fff',
//           },
//           text: {
//             primary: '#fff',
//             secondary: 'rgba(255, 255, 255, 0.7)',
//           },
//           divider: 'rgba(194, 224, 255, 0.08)',
//         },
//         components: {
//           MuiCssBaseline: {
//             styleOverrides: {
//               body: {
//                 backgroundColor: '#0A1929',
//                 color: '#fff',
//               },
//             },
//           },
//           MuiPaper: {
//             styleOverrides: {
//               root: {
//                 backgroundColor: '#132F4C',
//                 backgroundImage: 'none',
//               },
//             },
//           },
//           MuiCard: {
//             styleOverrides: {
//               root: {
//                 backgroundColor: '#132F4C',
//                 backgroundImage: 'none',
//                 borderRadius: 7,
//               },
//             },
//           },
//           MuiTableCell: {
//             styleOverrides: {
//               root: {
//                 borderBottom: '1px solid rgba(194, 224, 255, 0.08)',
//               },
//             },
//           },
//           ...themeComponents,
//         },
//       }),
//     [disableCustomTheme, themeComponents]
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline enableColorScheme />
//       {children}
//     </ThemeProvider>
//   );
// }

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