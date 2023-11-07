import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Main } from '../Component/Initiative Drawer/Drawer';
import SearchDrawer from '../Component/Initiative Drawer/Drawer';
import { useState } from 'react';
import InitiativeOrderCard from '../Component/InitiativeOrder/InitiativeOrderCard';
import CombatantCard from '../Component/InititiativeDescription/CombatantCard';

function InitiativeTracker() {
	const [open, setOpen] = useState(true);

	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<SearchDrawer open={open} setOpen={setOpen} />
				<Main open={open}>
					<Grid container spacing={2}>
						<Grid item xs={12} lg>
							<Paper sx={{ backgroundColor: 'lightblue', mb: 1 }}>
								Dropdown selector and Save Tracker session button here
							</Paper>
							<Paper sx={{ backgroundColor: 'lightblue', mb: 1 }}>
								Start/End button and round tracker here
							</Paper>
							<Paper sx={{ backgroundColor: 'lightblue' }}>Tracker cards</Paper>
							<InitiativeOrderCard />
						</Grid>
						<Grid item xs>
							<Paper sx={{ backgroundColor: 'lightgreen' }}>
								Combatant Details
							</Paper>
							<CombatantCard />
						</Grid>
					</Grid>
				</Main>
			</Box>
		</>
	);
}

export default InitiativeTracker;
