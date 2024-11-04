// src/mui/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',  // This enables dark mode
    background: {
      default: '#000000',  // Or your preferred dark background color
      paper: '#121212',    // Dark surface color for cards/papers
    },
    // ... rest of your palette config
  },
});

export default theme;