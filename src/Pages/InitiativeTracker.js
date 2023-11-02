import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function InitiativeTracker() {
	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs>
					<Paper sx={{ backgroundColor: 'red', height: '100vh' }}>xs</Paper>
				</Grid>
				<Grid item xs={5}>
					<Paper sx={{ backgroundColor: 'lightblue', height: '100vh' }}>
						xs=6
					</Paper>
				</Grid>
				<Grid item xs>
					<Paper sx={{ backgroundColor: 'green', height: '100vh' }}>xs</Paper>
				</Grid>
			</Grid>
		</>
	);
}

export default InitiativeTracker;
