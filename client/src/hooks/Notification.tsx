import {Alert, Snackbar} from '@mui/material';
import React from 'react';

interface INotification {
  open: boolean;
  handleClose: () => void;
  message: string;
  type?: Types;
}

enum Types {
  error,
  warning,
  info,
  success,
}
//todo

const Notification = ({open, handleClose, message, type}: INotification) => {
  return (
    <Snackbar
      style={{position: 'absolute'}}
      open={open}
      onClose={handleClose}
      message={message}
      autoHideDuration={2000}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
      <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
        This is a success message!
      </Alert>
    </Snackbar>
  );
};

export default Notification;
