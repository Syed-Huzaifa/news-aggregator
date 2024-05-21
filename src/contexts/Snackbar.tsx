import React, { createContext, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';

const SnackbarContext = createContext(null);

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  console.log(severity);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const showSnackBar = (message, severity) => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
  }

  return (
    <SnackbarContext.Provider value={{ showSnackBar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={message}
      />
    </SnackbarContext.Provider>
  );
};
