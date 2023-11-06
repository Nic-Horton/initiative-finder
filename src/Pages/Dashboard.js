import React from 'react';
import Container from '@mui/material/Container';
import { ThemeProvider, styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import DashboardData from '../Component/DashboardData'
import MonsterSubmit from '../Component/MonsterSubmit'

const EntryBox = styled('div')({
	width: 500,
	height: 600,
	borderRadius: 1,
	border: '5px solid rgba(54,69,79,0.5)',
	borderRadius: 10,
	backgroundColor: 'grey',
	marginBottom: 10
});

const DataBox = styled('Paper')({
	width: 1600,
	height: 1210,
	backgroundColor: 'grey',
	borderRadius: 10,
	border: '5px solid rgba(54,69,79,0.5)',
})

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
					<EntryBox>
						<h4 sx={{border: "5px solid rgba(54, 69, 79, 0.5)"}}>New Character</h4>
						<Grid container spacing={2} columns={15}>
							<Grid xs={16} sx={{ borderRadius: 2 }}>
								<TextField id="filled-basic" label="Name" variant="filled" sx={{ width: '350px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center' }} />
							</Grid>
							<Grid xs={3} sx={{ borderRadius: 2 }}>
								<TextField id="filled-basic" label="AC" variant="filled" sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center' }} />
							</Grid>
							<Grid xs={3} sx={{ borderRadius: 2 }}>
								<TextField id="filled-basic" label="Init" variant="filled" sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center' }} />
							</Grid>
							<Grid xs={3} sx={{ borderRadius: 2 }}>
								<TextField id="filled-basic" label="Fort" variant="filled" sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center'}} />
							</Grid>
							<Grid xs={3} sx={{ borderRadius: 2 }}>
								<TextField id="filled-basic" label="Will" variant="filled" sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center'}} />
							</Grid>
							<Grid xs={3} sx={{ borderRadius: 2 }}>
								<TextField id="filled-basic" label="Reflex" variant="filled" sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center'}} />
							</Grid>
							<Grid xs={16}>
								<TextField id="filled-basic" multiline rows={8} label="Description" variant="filled" sx={{ width: "460px", height: "216px", border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2 }} />
							</Grid>
							<Grid xs={7}>
								<Button variant="outlined">Submit</Button>
							</Grid>
							<Grid xs={8}>
								<Button variant="outlined">Outlined</Button>
							</Grid>
						</Grid>

					</EntryBox>
					<MonsterSubmit key="monsterSubmit"/>
				</Container>
				<DashboardData/>
			</Container>
		</>
	);
}

export default Dashboard;


