import React from 'react';
import DashboardData from '../Component/DashboardData';
import MonsterSubmit from '../Component/MonsterSubmit';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

function Dashboard() {
	return (
		<>
			<Box
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			>
				<CssBaseline />
				<MonsterSubmit />
				<DashboardData />
			</Box>
		</>
	);
}

export default Dashboard;
