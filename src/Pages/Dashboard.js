import React from 'react';
import Container from '@mui/material/Container';
import { ThemeProvider, styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import DashboardData from '../Component/DashboardData'
import MonsterSubmit from '../Component/MonsterSubmit'




function Dashboard() {
	return (
		<>
			<ThemeProvider
				theme={{
					spacing: (factor) => `${factor}rem`,
					palette: {

						primary: {
							main: '#007FFF',
							dark: '#0066CC',
						},
					},
				}}
			/> 	<Container sx={{ display: 'flex', flexDirection: 'row' }}>
				<Container>
					<MonsterSubmit />
				</Container>
				<Container>
					<DashboardData/>
				</Container>
			</Container>
		</>
	);
}

export default Dashboard;


