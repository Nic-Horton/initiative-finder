import React from 'react'
import { Grid, ListItemText, Button, ListItemButton  } from '@mui/material'
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp'
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import {
	deleteDoc,
	doc,
} from 'firebase/firestore';
import UpdateModal from './UpdateModal';

function DashResult({unit, handleListItemClick, index, openStates, handleClose, collectionRef, selectedIndex, handleOpen, combatantList, setCombatantList, tabValue,filteredList, setFilteredList}) {

  // const deleteEntry = async (id) => {
	// 	const unitDoc = doc(collectionRef, id);
	// 	await deleteDoc(unitDoc);
	// };

	const deleteEntry = async (id) => {
		if(tabValue==='Characters'){
			const updatedUnits = combatantList.characterList.filter(
				(unit) => unit.id !== id
			);
			const unitDoc = doc(collectionRef, id);
			await deleteDoc(unitDoc);
			setCombatantList({characterList: updatedUnits, monsterList:combatantList.monsterList});
			if(filteredList){
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
			setCombatantList({monsterList: updatedUnits, characterList:combatantList.characterList});
			if(filteredList){
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
										open={openStates[index]} // Use the open state for this list item
										onClose={() => handleClose(index)} // Pass the index to handleClose
										id={unit.id}
										databaseRef={collectionRef}
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
												xs={3}
												sx={{
													color: 'white',
													width: 300,
													backgroundColor: 'blue',
													border: '5px solid rgba(54,69,79,0.5)',
													borderRadius: 2,

													textAlign: 'center',
												}}
											>
												<div sx={{ backgroundColor: 'red' }}>
													AC: {unit.ac}
												</div>
											</Grid>
											<Grid item xs={3}>
												<div sx={{}}>HP {unit.hp}</div>
											</Grid>
											<Grid item xs={3}>
												<div sx={{}}>Reflex Save: {unit.reflexSave}</div>
											</Grid>
											<Grid item xs={3}>
												<div sx={{}}>
													Fortitude Save: {unit.fortitudeSave}
												</div>
											</Grid>
											<Grid item xs={3}>
												<div sx={{}}>Will Save: {unit.willSave}</div>
											</Grid>
										</Grid>
									)}
								</Grid>
   </>
  )
}

export default DashResult