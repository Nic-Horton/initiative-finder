import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import {
	getDocs,
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
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

export default function DashboardData() {
	const monsterCollectionRef = collection(db, 'Monsters');
	const characterCollectionRef = collection(db, 'Characters');
	const [tabValue, setTabValue] = React.useState('Characters');

	const collectionRef =
		tabValue === 'Monsters' ? monsterCollectionRef : characterCollectionRef;
	useEffect(() => {
		const getInformationList = async () => {
			try {
				const data = await getDocs(collectionRef);
				const filteredData = data.docs
					.map((doc) => ({
						...doc.data(),
						id: doc.id,
					}))
					.filter((doc) => doc.userId === auth.currentUser.uid);
				setMonsterList(filteredData);
			} catch (err) {
				console.error(err);
			}
		};
		getInformationList();
	}, [tabValue]);

	const [monsterList, setMonsterList] = useState([]);
	const [dataSearch, setDataSearch] = useState('');
	const [selectedIndex, setSelectedIndex] = useState(-1);

	const [openStates, setOpenStates] = React.useState([]);

	// Initialize open states for each list item to false
	useEffect(() => {
		setOpenStates(new Array(monsterList.length).fill(false));
	}, [monsterList]);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index === selectedIndex ? -1 : index);
	};

	const handleTabChange = (event, newValue) => {
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

	const deleteEntry = async (id) => {
		const monsterDoc = doc(db, tabValue, id);
		await deleteDoc(monsterDoc);
	};

	return (
		<div className="dashboardData">
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<TextField
					onChange={(e) => setDataSearch(e.target.value)}
					label="Filled"
					variant="filled"
					sx={{ width: '75%' }}
				/>
			</div>
			<Tabs
				value={tabValue}
				centered
				onChange={handleTabChange}
				aria-label="basic tabs example"
			>
				<Tab label="Characters" value={'Characters'} />
				<Tab label="Monsters" value={'Monsters'} />
			</Tabs>
			<Divider />
			<List component="nav" aria-label="secondary mailbox folder">
				<ListSubheader>{tabValue}</ListSubheader>
				{monsterList.map((monster, index) => (
					<div key={monster.id} sx={{ height: '500' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<ListItemButton
								onClick={(event) => handleListItemClick(event, index)}
							>
								<ListItemText primary={monster.name} />
							</ListItemButton>
							<Button
								variant="outlined"
								startIcon={<EditNoteIcon />}
								onClick={() => handleOpen(index)}
							/>
							<Button
								onClick={() => deleteEntry(monster.id)}
								variant="outlined"
								startIcon={<DeleteForeverTwoToneIcon />}
							/>
						</div>
						<UpdateModal
							name={monster.name}
							initiative={monster.initiative}
							ac={monster.ac}
							reflexSave={monster.reflexSave}
							fortitudeSave={monster.fortitudeSave}
							willSave={monster.willSave}
							description={monster.description}
							open={openStates[index]} // Use the open state for this list item
							onClose={() => handleClose(index)} // Pass the index to handleClose
							id={monster.id}
							databaseRef={tabValue}
						/>

						{selectedIndex === index && (
							<Grid container spacing={2}>
								<Grid item xs={3}>
									<div sx={{ backgroundColor: 'white' }}>AC: {monster.ac}</div>
								</Grid>
								<Grid item xs={3}>
									<div sx={{}}>Reflex Save: {monster.reflexSave}</div>
								</Grid>
								<Grid item xs={3}>
									<div sx={{}}>Fortitude Save: {monster.fortitudeSave}</div>
								</Grid>
								<Grid item xs={3}>
									<div sx={{}}>Will Save: {monster.willSave}</div>
								</Grid>
								<Grid item xs={12}>
									<div sx={{}}>description: {monster.description}</div>
								</Grid>
							</Grid>
						)}
					</div>
				))}
			</List>
		</div>
	);
}
