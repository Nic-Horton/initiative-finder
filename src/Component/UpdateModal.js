import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import {
	getDocs,
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';
import { db, auth } from '../Config/firebase-config';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	height: 500,
	bgcolor: 'grey',
	border: '2px solid #000',
	borderRadius: 3,
	boxShadow: 24,
	p: 4,
};

export default function UpdateModal({
	name,
	ac,
	reflexSave,
	fortitudeSave,
	willSave,
	description,
	open,
	onClose,
	id,
	databaseRef,
	initiative,
}) {
	const [acValue, setAcValue] = useState(ac);
	const [fortValue, setFortValue] = useState(fortitudeSave);
	const [reflexValue, setReflexValue] = useState(reflexSave);
	const [initiativeValue, setInitiaveValue] = useState(initiative);
	const [willValue, setWillValue] = useState(willSave);
	const [descriptionValue, setDescriptionValue] = useState(description);

	const updateInformation = async (id) => {
		const monsterDoc = doc(databaseRef, id);
		await updateDoc(monsterDoc, {
			ac: acValue,
			fortitudeSave: fortValue,
			willSave: willValue,
			reflexSave: reflexValue,
			description: descriptionValue,
		});
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<div>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography
								variant="h6"
								component="h2"
								sx={{
									backgroundColor: 'white',
									borderRadius: 2,
									textAlign: 'center',
								}}
							>
								<h3>{name}</h3>
							</Typography>
						</Grid>
						<Grid
							item
							xs={3}
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							AC
						</Grid>
						<Grid
							item
							xs={3}
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							Reflex
						</Grid>
						<Grid
							item
							xs={3}
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							Fortitude
						</Grid>
						<Grid
							item
							xs={3}
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							Will
						</Grid>
						<Grid item xs={3}>
							<TextField
								variant="standard"
								sx={{
									backgroundColor: 'white',
									'& input': {
										textAlign: 'center',
									},
									borderRadius: 2,
								}}
								value={acValue}
								onChange={(e) => setAcValue(e.target.value)}
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								variant="standard"
								sx={{
									backgroundColor: 'white',
									'& input': {
										textAlign: 'center',
									},
									borderRadius: 2,
								}}
								value={reflexValue}
								onChange={(e) => setReflexValue(e.target.value)}
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								variant="standard"
								sx={{
									backgroundColor: 'white',
									'& input': {
										textAlign: 'center',
									},
									borderRadius: 2,
								}}
								value={fortValue}
								onChange={(e) => setFortValue(e.target.value)}
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								variant="standard"
								sx={{
									backgroundColor: 'white',
									'& input': {
										textAlign: 'center',
									},
									borderRadius: 2,
								}}
								value={willValue}
								onChange={(e) => setWillValue(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							Description
						</Grid>
						<Grid item xs={12}>
							<TextField
								multiline
								rows={8}
								variant="standard"
								sx={{
									width: '100%',
									backgroundColor: 'white',
									borderRadius: 2,
								}}
								value={descriptionValue}
								onChange={(e) => setDescriptionValue(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button variant="outlined" onClick={() => updateInformation(id)}>
								Update
							</Button>
						</Grid>
					</Grid>
				</div>
			</Box>
		</Modal>
	);
}
