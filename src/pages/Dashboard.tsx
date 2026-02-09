import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
} from '@mui/material';
import {
  People,
  PersonAdd,
  AdminPanelSettings,
  Business,
} from '@mui/icons-material';
import { useAppSelector } from '../store/hooks';

const Dashboard: React.FC = () => {
  const users = useAppSelector((state) => state.users.users);

  const totalEmployees = users.length;
  const adminCount = users.filter((user) => user.role === 'admin').length;
  const userCount = users.filter((user) => user.role === 'user').length;
  const departments = new Set(users.map((user) => user.company.department));
  const departmentCount = departments.size;

  const stats = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: <People sx={{ fontSize: 40, color: '#2196f3' }} />,
      color: '#1976d2',
    },
    {
      title: 'Administrators',
      value: adminCount,
      icon: <AdminPanelSettings sx={{ fontSize: 40, color: '#2196f3' }} />,
      color: '#1565c0',
    },
    {
      title: 'Regular Users',
      value: userCount,
      icon: <PersonAdd sx={{ fontSize: 40, color: '#2196f3' }} />,
      color: '#0d47a1',
    },
    {
      title: 'Departments',
      value: departmentCount,
      icon: <Business sx={{ fontSize: 40, color: '#2196f3' }} />,
      color: '#01579b',
    },
  ];

  const departmentStats = Array.from(departments).map((dept) => ({
    name: dept,
    count: users.filter((user) => user.company.department === dept).length,
  }));

  const genderStats = [
    {
      name: 'Male',
      count: users.filter((user) => user.gender === 'male').length,
    },
    {
      name: 'Female',
      count: users.filter((user) => user.gender === 'female').length,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#2196f3' }}>
        Dashboard
      </Typography>
<Typography variant="body1" sx={{ color: '#64b5f6', textAlign: 'center', py: 3 }}>
              Welcome to the Assist360 Staff Management System! Navigate to Employee Management to view and manage employees.
            </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(33, 150, 243, 0.2)',
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ color: '#64b5f6', mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#2196f3' }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box>{stat.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: '#121212', border: '1px solid #1976d2' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#2196f3' }}>
              Employees by Department
            </Typography>
            {departmentStats.map((dept, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  p: 2,
                  backgroundColor: '#0d0d0d',
                  borderRadius: 1,
                  border: '1px solid #1976d2',
                }}
              >
                <Typography variant="body1" sx={{ color: '#64b5f6' }}>
                  {dept.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#2196f3' }}
                >
                  {dept.count}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: '#121212', border: '1px solid #1976d2' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#2196f3' }}>
              Gender Distribution
            </Typography>
            {genderStats.map((stat, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  p: 2,
                  backgroundColor: '#0d0d0d',
                  borderRadius: 1,
                  border: '1px solid #1976d2',
                }}
              >
                <Typography variant="body1" sx={{ color: '#64b5f6' }}>
                  {stat.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#2196f3' }}
                >
                  {stat.count}
                </Typography>
              </Box>
            ))}

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: '#64b5f6' }}>
                Average Age
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#2196f3' }}>
                {(users.reduce((sum, user) => sum + user.age, 0) / users.length).toFixed(1)} years
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
