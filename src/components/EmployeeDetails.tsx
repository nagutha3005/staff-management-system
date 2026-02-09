import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
  Grid,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Close,
  Email,
  Phone,
  LocationOn,
  Business,
  Person,
  Cake,
  Transgender,
  Bloodtype,
  Height,
  MonitorWeight,
  RemoveRedEye,
  School,
  CreditCard,
  VpnKey,
  Computer,
  AccountBalance,
} from '@mui/icons-material';
import { User } from '../types/user.types';

interface EmployeeDetailsProps {
  open: boolean;
  onClose: () => void;
  employee: User | null;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ open, onClose, employee }) => {
  if (!employee) return null;

  const DetailRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <Box sx={{ color: '#64b5f6', display: 'flex', alignItems: 'center' }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ color: '#64b5f6', display: 'block' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: '#2196f3', fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#121212',
          border: '1px solid #1976d2',
        }
      }}
    >
      <DialogTitle sx={{ backgroundColor: '#0d0d0d', borderBottom: '1px solid #1976d2', pr: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={employee.image}
            alt={`${employee.firstName} ${employee.lastName}`}
            sx={{
              width: 60,
              height: 60,
              border: '3px solid #2196f3',
            }}
          />
          <Box>
            <Typography variant="h5" sx={{ color: '#2196f3', fontWeight: 700 }}>
              {employee.firstName} {employee.lastName}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64b5f6' }}>
              @{employee.username} • {employee.company.title}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Chip
              label={employee.role.toUpperCase()}
              size="small"
              sx={{
                backgroundColor: employee.role === 'admin' ? '#1976d2' : '#0d47a1',
                color: '#fff',
                fontWeight: 700,
              }}
            />
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#64b5f6',
            '&:hover': { backgroundColor: '#1976d220' },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#2196f3', fontWeight: 600, mb: 2 }}>
              Personal Information
            </Typography>
            <Divider sx={{ borderColor: '#1976d2', mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailRow
              icon={<Email />}
              label="Email Address"
              value={employee.email}
            />
            <DetailRow
              icon={<Phone />}
              label="Phone Number"
              value={employee.phone}
            />
            <DetailRow
              icon={<Cake />}
              label="Date of Birth"
              value={employee.birthDate}
            />
            <DetailRow
              icon={<Person />}
              label="Age"
              value={`${employee.age} years`}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailRow
              icon={<Transgender />}
              label="Gender"
              value={employee.gender.charAt(0).toUpperCase() + employee.gender.slice(1)}
            />
            <DetailRow
              icon={<Bloodtype />}
              label="Blood Group"
              value={employee.bloodGroup}
            />
            <DetailRow
              icon={<Height />}
              label="Height"
              value={`${employee.height} cm`}
            />
            <DetailRow
              icon={<MonitorWeight />}
              label="Weight"
              value={`${employee.weight} kg`}
            />
          </Grid>

          {/* Physical Characteristics */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#2196f3', fontWeight: 600, mb: 2, mt: 2 }}>
              Physical Characteristics
            </Typography>
            <Divider sx={{ borderColor: '#1976d2', mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailRow
              icon={<RemoveRedEye />}
              label="Eye Color"
              value={employee.eyeColor}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ color: '#64b5f6', display: 'flex', alignItems: 'center' }}>
                <Person />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ color: '#64b5f6', display: 'block' }}>
                  Hair
                </Typography>
                <Typography variant="body2" sx={{ color: '#2196f3', fontWeight: 500 }}>
                  {employee.hair.color} • {employee.hair.type}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Company Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#2196f3', fontWeight: 600, mb: 2, mt: 2 }}>
              Company Information
            </Typography>
            <Divider sx={{ borderColor: '#1976d2', mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailRow
              icon={<Business />}
              label="Company Name"
              value={employee.company.name}
            />
            <DetailRow
              icon={<Business />}
              label="Department"
              value={employee.company.department}
            />
            <DetailRow
              icon={<Person />}
              label="Job Title"
              value={employee.company.title}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailRow
              icon={<VpnKey />}
              label="EIN"
              value={employee.ein}
            />
            <DetailRow
              icon={<CreditCard />}
              label="SSN"
              value={employee.ssn}
            />
          </Grid>

          {/* Address Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#2196f3', fontWeight: 600, mb: 2, mt: 2 }}>
              Address Information
            </Typography>
            <Divider sx={{ borderColor: '#1976d2', mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailRow
              icon={<LocationOn />}
              label="Street Address"
              value={employee.address.address}
            />
            <DetailRow
              icon={<LocationOn />}
              label="City"
              value={employee.address.city}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailRow
              icon={<LocationOn />}
              label="State"
              value={`${employee.address.state} (${employee.address.stateCode})`}
            />
            <DetailRow
              icon={<LocationOn />}
              label="Postal Code"
              value={employee.address.postalCode}
            />
          </Grid>

          <Grid item xs={12}>
            <DetailRow
              icon={<LocationOn />}
              label="Country"
              value={employee.address.country}
            />
            <DetailRow
              icon={<Computer />}
              label="IP Address"
              value={employee.ip}
            />
          </Grid>

          {/* Education & Banking */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#2196f3', fontWeight: 600, mb: 2, mt: 2 }}>
              Education & Financial
            </Typography>
            <Divider sx={{ borderColor: '#1976d2', mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailRow
              icon={<School />}
              label="University"
              value={employee.university}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailRow
              icon={<AccountBalance />}
              label="Bank Card"
              value={`${employee.bank.cardType} - ${employee.bank.cardNumber.slice(-4)}`}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ p: 2, backgroundColor: '#0d0d0d', borderRadius: 1, border: '1px solid #1976d2' }}>
              <Typography variant="caption" sx={{ color: '#64b5f6', display: 'block', mb: 1 }}>
                Company Address
              </Typography>
              <Typography variant="body2" sx={{ color: '#2196f3' }}>
                {employee.company.address.address}, {employee.company.address.city}, {employee.company.address.state} {employee.company.address.postalCode}
              </Typography>
            </Box>
          </Grid>

          {/* Technical Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#2196f3', fontWeight: 600, mb: 2, mt: 2 }}>
              Technical Information
            </Typography>
            <Divider sx={{ borderColor: '#1976d2', mb: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ p: 2, backgroundColor: '#0d0d0d', borderRadius: 1, border: '1px solid #1976d2', mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#64b5f6', display: 'block', mb: 1 }}>
                User Agent
              </Typography>
              <Typography variant="body2" sx={{ color: '#2196f3', wordBreak: 'break-all' }}>
                {employee.userAgent}
              </Typography>
            </Box>
            <DetailRow
              icon={<Computer />}
              label="MAC Address"
              value={employee.macAddress}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailRow
              icon={<AccountBalance />}
              label="Crypto Wallet"
              value={`${employee.crypto.coin} (${employee.crypto.network})`}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, backgroundColor: '#0d0d0d', borderRadius: 1, border: '1px solid #1976d2' }}>
              <Typography variant="caption" sx={{ color: '#64b5f6', display: 'block', mb: 1 }}>
                Wallet Address
              </Typography>
              <Typography variant="body2" sx={{ color: '#2196f3', wordBreak: 'break-all', fontSize: '0.75rem' }}>
                {employee.crypto.wallet}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, backgroundColor: '#0d0d0d', borderTop: '1px solid #1976d2' }}>
        <Button 
          onClick={onClose} 
          variant="contained"
          sx={{
            backgroundColor: '#2196f3',
            '&:hover': { backgroundColor: '#1976d2' },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeDetails;
