import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './store/store';
import { theme } from './utils/theme';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import Login from './pages/Login';
import Signup from './pages/Signup';

const drawerWidth = 260;

function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Check if current route is login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <Box sx={{ display: 'flex' }}>
      {isAuthenticated && !isAuthPage && (
        <>
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
        </>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: isAuthenticated && !isAuthPage ? { sm: `calc(100% - ${drawerWidth}px)` } : '100%',
          minHeight: '100vh',
          backgroundColor: '#000000',
        }}
      >
        {isAuthenticated && !isAuthPage && <Toolbar />}
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <EmployeeManagement />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
