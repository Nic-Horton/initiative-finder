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

function BottomAlert({ open, severity, message }) {
	return <div className={`bottom-alert ${severity}`}>{message}</div>;
}

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
		}, 3000);
	};

	const handleShowAlertClickO = () => setShowAlert(true);
	const handleShowAlertClickC = () => setShowAlert(false);

	const handleClickOpen = () => {
		setOpen(true);
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
			setAlertMessage(
				'Critical Success! User Created! Please hold, while you are redirected'
			);
			setShowAlert(true);
			setTimeout(() => {
				setOpen(false);
				window.location.href = '/dashboard';
			}, 3000);
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

					setTimeout(() => {
						setOpen(false);
					}, 3000);
				} catch (createErr) {
					console.error('Error creating user:', createErr);
				}
			} else {
				setAlertSeverity('error');
				setAlertMessage('Error signing in: ' + err.message);
				setShowAlert(true);
				console.error('Error signing in:', err);
				setOpen(true);
				setTimeout(() => {
					setShowAlert(false);
				}, 3000);
			}
		}
	};

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
