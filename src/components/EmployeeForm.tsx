import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { User } from '../types/user.types';

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: User) => void;
  employee?: User;
  mode: 'add' | 'edit';
}
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  department: string;
  title: string;
  role: string;
  username: string;
  city: string;
  state: string;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  open,
  onClose,
  onSubmit,
  employee,
  mode,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: employee
      ? {
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phone: employee.phone,
          age: employee.age,
          gender: employee.gender,
          department: employee.company.department,
          title: employee.company.title,
          role: employee.role,
          username: employee.username,
          city: employee.address.city,
          state: employee.address.state,
        }
      : {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          age: 18,
          gender: 'male',
          department: 'Engineering',
          title: '',
          role: 'user',
          username: '',
          city: '',
          state: '',
        },
  });
  useEffect(() => {
  if (employee && mode === 'edit') {
    reset({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      age: employee.age,
      gender: employee.gender,
      department: employee.company.department,
      title: employee.company.title,
      role: employee.role,
      username: employee.username,
      city: employee.address.city,
      state: employee.address.state,
    });
  } else if (mode === 'add') {
    reset({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: 18,
      gender: 'male',
      department: 'Engineering',
      title: '',
      role: 'user',
      username: '',
      city: '',
      state: '',
    });
  }
}, [employee, mode, reset]);

  const handleFormSubmit = (data: FormData) => {
    const newEmployee: User = {
      id: employee?.id || Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      maidenName: employee?.maidenName || '',
      age: data.age,
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      username: data.username,
      password: employee?.password || 'defaultpass',
      birthDate: employee?.birthDate || new Date().toISOString().split('T')[0],
      image: employee?.image || 'https://dummyjson.com/icon/default/128',
      bloodGroup: employee?.bloodGroup || 'O+',
      height: employee?.height || 175,
      weight: employee?.weight || 70,
      eyeColor: employee?.eyeColor || 'Brown',
      hair: employee?.hair || { color: 'Brown', type: 'Straight' },
      ip: employee?.ip || '0.0.0.0',
      address: {
        address: employee?.address.address || '123 Main St',
        city: data.city,
        state: data.state,
        stateCode: employee?.address.stateCode || 'XX',
        postalCode: employee?.address.postalCode || '00000',
        coordinates: employee?.address.coordinates || { lat: 0, lng: 0 },
        country: employee?.address.country || 'United States',
      },
      macAddress: employee?.macAddress || '00:00:00:00:00:00',
      university: employee?.university || 'Unknown University',
      bank: employee?.bank || {
        cardExpire: '12/25',
        cardNumber: '0000000000000000',
        cardType: 'Visa',
        currency: 'USD',
        iban: 'XXXXXXXXXXXXXXXXXXXX',
      },
      company: {
        department: data.department,
        name: employee?.company.name || 'Company Name',
        title: data.title,
        address: employee?.company.address || {
          address: '123 Business St',
          city: data.city,
          state: data.state,
          stateCode: 'XX',
          postalCode: '00000',
          coordinates: { lat: 0, lng: 0 },
          country: 'United States',
        },
      },
      ein: employee?.ein || '000-000',
      ssn: employee?.ssn || '000-00-0000',
      userAgent: employee?.userAgent || 'Unknown',
      crypto: employee?.crypto || {
        coin: 'Bitcoin',
        wallet: '0x0000000000000000000000000000000000000000',
        network: 'Ethereum (ERC20)',
      },
      role: data.role,
    };

    onSubmit(newEmployee);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#0d0d0d', borderBottom: '1px solid #1976d2' }}>
        <Typography variant="h6" sx={{ color: '#2196f3', fontWeight: 600 }}>
          {mode === 'add' ? 'Add New Employee' : 'Edit Employee'}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: 'Phone is required',
                  pattern: {
                    value: /^[+]?[\d\s-()]+$/,
                    message: 'Invalid phone number',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="age"
                control={control}
                rules={{
                  required: 'Age is required',
                  min: { value: 18, message: 'Age must be at least 18' },
                  max: { value: 100, message: 'Age must be less than 100' },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Age"
                    type="number"
                    fullWidth
                    error={!!errors.age}
                    helperText={errors.age?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="gender"
                control={control}
                rules={{ required: 'Gender is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Gender"
                    fullWidth
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="role"
                control={control}
                rules={{ required: 'Role is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Role"
                    fullWidth
                    error={!!errors.role}
                    helperText={errors.role?.message}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="department"
                control={control}
                rules={{ required: 'Department is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Department"
                    fullWidth
                    error={!!errors.department}
                    helperText={errors.department?.message}
                  >
                    <MenuItem value="Engineering">Engineering</MenuItem>
                    <MenuItem value="Support">Support</MenuItem>
                    <MenuItem value="Human Resources">Human Resources</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                    <MenuItem value="Research and Development">Research and Development</MenuItem>
                    <MenuItem value="Accounting">Accounting</MenuItem>
                    <MenuItem value="Services">Services</MenuItem>
                    <MenuItem value="Legal">Legal</MenuItem>
                    <MenuItem value="Product Management">Product Management</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Job title is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Job Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                control={control}
                rules={{ required: 'City is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="state"
                control={control}
                rules={{ required: 'State is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="State"
                    fullWidth
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, backgroundColor: '#0d0d0d', borderTop: '1px solid #1976d2' }}>
        <Button onClick={handleClose} sx={{ color: '#64b5f6' }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          variant="contained"
          sx={{
            backgroundColor: '#2196f3',
            '&:hover': { backgroundColor: '#1976d2' },
          }}
        >
          {mode === 'add' ? 'Add Employee' : 'Update Employee'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeForm;
