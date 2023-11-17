import * as React from 'react';
import List from '@mui/material/List';

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import {
	collection,

} from 'firebase/firestore';
import { Auth } from './Auth';
import { db, auth } from '../Config/firebase-config';
import UpdateModal from './UpdateModal';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Box, InputLabel, Paper, Typography } from '@mui/material';
import ShieldTwoToneIcon from '@mui/icons-material/ShieldTwoTone';
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp';
import DashResult from './DashResult';
import CircularProgress from '@mui/material/CircularProgress';

export default function DashboardData({ combatantList, setCombatantList }) {
	const uid = auth.currentUser.uid;
	const monsterCollectionRef = collection(db, 'Users', uid, 'Monsters');
	const characterCollectionRef = collection(db, 'Users', uid, 'Characters');
	const [tabValue, setTabValue] = React.useState('Characters');
	const [dataSearch, setDataSearch] = useState('');
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [openStates, setOpenStates] = React.useState([]);
	const [filteredList, setFilteredList] = useState([]);
	
	const collectionRef =
		tabValue === 'Monsters' ? monsterCollectionRef : characterCollectionRef;


	// Initialize open states for each list item to false
	useEffect(() => {
		setOpenStates(new Array(combatantList?.characterList?.length).fill(false));
	}, [combatantList.characterList]);

	useEffect(() => {
		setOpenStates(new Array(combatantList?.monsterList?.length).fill(false));
	}, [combatantList.monsterList]);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index === selectedIndex ? -1 : index);
	};

	const handleTabChange = (event, newValue) => {
		setDataSearch('');
		setTabValue(newValue);
	};
	// Set the corresponding open state to true for the clicked item
	const handleOpen = (index) => {
		const updatedOpenStates = [...openStates];
		updatedOpenStates[index] = true;
		setOpenStates(updatedOpenStates);
	};

	// Set the corresponding open state to false for the clicked item
	const handleClose = (index) => {
		const updatedOpenStates = [...openStates];
		updatedOpenStates[index] = false;
		setOpenStates(updatedOpenStates);
	};


	const handleSearchChange = (e) => {
		setDataSearch(e.target.value.toLowerCase());
		if (tabValue === 'Characters') {
			const filteredResult = combatantList?.characterList?.filter(
				(character) => {
					if (
						character.name.toLowerCase().includes(e.target.value.toLowerCase())
					) {
						return true;
					}
					return false;
				}
			);
			setFilteredList(filteredResult);
		} else {
			const filteredResult = combatantList?.monsterList?.filter((monster) => {
				if (monster.name.toLowerCase().includes(e.target.value.toLowerCase())) {
					return true;
				}
				return false;
			});
			setFilteredList(filteredResult);
		}
	};

	const renderCards = () => {
		if (tabValue === 'Characters') {
			const characterList = combatantList?.characterList;
			if (!characterList) {
				return (
					<Box width="100%" sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress
							sx={{ color: 'rgba(200,184,116)' }}
							variant="indeterminate"
							size={50}
							thickness={4}
							value={100}
						/>
					</Box>
				);
			}
			if (characterList.length === 0) {
				return (
					<ListItem>
						<ListItemText primary="No Characters created" />
					</ListItem>
				);
			}
			return characterList
				.sort((a, b) =>
					a.name.toLowerCase().localeCompare(b.name.toLowerCase())
				)
				.map((character, index) => (
					<DashResult
						unit={character}
						handleListItemClick={handleListItemClick}
						index={index}
						openStates={openStates}
						handleClose={handleClose}
						collectionRef={collectionRef}
						selectedIndex={selectedIndex}
						handleOpen={handleOpen}
						combatantList={combatantList}
						setCombatantList={setCombatantList}
						tabValue={tabValue}
					/>
				));
		} else {
			const monsterList = combatantList?.monsterList;
			if (!monsterList) {
				return (
					<Box width="100%" sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress
							sx={{ color: 'rgba(200,184,116)' }}
							variant="indeterminate"
							size={50}
							thickness={4}
							value={100}
						/>
					</Box>
				);
			}
			if (monsterList.length === 0) {
				return (
					<ListItem>
						<ListItemText primary="No Characters created" />
					</ListItem>
				);
			}
			return monsterList
				.sort((a, b) =>
					a.name.toLowerCase().localeCompare(b.name.toLowerCase())
				)
				.map((monster, index) => (
					<DashResult
						unit={monster}
						handleListItemClick={handleListItemClick}
						index={index}
						openStates={openStates}
						handleClose={handleClose}
						collectionRef={collectionRef}
						selectedIndex={selectedIndex}
						handleOpen={handleOpen}
						combatantList={combatantList}
						setCombatantList={setCombatantList}
						tabValue={tabValue}
					/>
				));
		}
	};

	const renderSearchedCards = () => {
		if (filteredList.length > 0) {
			return filteredList
				.sort((a, b) =>
					a.name.toLowerCase().localeCompare(b.name.toLowerCase())
				)
				.map((combatant, index) => (
					<DashResult
						unit={combatant}
						handleListItemClick={handleListItemClick}
						index={index}
						openStates={openStates}
						handleClose={handleClose}
						collectionRef={collectionRef}
						selectedIndex={selectedIndex}
						handleOpen={handleOpen}
						combatantList={combatantList}
						setCombatantList={setCombatantList}
						tabValue={tabValue}
						filteredList={filteredList}
						setFilteredList={setFilteredList}
					/>
				));
		} else {
			return (
				<ListItem>
					<ListItemText primary="Nothing found" />
				</ListItem>
			);
		}
	};

	return (
		<>
			<Paper
				sx={{
					width: 400,
					height: 700,
					border: 5,
					backgroundColor: 'rgba(38, 50, 56,0.75)',
					borderColor: 'rgba(200,184,116)',
					borderRadius: 10,
					mb: 10,
					mt: 20,
				}}
				elevation={20}
			>
				<Grid
					sx={{ color: 'white', p: 2, m: 'auto' }}
					container
					spacing={3}
					columns={16}
					justifyContent="center"
				>
					<Grid xs={16} justifyContent="center">
						<Typography
							align="center"
							variant="h4"
							sx={{ textAlign: 'center' }}
						>
							Character List
						</Typography>
					</Grid>
				</Grid>

				<Grid container sx={{ justifyContent: 'center' }}>
					<Tabs
						sx={{
							backgroundColor: 'white',
							border: 1,
							borderRadius: 3,
							width: 350,
							mt: 3,
						}}
						textColor="primary"
						indicatorColor="success"
						value={tabValue}
						variant="fullWidth"
						onChange={handleTabChange}
					>
						<Tab
							label="Characters"
							value={'Characters'}
							sx={{
								'&.Mui-selected': {
									backgroundColor: 'rgba(23,118,185) ',
									color: 'white',
								},
							}}
						/>
						<Tab
							label="Monsters"
							value={'Monsters'}
							sx={{
								'&.Mui-selected': {
									backgroundColor: 'rgba(212,18,18)',
									color: 'white',
								},
							}}
						/>
					</Tabs>
				</Grid>

				<Grid
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						borderRadius: 2,
					}}
				>
					<TextField
						onChange={(e) => handleSearchChange(e)}
						variant="outlined"
						value={dataSearch ? dataSearch : ''}
						type="search"
						size="small"
						placeholder="Filter character/monster by Name"
						sx={{
							color: 'white',
							width: 300,
							backgroundColor: 'white',
							border: '5px solid rgba(54,69,79,0.5)',
							borderRadius: 2,
							textAlign: 'center',
						}}
					/>
				</Grid>
				<Typography
					variant="h4"
					sx={{
						display: 'flex',
						justifyContent: 'center',
						color: 'black',
						backgroundColor: 'white',
						border: '5px solid rgba(54,69,79,0.5)',
					}}
				>
					{tabValue}
				</Typography>
				<List
					component="nav"
					aria-label="secondary mailbox folder"
					sx={{
						color: 'black',
						maxWidth: 350,
						width: '100%',
						backgroundColor: 'white',
						border: '5px solid rgba(54,69,79,0.5)',
						borderRadius: 2,
						display: 'flex',
						flexDirection: 'column',
						maxHeight: 350,
						ml: 0.5,
						height: '100%',
						mt: 2,
						p: 2,
						overflow: 'auto',
					}}
				>
					{!dataSearch ? renderCards() : renderSearchedCards()}
				</List>
			</Paper>
		</>
	);
}
