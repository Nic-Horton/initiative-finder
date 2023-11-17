import React from 'react'
import { Grid, ListItemText, Button, ListItemButton, Box, Typography } from '@mui/material'
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp'
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import {
	deleteDoc,
	doc,
} from 'firebase/firestore';
import UpdateModal from './UpdateModal';
import ShieldTwoToneIcon from '@mui/icons-material/ShieldTwoTone';

function DashResult({ unit, handleListItemClick, index, openStates, handleClose, collectionRef, selectedIndex, handleOpen, combatantList, setCombatantList, tabValue, filteredList, setFilteredList }) {


	const deleteEntry = async (id) => {
		if (tabValue === 'Characters') {
			const updatedUnits = combatantList.characterList.filter(
				(unit) => unit.id !== id
			);
			const unitDoc = doc(collectionRef, id);
			await deleteDoc(unitDoc);
			setCombatantList({ characterList: updatedUnits, monsterList: combatantList.monsterList });
			if (filteredList) {
				const updatedUnits = filteredList.filter(
					(unit) => unit.id !== id
				);
				setFilteredList(updatedUnits)
			}
		} else {
			const updatedUnits = combatantList.monsterList.filter(
				(unit) => unit.id !== id
			);
			const unitDoc = doc(collectionRef, id);
			await deleteDoc(unitDoc);
			setCombatantList({ monsterList: updatedUnits, characterList: combatantList.characterList });
			if (filteredList) {
				const updatedUnits = filteredList.filter(
					(unit) => unit.id !== id
				);
				setFilteredList(updatedUnits)
			}
		}
	}

	return (
		<>
			<Grid
				key={unit.id}
				sx={{ height: '100', backgroundColor: 'white' }}
			>
				<Grid
					sx={{
						border: 1,
						borderRadius: 1,
						display: 'flex',
						alignItems: 'center',
						color: 'rgba(200,184,116)',
						mb: 1,
						p: 0.5,
					}}
					overflow="auto"
				>
					<ArrowRightSharpIcon sx={{ color: 'red' }} />
					<ListItemButton
						onClick={(event) => handleListItemClick(event, index)}
					>
						<ListItemText
							sx={{ color: 'black' }}
							primary={unit.name}
						/>
					</ListItemButton>
					<Button
						variant="outlined"
						startIcon={<EditNoteIcon />}
						onClick={() => handleOpen(index)}
					/>
					<Button
						variant="outlined"
						startIcon={<DeleteForeverTwoToneIcon />}
						onClick={() => deleteEntry(unit.id)}
					/>
				</Grid>
				<UpdateModal
					name={unit.name}
					initiative={unit.initiative}
					ac={unit.ac}
					hp={unit.hp}
					reflexSave={unit.reflexSave}
					fortitudeSave={unit.fortitudeSave}
					willSave={unit.willSave}
					description={unit.description}
					open={openStates[index]} 
					onClose={() => handleClose(index)} 
					id={unit.id}
					databaseRef={collectionRef}
					portrait={unit.portrait}
				/>

				{selectedIndex === index && (
					<Grid
						container
						spacing={0}
						sx={{
							flexDirection: 'row',
							color: 'white',
							width: '100%',
							mt: -1,
							height: 70,
							background:
								'linear-gradient(to top, darkblue, rgba(2, 78, 165))',
							border: '5px solid rgba(217,212,215)',
							borderRadius: 2,

							textAlign: 'center',
						}}
					>
						<Grid
							item
						>

							<div sx={{ backgroundColor: 'red' }}>

								<Grid container sx={{ mt: 1.5, }} >
									<Grid item >
										<Typography sx={{ fontSize: 15, mt: -1.6, ml: 2, }}>
											AC
										</Typography>
									</Grid>
									<ShieldTwoToneIcon sx={{ position: 'absolute', fontSize: 50 }} />
									<Typography sx={{ mt: 1.5, mr: .5, ml: -2.5, }}>{unit.ac}</Typography>
								</Grid>
							</div>
						</Grid>

						<Grid item xs>
							<div sx={{}}>HP: <br></br> {unit.hp}</div>
						</Grid>
						<Grid item xs>
							<div sx={{}}>RS: <br></br>  {unit.reflexSave}</div>
						</Grid>
						<Grid item xs>
							<div sx={{}}>
								FS:  <br></br> {unit.fortitudeSave}
							</div>
						</Grid>
						<Grid item xs>
							<div sx={{}}>WS:  <br></br> {unit.willSave}</div>
						</Grid>
					</Grid>
				)}
			</Grid>
		</>
	)
}

export default DashResult