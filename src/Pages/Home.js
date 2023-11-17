import * as React from 'react';
import Box from '@mui/material/Box';
import {
	Avatar,
	BottomNavigation,
	Card,
	Container,
	IconButton,
	BottomNavigationAction,
	Collapse,
} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button/';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import Navbar from '../Component/Navbar';
import { useState, useEffect } from 'react';
import AppSteps from '../Component/Stepper';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Paper from '@mui/material/Paper';
import { auth } from '../Config/firebase-config';
import NavbarNoLogin from '../Component/NavBarNoLogin';

const steps = [
	'Select Campaign',

	'Create Characters or Monsters',
	'Add to Initiative Tracker',
	'Roll Initiative!',
];
export default function Home() {
	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState([]);
	const [footerExpanded, setFooterExpanded] = useState(false);
	const [showContent, setShowContent] = useState(false);
	const [value, setValue] = React.useState(0);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				setUser(authUser);
			} else {
				setUser(null);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const totalSteps = () => {
		return steps.length;
	};

	const completedSteps = () => {
		return Object.keys(completed).length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};

	const handleNext = () => {
		let newActiveStep;

		if (isLastStep() && !allStepsCompleted()) {
			newActiveStep = steps.findIndex((step, i) => !completed.includes(i));
		} else {
			newActiveStep = activeStep + 1;
		}

		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step) => {
		setActiveStep(step);
	};

	const handleComplete = () => {
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);
		handleNext();
	};

	const handleReset = () => {
		setActiveStep(0);
		setCompleted({});
	};

	const handleLearn = () => {
		alert('button clicked');
	};

	const uncollapsedContentStyle = {
		zIndex: showContent ? 500 : 0,
	};
	const toggleContent = () => {
		setShowContent(!showContent);
		setFooterExpanded(!showContent);
	};

	return (
		<>
			{user ? <NavbarNoLogin /> : <Navbar />}
			<div
				style={{
					backgroundImage: `url('/Images/wallhaven-oxq529.jpg')`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					height: '100vh',
					width: '100%',
					backdropFilter: 'blur(500px)',
				}}
			>
				<Grid container direction="column" alignItems="center" justify="center">
					<Grid item></Grid>
				</Grid>

				<Box sx={{ flexGrow: 1 }}>
					<Grid container direction="row" alignItems="flex-start" columns={16}>
						<Typography
							sx={{
								textAlign: 'center',
								marginTop: 35,
								color: '#c8b874',
								maxWidth: 1000,
								width: 800,
								marginLeft: 'auto',
								marginRight: 'auto',
								border: 1,
								borderRadius: 5,
								marginBottom: 10,
								backgroundColor: 'rgba(38,50,56,.9)',
							}}
							variant="h1"
							gutterBottom
						>
							Initiative Finder
						</Typography>

						<Grid
							item
							xs={16}
							sx={{
								textAlign: 'center',
								maxWidth: '1000px',
								margin: 'auto',
								padding: '20px',
							}}
						>
							<Typography
								variant="h6"
								sx={{
									justifyContent: 'center',
									alignContent: 'center',
									width: 800,
									marginLeft: 'auto',
									marginRight: 'auto',
									mb: 5,
									borderRadius: 5,
									backgroundColor: 'rgba(51,0,0,0.8)',
									color: 'rgba(255,229,204)',
								}}
							>
								Dive into the immersive world of Golarion with confidence and
								precision using the "Initiative Finder" app- the digital
								browser-based companion for Game Masters. Whether you're
								navigating a treacherous dungeon, facing off against fearsome
								foes, or weaving intricate tales of heroism with your friends,
								this app is your key to mastering the art of monster and
								character management in the thrilling and ever changing realm of
								Pathfinder 2nd Edition.
							</Typography>
						</Grid>
					</Grid>
				</Box>
				<Box textAlign="center">
					<Button
						sx={{
							fontWeight: 'bold',
							color: '#c8b874',
							backgroundColor: 'rgba(38,50,56,.9)',
							border: 1,
							fontSize: 25,
							width: 500,
							height: 100,
						}}
						size="large"
						component={NavLink}
						to={user ? '/dashboard' : '/login'}
						color="success"
						variant="contained"
					>
						Let's Get Started!
					</Button>
				</Box>
			</div>
			<div></div>

			{/* make as footer */}

			<Box
				sx={{
					position: 'fixed',
					p: 0,
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: 500,
				}}
			>
				{/* <Paper sx={{  }} elevation={3}> */}

				<BottomNavigation
					sx={{
						backgroundColor: '#2a0202',
					}}
					showLabels
					onChange={(event, newValue) => {
						setValue(newValue);
						toggleContent();
					}}
				>
					<BottomNavigationAction
						label="Meet The Team"
						sx={{
							'& .MuiBottomNavigationAction-label': {
								fontSize: '50px', // Adjust the font size as needed
								// fontWeight: 'bold', // Adjust the font weight as needed
								color: '#c8b874',
								width: '100vw',
							},
						}}
					/>
				</BottomNavigation>
				<Collapse in={showContent} sx={uncollapsedContentStyle}>
					<div>
						<Box
							sx={{
								display: 'flex',
								flexShrink: '1',
								backgroundColor: 'rgba(42,2,2,0.95)',
								pt: 1,
								pb: 1,
							}}
						>
							<Container
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignContent: 'stretch',
								}}
							>
								<Card
									sx={{
										display: 'flex',
										minWidth: 200,
										maxWidth: 300,
										backgroundColor: '#2a353b',
										color: '#c8b874',
										border: 2,
										borderColor: '#c8b874',
									}}
								>
									<CardContent>
										<Typography
											variant="h6"
											color="text.primary"
											sx={{ backgroundColor: '#2a353b', color: '#c8b874' }}
											gutterBottom
										>
											<Avatar
												alt="Larry Le"
												src="https://ca.slack-edge.com/T0569RDC6-U051D0R0NG4-9fcd9f89cca9-48"
											></Avatar>
											Larry Le
										</Typography>
										<Typography
											sx={{ backgroundColor: '#2a353b', color: '#c8b874' }}
											variant="body2"
										>
											Starry Citizen
											<br />
											Atlanta, GA
										</Typography>
									</CardContent>
									<CardActions
										sx={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<IconButton
											label="LinkedIn"
											onClick={() =>
												window.open(
													'https://www.linkedin.com/in/lelarry/',
													'_blank'
												)
											}
										>
											<LinkedInIcon sx={{ color: 'white', fontSize: '3rem' }} />
										</IconButton>
										<Button
											variant="text"
											size="small"
											href="https://github.com/lelarry26"
										>
											<img
												style={{ marginLeft: 2 }}
												width={50}
												src="/Images/GoldGit.png"
												alt="GitHub"
											/>
										</Button>
									</CardActions>
								</Card>
							</Container>
							<Container
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignContent: 'stretch',
								}}
							>
								<Card
									sx={{
										display: 'flex',
										minWidth: 200,
										maxWidth: 300,
										backgroundColor: '#2a353b',
										color: '#c8b874',
										border: 2,
										borderColor: '#c8b874',
									}}
								>
									<CardContent>
										<Typography
											variant="h6"
											color="text.primary"
											sx={{ backgroundColor: '#2a353b', color: '#c8b874' }}
											gutterBottom
										>
											<Avatar
												alt="Derek Szeto"
												src="https://media.licdn.com/dms/image/C4E03AQGRhpryroBqQw/profile-displayphoto-shrink_400_400/0/1551731556984?e=1705536000&v=beta&t=fTHQuRFJ31ndZ0jlYI8bz5Z_fzQm25rYtvl2eULbkIQ"
											></Avatar>
											Derek Szeto
										</Typography>
										<Typography variant="body2">
											Case of the Munchies
											<br />
											Atlanta, GA
										</Typography>
									</CardContent>
									<CardActions
										sx={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<IconButton
											label="LinkedIn"
											onClick={() =>
												window.open(
													'https://www.linkedin.com/in/derek-szeto-876422179/',
													'_blank'
												)
											}
										>
											<LinkedInIcon sx={{ color: 'white', fontSize: '3rem' }} />
										</IconButton>
										<Button
											variant="text"
											size="small"
											href="https://github.com/MidnightMicro"
										>
											<img
												style={{ marginLeft: 2 }}
												width={50}
												src="/Images/GoldGit.png"
												alt="GitHub"
											/>
										</Button>
									</CardActions>
								</Card>
							</Container>
							<Container
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignContent: 'stretch',
								}}
							>
								<Card
									sx={{
										display: 'flex',
										minWidth: 200,
										maxWidth: 300,
										backgroundColor: '#2a353b',
										color: '#c8b874',
										border: 2,
										borderColor: '#c8b874',
									}}
								>
									<CardContent>
										<Typography
											variant="h6"
											color="text.primary"
											sx={{ backgroundColor: '#2a353b', color: '#c8b874' }}
											gutterBottom
										>
											<Avatar
												alt="Brett MacKinnon"
												src="https://ca.slack-edge.com/T0569RDC6-U04URA7Q8E9-d5f989e8d954-48"
											></Avatar>
											Brett MacKinnon
										</Typography>
										<Typography variant="body2">
											Pathfinder Guru
											<br />
											Atlanta, GA
										</Typography>
									</CardContent>
									<CardActions
										sx={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<IconButton
											label="LinkedIn"
											onClick={() =>
												window.open(
													'https://www.linkedin.com/in/brett-mackinnon-19936111a/',
													'_blank'
												)
											}
										>
											<LinkedInIcon sx={{ color: 'white', fontSize: '3rem' }} />
										</IconButton>
										<Button
											variant="text"
											size="small"
											href="https://github.com/JudgeBreaded"
										>
											<img
												style={{ marginLeft: 2 }}
												width={50}
												src="/Images/GoldGit.png"
												alt="GitHub"
												// style={{ filter: "brightness(100) saturate(100%)" }}
											/>
										</Button>
									</CardActions>
								</Card>
							</Container>
							<Container
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignContent: 'stretch',
								}}
							>
								<Card
									sx={{
										display: 'flex',
										minWidth: 200,
										maxWidth: 300,
										backgroundColor: '#2a353b',
										color: '#c8b874',
										border: 2,
										borderColor: '#c8b874',
									}}
								>
									<CardContent>
										<Typography
											variant="h6"
											color="text.primary"
											sx={{ backgroundColor: '#2a353b', color: '#c8b874' }}
											gutterBottom
										>
											<Avatar
												alt="Nicolas Horton"
												src="https://media.licdn.com/dms/image/D5603AQHfiJdd74VAWA/profile-displayphoto-shrink_400_400/0/1694828022884?e=1705536000&v=beta&t=IslYJ0BSSINmlQA8to684ICe6r-U_4TOa46uy4QuljY"
											></Avatar>
											Nicolas Horton
										</Typography>
										<Typography variant="body2">
											Tech Guru
											<br />
											Houston,Texas
										</Typography>
									</CardContent>
									<CardActions
										sx={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<IconButton
											label="LinkedIn"
											onClick={() =>
												window.open(
													'https://www.linkedin.com/in/nicolas-horton/',
													'_blank'
												)
											}
										>
											<LinkedInIcon sx={{ color: 'white', fontSize: '3rem' }} />
										</IconButton>
										<Button
											variant="text"
											size="small"
											href="https://github.com/Nic-Horton"
										>
											<img
												style={{ marginLeft: 2 }}
												width={50}
												src="/Images/GoldGit.png"
												alt="GitHub"
											/>
										</Button>
									</CardActions>
								</Card>
							</Container>
						</Box>
					</div>
				</Collapse>
				{/* </Paper> */}
			</Box>
		</>
	);
}
