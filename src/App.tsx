import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { theme } from './utils/theme';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';

const drawerWidth = 260;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex' }}>
            <AppBar
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                backgroundColor: '#0d0d0d',
                borderBottom: '1px solid #1976d2',
                boxShadow: 'none',
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' }, color: '#2196f3' }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ color: '#2196f3', fontWeight: 600 }}
                >
                  Staff Management System
                </Typography>
              </Toolbar>
            </AppBar>
            <Navigation mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                minHeight: '100vh',
                backgroundColor: '#000000',
              }}
            >
              <Toolbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<EmployeeManagement />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
