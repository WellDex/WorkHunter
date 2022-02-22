import {Alert, AlertColor, Snackbar} from '@mui/material';
import React from 'react';

export interface INotification {
  message: string;
  type: AlertColor;
  open: boolean;
  handleClose: () => void;
}

const Notification = ({type, message, open, handleClose}: INotification) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
      <Alert onClose={handleClose} severity={type} sx={{width: '100%'}}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
