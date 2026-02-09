import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#03a9f4',
      light: '#4fc3f7',
      dark: '#0288d1',
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
    text: {
      primary: '#2196f3',
      secondary: '#64b5f6',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      color: '#2196f3',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
          borderRadius: 8,
          border: '1px solid #1976d2',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            color: '#2196f3',
            '& fieldset': {
              borderColor: '#1976d2',
            },
            '&:hover fieldset': {
              borderColor: '#2196f3',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2196f3',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#64b5f6',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#2196f3',
          borderBottom: '1px solid #1976d2',
        },
        head: {
          fontWeight: 700,
          backgroundColor: '#0d0d0d',
        },
      },
    },
  },
});
