import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface NotificationSnackbarProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
}

const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: '100%',
          backgroundColor:
            severity === 'success'
              ? '#4caf50'
              : severity === 'error'
              ? '#f44336'
              : severity === 'warning'
              ? '#ff9800'
              : '#2196f3',
          color: '#fff',
          fontWeight: 600,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;