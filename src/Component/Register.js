import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from './SnackBar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { auth } from '../Config/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// function PositionedSnackBar(){
//   const [state, setState] = React.useState({
//     open: false,
//     vertical: 'top',
//     horizontal: 'center',
//   });
//   const { vertical, horizontal, open } = state;

//   const handleClick = (newState) => () => {
//     setState({ ...newState, open: true });
//   };

//   const handleClose = () => {
//     setState({ ...state, open: false });
//   };

//   const buttons = (
//     <React.Fragment>
//       <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//         <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>
//           Top-Center
//         </Button>
//       </Box>
//       <Grid container justifyContent="center">
//         <Grid item xs={6}>
//           <Button onClick={handleClick({ vertical: 'top', horizontal: 'left' })}>
//             Top-Left
//           </Button>
//         </Grid>
//         <Grid item xs={6} textAlign="right">
//           <Button onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>
//             Top-Right
//           </Button>
//         </Grid>
//         <Grid item xs={6}>
//           <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })}>
//             Bottom-Left
//           </Button>
//         </Grid>
//         <Grid item xs={6} textAlign="right">
//           <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}>
//             Bottom-Right
//           </Button>
//         </Grid>
//       </Grid>
//       <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//         <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}>
//           Bottom-Center
//         </Button>
//       </Box>
//     </React.Fragment>
//   );

//   return (
//     <Box sx={{ width: 500 }}>
//       {buttons}
//       <Snackbar
//         anchorOrigin={{ vertical, horizontal }}
//         open={open}
//         onClose={handleClose}
//         message="I love snacks"
//         key={vertical + horizontal}
//       />
//     </Box>
//   );
// }

function BottomAlert({ open, severity, message }) {
	return <div className={`bottom-alert ${severity}`}>{message}</div>;
}

export default function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const [displayName, setDisplayName] = useState("")
	const [open, setOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [alertSeverity, setAlertSeverity] = useState('info');
	const [showAlert, setShowAlert] = useState(false);
	// useState (false) show div to  populate error
	// useState takes place of if/else statements
	// trigger use state

	const showBottomAlert = () => {
		return (
			<div>
				{showAlert && <div className="bottom-alert">This is a alert!</div>}
			</div>
		);
	};

	const handleShowAlertClickO = () => setShowAlert(true);
	const handleShowAlertClickC = () => setShowAlert(false);

	// const autoHideDuration = () => {
	//   autoHideDuration=500;
	// }

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleCancel = () => {
		setOpen(false);
		alert('Critical Fail!');
	};

	const handleCloseReg = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			console.log('User Created!');
			setAlertSeverity('success');
			setAlertMessage('Critical Success! User Created!');
			setShowAlert(true);

			// You can also hide the alert after a certain duration (e.g., 3 seconds)
			// setTimeout(() => {
			//   setShowAlert(false);
			// }, 3000);
		} catch (err) {
			console.error(err);

			if (err.code === 'auth/user-not-found') {
				// User doesn't exist, you can proceed to create a new user
				try {
					const userCredential = await createUserWithEmailAndPassword(
						auth,
						email,
						password
					);
					const user = userCredential.user;
					console.log('User created:', user);
					setAlertSeverity('success');
					setAlertMessage('Critical Success! User Created!');
					setShowAlert(true);
				} catch (createErr) {
					console.error('Error creating user:', createErr);
				}
			} else {
				setAlertSeverity('error');
				setAlertMessage('Error signing in: ' + err.message);
				setShowAlert(true);
				console.error('Error signing in:', err);
			}
		}
	};
	// const handleCloseReg = async () => {
	//   try {
	//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	//     const user = userCredential.user;
	//     // alert("Critical Success! User Created!")
	//     console.log("User Created!");
	//     setAlertSeverity('success');
	//     setAlertMessage('Critical Success!')
	//     setOpen(true);
	//   } catch (err) {
	//     console.error(err)
	//     if (err) {
	//       try {
	//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	//         const user = userCredential.user;
	//         console.log("User created:", user);
	//         setAlertSeverity('success');
	//         setAlertMessage('Critical Success! User Created!');
	//         setShowAlert(true);
	//       } catch (createErr) {
	//         console.error("Error creating user:", createErr);
	//       }
	//     } else {
	//       setAlertSeverity('error');
	//       setAlertMessage('Error signing in: ' + err.message);
	//       setShowAlert(true);
	//       console.error("Error signing in:", err);
	//     }
	//       // User doesn't exist, you can proceed to create a new user
	//       // work on  errors
	//       // Validation?
	//       // hidden or display:none
	//       // css for display open
	//     //   return (
	//     //   <Alert
	//     //   open={open}
	//     //   severity={alertSeverity}
	//     //   onClose={() => setOpen(false)}
	//     // >
	//     //   <AlertTitle>{alertSeverity === 'success' ? 'Success' : 'Error'}</AlertTitle>
	//     //   {alertMessage}
	//     // </Alert>
	//     //   )
	//     }

	//   //   if (!err) {
	//   //     try {
	//   //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	//   //       const user = userCredential.user;
	//   //       console.log("User created:", user);
	//   //       setOpen(true);
	//   //       alert("Critical Success!");
	//   //     } catch (createErr) {
	//   //       console.error("Error creating user:", createErr);
	//   //     }
	//   //   } else {
	//   //     setAlertSeverity('error');
	//   //     setAlertMessage('Error signing in');
	//   //     setOpen(true);
	//   //     // alert("Error signing in: Email already in use", err)
	//   //     console.error("Error signing in:", err);
	//   //   }
	//   // }
	// };
	return (
		<>
			<div>
				<React.Fragment>
					<Button
						color="error"
						variant="contained"
						onClick={handleClickOpen}
						sx={{ width: 150 }}
					>
						Register
					</Button>
					<Backdrop
						sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
						open={open}
					>
						<Dialog open={open} onClose={handleCancel}>
							<DialogTitle>Registration Form</DialogTitle>
							<DialogContent
								sx={{
									width: 300,
									alignContent: 'center',
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<DialogContentText>
									Please register to continue
								</DialogContentText>
								<Box
									component="form"
									autoComplete="off"
									sx={{
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<TextField
										autoFocus
										margin="normal"
										id="email"
										value={email}
										label="Email Address"
										type="email"
										variant="outlined"
										onChange={(e) => setEmail(e.target.value)}
									/>
									<TextField
										autoFocus
										margin="normal"
										id="password"
										value={password}
										label="Password"
										type="text"
										variant="outlined"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</Box>
							</DialogContent>
							<DialogActions>
								<Button
									variant="outlined"
									color="error"
									sx={{ width: 40, borderColor: 'error.main' }}
									onClick={handleCancel}
								>
									Cancel
								</Button>
								<Button
									variant="contained"
									color="success"
									onClick={handleCloseReg}
								>
									Register
								</Button>
							</DialogActions>
							{/* <BottomAlert open={open} severity={alertSeverity} message={alertMessage} /> */}
							<Snackbar
								error={true}
								alert={alertMessage}
								setAlertSeverity={setAlertSeverity}
								open={showAlert}
								handleShowAlertClickO={handleShowAlertClickO}
								handleShowAlertClickC={handleShowAlertClickC}
							/>
						</Dialog>
					</Backdrop>
				</React.Fragment>
			</div>
			<div></div>
		</>
	);
}
