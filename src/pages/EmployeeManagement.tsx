import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  Business,
  Email,
  Phone,
  Visibility,
  MoreVert,
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addUser, updateUser, deleteUser } from '../store/usersSlice';
import { User } from '../types/user.types';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeDetails from '../components/EmployeeDetails';

const EmployeeManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<User | undefined>(undefined);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<User | null>(null);
  
  // Context Menu and Details Dialog States
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    employee: User | null;
  } | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [employeeToView, setEmployeeToView] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddEmployee = () => {
    setFormMode('add');
    setSelectedEmployee(undefined);
    setFormOpen(true);
  };

  const handleEditEmployee = (employee: User) => {
    setFormMode('edit');
    setSelectedEmployee(employee);
    setFormOpen(true);
  };

  const handleDeleteClick = (employee: User) => {
    setEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (employeeToDelete) {
      dispatch(deleteUser(employeeToDelete.id));
      setDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };

  const handleFormSubmit = (employee: User) => {
    if (formMode === 'add') {
      dispatch(addUser(employee));
    } else {
      dispatch(updateUser(employee));
    }
  };

  // Context Menu Handlers
  const handleContextMenu = (event: React.MouseEvent, employee: User) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
            employee,
          }
        : null
    );
  };

  const handleContextMenuClose = () => {
    setContextMenu(null);
  };

  const handleViewDetails = (employee: User) => {
    setEmployeeToView(employee);
    setDetailsDialogOpen(true);
    handleContextMenuClose();
  };

  const handleContextEdit = () => {
    if (contextMenu?.employee) {
      handleEditEmployee(contextMenu.employee);
      handleContextMenuClose();
    }
  };

  const handleContextDelete = () => {
    if (contextMenu?.employee) {
      handleDeleteClick(contextMenu.employee);
      handleContextMenuClose();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2196f3' }}>
          Employee Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddEmployee}
          sx={{
            backgroundColor: '#2196f3',
            '&:hover': { backgroundColor: '#1976d2' },
            fontWeight: 600,
          }}
        >
          Add Employee
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#121212', border: '1px solid #1976d2' }}>
        <TextField
          fullWidth
          placeholder="Search by name, email, department, or job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#2196f3' }} />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <TableContainer
        component={Paper}
        sx={{ backgroundColor: '#121212', border: '1px solid #1976d2' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Age</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow
                  key={user.id}
                  onContextMenu={(e) => handleContextMenu(e, user)}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#0d0d0d',
                      cursor: 'context-menu',
                    },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        sx={{
                          border: '2px solid #2196f3',
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, color: '#2196f3' }}
                        >
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64b5f6' }}>
                          @{user.username}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Email sx={{ fontSize: 16, color: '#64b5f6' }} />
                        <Typography variant="body2" sx={{ color: '#64b5f6' }}>
                          {user.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Phone sx={{ fontSize: 16, color: '#64b5f6' }} />
                        <Typography variant="body2" sx={{ color: '#64b5f6' }}>
                          {user.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Business sx={{ fontSize: 16, color: '#64b5f6' }} />
                      <Typography variant="body2" sx={{ color: '#2196f3' }}>
                        {user.company.department}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#64b5f6' }}>
                      {user.company.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      size="small"
                      sx={{
                        backgroundColor:
                          user.role === 'admin' ? '#1976d2' : '#0d47a1',
                        color: '#fff',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#2196f3' }}>
                      {user.age}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleViewDetails(user)}
                      sx={{
                        color: '#4caf50',
                        '&:hover': { backgroundColor: '#4caf5020' },
                      }}
                      title="View Details"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      onClick={() => handleEditEmployee(user)}
                      sx={{
                        color: '#2196f3',
                        '&:hover': { backgroundColor: '#1976d220' },
                      }}
                      title="Edit Employee"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(user)}
                      sx={{
                        color: '#f44336',
                        '&:hover': { backgroundColor: '#f4433620' },
                      }}
                      title="Delete Employee"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: '1px solid #1976d2',
            color: '#2196f3',
          }}
        />
      </TableContainer>

      <EmployeeForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        employee={selectedEmployee}
        mode={formMode}
      />

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle sx={{ backgroundColor: '#0d0d0d', borderBottom: '1px solid #1976d2' }}>
          <Typography variant="h6" sx={{ color: '#2196f3', fontWeight: 600 }}>
            Confirm Delete
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography sx={{ color: '#64b5f6' }}>
            Are you sure you want to delete {employeeToDelete?.firstName}{' '}
            {employeeToDelete?.lastName}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#0d0d0d', borderTop: '1px solid #1976d2' }}>
          <Button onClick={handleDeleteCancel} sx={{ color: '#64b5f6' }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              backgroundColor: '#f44336',
              '&:hover': { backgroundColor: '#d32f2f' },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Context Menu */}
      <Menu
        open={contextMenu !== null}
        onClose={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        PaperProps={{
          sx: {
            backgroundColor: '#121212',
            border: '1px solid #1976d2',
          },
        }}
      >
        <MenuItem onClick={() => contextMenu?.employee && handleViewDetails(contextMenu.employee)}>
          <ListItemIcon>
            <Visibility sx={{ color: '#4caf50' }} />
          </ListItemIcon>
          <ListItemText 
            primary="View Details" 
            primaryTypographyProps={{ sx: { color: '#2196f3' } }}
          />
        </MenuItem>
        <MenuItem onClick={handleContextEdit}>
          <ListItemIcon>
            <Edit sx={{ color: '#2196f3' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Edit Employee" 
            primaryTypographyProps={{ sx: { color: '#2196f3' } }}
          />
        </MenuItem>
        <MenuItem onClick={handleContextDelete}>
          <ListItemIcon>
            <Delete sx={{ color: '#f44336' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Delete Employee" 
            primaryTypographyProps={{ sx: { color: '#f44336' } }}
          />
        </MenuItem>
      </Menu>

      {/* Employee Details Dialog */}
      <EmployeeDetails
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        employee={employeeToView}
      />
    </Box>
  );
};

export default EmployeeManagement;
