import * as React from "react";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Backdrop from "@mui/material/Backdrop";

export default function Register() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(true);
    alert("Crit Fail!");
  };

  const handleCloseReg = () => {
    setOpen(false);
    alert("Critical Success!");
  };

  return (
    <React.Fragment>
      <Button
        color="error"
        variant="contained"
        onClick={handleClickOpen}
        sx={{ width: 300 }}
      >
        Register
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Dialog open={open} onClose={handleCancel}>
          <DialogTitle>Registration Form</DialogTitle>
          <DialogContent
            sx={{
              width: 300,
              alignContent: "center",
              display: "flex",
              flexDirection: "column",
            }}

          >
            <DialogContentText>Please register to continue</DialogContentText>
            <Box 
            component="form" 
            autoComplete="off"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            >
            <TextField
              required
              focused
              margin="normal"
              id="username"
              label="UserName"
              inputProps={{ maxLength: 30 
              }}
              helperText="No more than 30 characters please!"
              type="text"
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="normal"
              id="email"
              label="Email Address"
              type="email"
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="normal"
              id="password"
              label="Password"
              type="text"
              variant="outlined"
            />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" sx={{width:40, borderColor: 'error.main'}}onClick={handleCancel}>Cancel</Button>
            <Button variant="contained" color="success" onClick={handleCloseReg}>Register</Button>
          </DialogActions>
        </Dialog>
      </Backdrop>
    </React.Fragment>
  );
}
