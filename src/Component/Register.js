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
import { db } from '../Config/firebase-config';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
	palette: {
		primary: {
			main: 'rgba(200, 184, 116)', // Set your custom color as the primary color
		},
		secondary: {
			main: 'rgba(200, 184, 116)', // Set your custom color as the secondary color
		},
		text: {
			primary: 'rgb(200, 184, 116)', // Set the text color to your custom RGB color
		},
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiInputBase-input': {
						backgroundColor: 'rgba(38, 50, 56,0.75)',
						color: 'rgb(200, 184, 116)', // Set the background color to your custom RGB color
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'&.Mui-focused fieldset': {
						borderColor: 'rgb(200, 184, 116)', // Set the border color for focused state
					},
					'& fieldset': {
						borderColor: 'rgb(200, 184, 116)', // Set the border color for unfocused state
					},
				},
			},
		},
	},
});

export default function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [open, setOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [alertSeverity, setAlertSeverity] = useState('info');
	const [showAlert, setShowAlert] = useState(false);

	const showBottomAlert = () => {
		return (
			<div>
				{showAlert && <div className="bottom-alert">This is a alert!</div>}
			</div>
		);
	};

	const handleCancel = () => {
		setAlertSeverity('error');
		setAlertMessage('Critical Failure');
		setShowAlert(true);
		console.error('Error signing in:');
		setTimeout(() => {
			setOpen(false);
			setShowAlert(false);
			setEmail('');
			setPassword('');
		}, 1000);
	};

	const handleShowAlertClickC = () => setShowAlert(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleCloseReg = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			// const user = userCredential.user;
			// console.log('User Created!');
			setAlertSeverity('success');
			setAlertMessage(
				'Critical Success! User Created! Please hold, while you are redirected'
			);
			setShowAlert(true);
			setTimeout(() => {
				setOpen(false);
				window.location.href = '/dashboard';
			}, 1000);
		} catch (err) {
			if (err.code === 'auth/user-not-found') {
				// User doesn't exist, you can proceed to create a new user
				try {
					await createUserWithEmailAndPassword(auth, email, password);
					setAlertSeverity('success');
					setAlertMessage('Critical Success! User Created!');
					setShowAlert(true);
					setTimeout(() => {
						setOpen(false);
					}, 500);
				} catch (createErr) {
					console.error('Error creating user:', createErr);
				}
			} else {
				setAlertSeverity('error');
				setAlertMessage(err.message);
				setShowAlert(true);
				setOpen(true);
				setTimeout(() => {
					setShowAlert(false);
				}, 3000);
			}
		}
	};

	return (
		<>
			<Button
				fullWidth
				color="secondary"
				variant="contained"
				onClick={handleClickOpen}
				// sx={{ width: 150 }}
			>
				Register
			</Button>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
			>
				<Dialog open={open} onClose={handleCancel} sx={{ borderRadius: 2 }}>
					<Box sx={{ border: '5px solid rgba(200, 184, 116)' }}>
						<DialogTitle
							sx={{
								color: 'white',
								backgroundColor: 'rgba(38, 50, 56,0.9)',
								textAlign: 'center',
							}}
						>
							Registration Form
						</DialogTitle>
						<DialogContent
							sx={{
								backgroundColor: 'rgba(38, 50, 56,0.9)',
								width: 300,
								alignContent: 'center',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<DialogContentText sx={{ color: 'white', textAlign: 'center' }}>
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
								<ThemeProvider theme={customTheme}>
									<TextField
										autoFocus
										margin="normal"
										id="email"
										value={email}
										label="Email Address"
										type="email"
										variant="outlined"
										onChange={(e) => setEmail(e.target.value)}
										InputLabelProps={{
											sx: {
												color: (theme) => theme.palette.text.primary,
											},
										}}
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
										InputLabelProps={{
											sx: {
												color: (theme) => theme.palette.text.primary,
											},
										}}
									/>
								</ThemeProvider>
							</Box>
						</DialogContent>
						<DialogActions sx={{ backgroundColor: 'rgba(38, 50, 56,0.9)' }}>
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
								color="secondary"
								onClick={handleCloseReg}
							>
								Register
							</Button>
						</DialogActions>
						{/* <BottomAlert open={open} severity={alertSeverity} message={alertMessage} /> */}
						<Snackbar
							alert={alertMessage}
							alertSeverity={alertSeverity}
							open={showAlert}
							handleShowAlertClickC={handleShowAlertClickC}
						/>
					</Box>
				</Dialog>
			</Backdrop>
		</>
	);
}
