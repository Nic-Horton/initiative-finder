import * as React from 'react';
import { useState } from 'react'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function SimpleSnackbar({open, error, setAlertSeverity, handleShowAlertClickO, handleShowAlertClickC, alert}) {

//   const [open, setOpen] = useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//   };

  const action = (
    <React.Fragment>
      <Stack spacing={2} sx={{ width: '100%' }}>
    <Alert onClose={() => {}}>This is a success alert — check it out!2</Alert>
    <Alert onClose={handleShowAlertClickC} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
        <Alert severity="error">{alert}</Alert>
        </Stack>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleShowAlertClickC}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  
  return (
    <div>
      <Button onClick={handleShowAlertClickO}>Show SnackBar</Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleShowAlertClickC}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleShowAlertClickC}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {alert}
        </Alert>
        </Snackbar>
    </div>
  );
}
