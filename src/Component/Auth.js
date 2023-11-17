import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, FormControl, FormLabel, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Register from './Register';
import { useState, useEffect } from 'react';
import { auth, googleProvider } from '../Config/firebase-config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Snackbar from './SnackBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const customTheme = createTheme({
	palette: {
		primary: {
			main: 'rgba(200, 184, 116)',
		},
		secondary: {
			main: 'rgba(200, 184, 116)',
		},
		text: {
			primary: 'rgb(200, 184, 116)',
		},
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiInputBase-input': {
						backgroundColor: 'rgba(38, 50, 56,0.75)',
						color: 'rgb(200, 184, 116)',
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'&.Mui-focused fieldset': {
						borderColor: 'rgb(200, 184, 116)',
					},
					'& fieldset': {
						borderColor: 'rgb(200, 184, 116)',
					},
				},
			},
		},
	},
});

const ButtonTheme = createTheme({
	palette: {
		primary: {
			main: 'rgba(70, 90, 250, 0.8)',
		},
		secondary: {
			main: 'rgba(130,0,0,1)',
		},
		success: {
			main: 'rgb(200, 184, 116)',
		},
	},
});

export const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const [alertMessage, setAlertMessage] = useState('');
	const [alertSeverity, setAlertSeverity] = useState('info');
	const [showAlert, setShowAlert] = useState(false);

	// console.log(auth?.currentUser);

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
			if (auth.currentUser) {
				setAlertMessage('User Found-Critical Success!');
				setAlertSeverity('success');
				setShowAlert(true);
				setTimeout(() => {
					setShowAlert(false);
				}, 1000);
			}
			setTimeout(() => {
				navigate('/dashboard');
			}, 700);
		} catch (err) {
			console.log(err);
		}
	};

	const signIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (userCredential.user) {
				setAlertMessage('User Found-Critical Success!');
				setAlertSeverity('success');
				setShowAlert(true);
				setTimeout(() => {
					setShowAlert(false);
				}, 1000);
				setTimeout(() => {
					navigate('/dashboard');
				}, 700);
			}
		} catch (err) {
			setAlertMessage('User Not Found');
			setAlertSeverity('error');
			setShowAlert(true);
			setTimeout(() => {
				setShowAlert(false);
			}, 2500);
		}
	};

	const handleShowAlertClickC = () => setShowAlert(false);

	useEffect(() => {
		// Use onAuthStateChanged to listen for changes in authentication status
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				setUser(authUser); // User is signed in
			} else {
				setUser(null); // User is signed out
			}
		});

		return () => {
			// Unsubscribe from the listener when the component unmounts
			unsubscribe();
		};
	}, []);

	const imageURL = '/Images/Auth.jpg';

	return (
		<div
			style={{
				backgroundImage: `url(${imageURL})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				height: '100vh',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div>
				<Box
					component="form"
					sx={{ position: 'relative', p: 0 }}
					noValidate
					autoComplete="off"
				>
					<FormControl
						sx={{
							display: 'flex',
							backgroundColor: 'rgba(38, 50, 56,0.75)',
							color: '#c8b874',
							flexWrap: 'wrap',
							flexDirection: 'column',
							border: 1,
							borderRadius: 5,
							padding: 4,
							alignContent: 'left',
							maxWidth: 250,
							justifyContent: 'center',
						}}
					>
						<FormLabel
							sx={{
								textAlign: 'center',
								color: '#c8b874',
								fontStyle: 'oblique',
								fontFamily: 'Roboto',
								fontSize: '2em',
							}}
						>
							"How do you want to do this?"
						</FormLabel>
						<ThemeProvider theme={customTheme}>
							<TextField
								value={email}
								placeholder="Enter Email"
								variant="outlined"
								sx={{}}
								margin="normal"
								onChange={(e) => setEmail(e.target.value)}
							/>

							<TextField
								sx={{ marginBottom: 2 }}
								value={password}
								type="password"
								placeholder="Enter Password"
								id="outlined-basic"
								variant="outlined"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</ThemeProvider>
						<Container
							style={{ paddingLeft: '0', paddingRight: '0' }}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
							}}
						>
							<ThemeProvider theme={ButtonTheme}>
								<Grid
									container
									spacing={1}
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										mb: 1,
									}}
								>
									<Grid item xs>
										<Button
											fullWidth
											variant="contained"
											color="primary"
											onClick={signIn}
											// sx={{ marginBottom:  }}
										>
											Login
										</Button>
									</Grid>
									<Grid item xs>
										<Register />
									</Grid>
								</Grid>
								<Button
									variant="contained"
									color="success"
									onClick={signInWithGoogle}
								>
									Sign in with Google
								</Button>
							</ThemeProvider>
							<Snackbar
								alert={alertMessage}
								alertSeverity={alertSeverity}
								open={showAlert}
								handleShowAlertClickC={handleShowAlertClickC}
							/>
						</Container>
					</FormControl>
				</Box>
			</div>
		</div>
	);
};
