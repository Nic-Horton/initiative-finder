import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Main } from '../Component/Initiative Drawer/Drawer';
import SearchDrawer from '../Component/Initiative Drawer/Drawer';
import { useState, useEffect } from 'react';
import InitiativeOrderCard from '../Component/InitiativeOrder/InitiativeOrderCard';
import CombatantCard from '../Component/InititiativeDescription/CombatantCard';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import BattleList from '../Component/InitiativeOrder/BattleList';
import Button from '@mui/material/Button';
import { Auth } from '../Component/Auth';
import Navbar from '../Component/Navbar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Tracker from '../Component/InitiativeOrder/Tracker';
import { db, auth } from '../Config/firebase-config';
import {
	getDocs,
	collection,
	addDoc,
	getDoc,
	deleteDoc,
	doc,
	updateDoc,
	collectionGroup,
	where,
	query,
} from 'firebase/firestore';

function InitiativeTracker() {
	//usestate for user
	const [user, setUser] = useState(null);

	// Checks if user is signed in
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

	if (user === null) {
		return (
			<>
				<div
					style={{
						position: 'relative',
						height: '100vh',
						width: '100%',
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							backgroundImage: `url('https://livingmythrpg.files.wordpress.com/2016/03/fairy-with-dying-warrior-wallpaper-1920x1080.jpg')`,
							height: '100vh',
							width: '100%',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							filter: 'blur(2px)',
							zIndex: -1,
						}}
					></div>
					<div
						style={{
							zIndex: 1,
						}}
					>
						<Navbar />
						<Box
							textAlign="center"
							sx={{
								border: 3,
								borderRadius: 2,
								p: 3,
								m: 'auto',
								width: 700,
								backgroundColor: 'rgba(0,0,0,.5)',
								color: 'white',
							}}
						>
							<Typography sx={{ color: 'Red', marginTop: 10 }} variant="h2">
								Please login and try again
							</Typography>
						</Box>
						<Box sx={{ mt: 20 }} textAlign="center">
							<Button
								sx={{
									fontSize: 25,
									width: 300,
									height: 150,
								}}
								variant="contained"
								component={NavLink}
								color="error"
								to="/Login"
							>
								Click here to go re-roll
							</Button>
						</Box>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Navbar />
			<Toolbar />
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Tracker />
			</Box>
		</>
	);
}

export default InitiativeTracker;
