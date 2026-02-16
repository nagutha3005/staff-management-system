import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
  Button,
  Avatar,
} from '@mui/material';
import { Dashboard, People, Work, Logout } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { RootState } from '../store/store';

const drawerWidth = 260;
interface NavigationProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/',
    },
    {
      text: 'Employee Management',
      icon: <People />,
      path: '/employees',
    },
  ];

  const drawer = (
    <Box>
      <Toolbar
        sx={{
          backgroundColor: '#0d0d0d',
          borderBottom: '1px solid #1976d2',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Work sx={{ color: '#2196f3', fontSize: 32 }} />
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: '#2196f3', letterSpacing: 0.5 }}
        >
          Staff Manager
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: '#1976d2' }} />
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1, px: 1 }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                if (mobileOpen) {
                  handleDrawerToggle();
                }
              }}
              sx={{
                borderRadius: 1,
                backgroundColor:
                  location.pathname === item.path ? '#1976d220' : 'transparent',
                '&:hover': {
                  backgroundColor: '#1976d230',
                },
                border:
                  location.pathname === item.path
                    ? '1px solid #2196f3'
                    : '1px solid transparent',
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? '#2196f3' : '#64b5f6',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  color: location.pathname === item.path ? '#2196f3' : '#64b5f6',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: 'absolute', bottom: 20, left: 0, right: 0, px: 2 }}>
        <Box
          sx={{
            p: 2,
            backgroundColor: '#0d0d0d',
            borderRadius: 1,
            border: '1px solid #1976d2',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: '#2196f3',
                fontSize: '1rem',
                fontWeight: 700,
              }}
            >
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#2196f3',
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#64b5f6',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block',
                }}
              >
                @{user?.username}
              </Typography>
            </Box>
          </Box>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              color: '#ff5252',
              borderColor: '#ff5252',
              '&:hover': {
                borderColor: '#ff1744',
                backgroundColor: '#ff525220',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#000000',
            borderRight: '1px solid #1976d2',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#000000',
            borderRight: '1px solid #1976d2',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navigation;
