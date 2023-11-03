import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Main } from '../Component/Initiative Drawer/Drawer';
import SearchDrawer from '../Component/Initiative Drawer/Drawer';
import { useState } from 'react';

function InitiativeTracker() {
	const [open, setOpen] = useState(true);

	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<SearchDrawer open={open} setOpen={setOpen} />
				<Main open={open}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Paper sx={{ backgroundColor: 'lightblue' }}>Tracker</Paper>
						</Grid>
						<Grid item xs>
							<Paper sx={{ backgroundColor: 'green' }}>Character Details</Paper>
						</Grid>
					</Grid>
				</Main>
			</Box>
		</>
	);
}

export default InitiativeTracker;
