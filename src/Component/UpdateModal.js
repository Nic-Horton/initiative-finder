import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Divider, Grid, InputLabel } from '@mui/material';
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

export default function UpdateModal({
	name,
	hp,
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
	const [hpValue, setHpValue] = useState(hp);
	const [fortValue, setFortValue] = useState(fortitudeSave);
	const [reflexValue, setReflexValue] = useState(reflexSave);
	const [willValue, setWillValue] = useState(willSave);
	const [descriptionValue, setDescriptionValue] = useState(description);

	const handleInputChange = (setter, value) => {
		// Ensure that the input value is a number
		let numericValue = value.replace(/\D/g, '');
		numericValue = Math.min(Number(numericValue), 200).toString();
		setter(numericValue);
	};

	const updateInformation = async (id) => {
		const monsterDoc = doc(databaseRef, id);
		onClose();
		await updateDoc(monsterDoc, {
			ac: Number(acValue),
			hp: Number(hpValue),
			fortitudeSave: Number(fortValue),
			willSave: Number(willValue),
			reflexSave: Number(reflexValue),
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
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					height: 600,
					backgroundColor: 'rgba(28, 50, 56,0.98)',
					border: '2px solid #c8b874',
					borderRadius: 2,
					boxShadow: 24,
					p: 4,
				}}
			>
				<div>
					<Grid container sx={{ width: 385 }}>
						<Grid item xs>
							<Typography
								variant="h4"
								sx={{
									color: 'white',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								{' '}
								Unit Editor
							</Typography>

							<Divider
								sx={{
									color: 'white',
									'&.MuiDivider-root': {
										'&::before': {
											borderTop: 'thin solid #c8b874',
										},
										'&::after': {
											borderTop: 'thin solid #c8b874',
										},
									},
								}}
							>
								Name
							</Divider>

							<Typography
								variant="h6"
								sx={{
									pl: 2,
									backgroundColor: 'white',
									mt: 1,
									mb: 1,
									borderRadius: 2,
									justifyContent: 'center',
								}}
							>
								{name}
							</Typography>
						</Grid>
					</Grid>

					<Grid container sx={{ width: 385 }}>
						<Grid item xs>
							<Divider
								sx={{
									color: 'white',
									'&.MuiDivider-root': {
										'&::before': {
											borderTop: 'thin solid #c8b874',
										},
										'&::after': {
											borderTop: 'thin solid #c8b874',
										},
									},
								}}
							>
								Stats
							</Divider>
						</Grid>
					</Grid>

					<Grid xs={12} container spacing={1} sx={{}}>
						<Grid
							item
							xs={1}
							sx={{
								color: 'white',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							AC
						</Grid>
						<Grid
							item
							xs={1}
							sx={{
								ml: 6,
								color: 'white',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							HP
						</Grid>
						<Grid
							item
							xs={2}
							sx={{
								ml: 5,
								color: 'white',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							Reflex
						</Grid>
						<Grid
							item
							xs={3}
							sx={{
								ml: 0.5,
								color: 'white',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							Fortitude
						</Grid>
						<Grid
							item
							xs={1}
							sx={{
								ml: -0.5,
								color: 'white',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							Will
						</Grid>
					</Grid>
					<Grid
						container
						xs={12}
						spacing={2}
						sx={{ display: 'flex', justifyContent: 'center' }}
					>
						<Grid item xs>
							<TextField
								variant="outlined"
								type="tel"
								InputProps={{ inputProps: { min: 0, max: 100 } }}
								sx={{
									backgroundColor: 'white',
									'& input': {
										textAlign: 'center',
									},
									borderRadius: 2,
								}}
								value={acValue}
								onInput={(e) => handleInputChange(setAcValue, e.target.value)}
							/>
						</Grid>

						<Grid item xs>
							<TextField
								variant="outlined"
								type="tel"
								InputProps={{ inputProps: { min: 0, max: 100 } }}
								sx={{
									backgroundColor: 'white',
									'& input': {
										textAlign: 'center',
									},
									borderRadius: 2,
								}}
								value={hpValue}
								onChange={(e) => handleInputChange(setHpValue, e.target.value)}
							/>
						</Grid>
						<Grid item xs>
							<TextField
								variant="outlined"
								type="tel"
								InputProps={{ inputProps: { min: 0, max: 100 } }}
								sx={{
									backgroundColor: 'white',
									'& input': {
										textAlign: 'center',
									},
									borderRadius: 2,
								}}
								value={reflexValue}
								onChange={(e) =>
									handleInputChange(setReflexValue, e.target.value)
								}
							/>
						</Grid>
						<Grid item xs>
							<TextField
								variant="outlined"
								type="tel"
								InputProps={{ inputProps: { min: 0, max: 100 } }}
								sx={{
									backgroundColor: 'white',
									'& input': {
										textAlign: 'center',
									},
									borderRadius: 2,
								}}
								value={fortValue}
								onChange={(e) =>
									handleInputChange(setFortValue, e.target.value)
								}
							/>
						</Grid>
						<Grid item xs>
							<TextField
								variant="outlined"
								type="tel"
								InputProps={{ inputProps: { min: 0, max: 100 } }}
								sx={{
									backgroundColor: 'white',
									'& input': {
										textAlign: 'center',
									},
									borderRadius: 2,
								}}
								value={willValue}
								onChange={(e) =>
									handleInputChange(setWillValue, e.target.value)
								}
							/>
						</Grid>
						<Grid item xs={12} sx={{ color: 'white' }}>
							<Divider
								spacing={2}
								sx={{
									color: 'white',
									'&.MuiDivider-root': {
										'&::before': {
											borderTop: 'thin solid #c8b874',
										},
										'&::after': {
											borderTop: 'thin solid #c8b874',
										},
									},
								}}
							>
								Description
							</Divider>
						</Grid>
						<Grid item xs={12}>
							<TextField
								multiline
								rows={8}
								variant="outlined"
								sx={{
									width: '100%',
									backgroundColor: 'white',
									borderRadius: 2,
								}}
								value={descriptionValue}
								onChange={(e) => setDescriptionValue(e.target.value)}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							<Button
								variant="outlined"
								sx={{ backgroundColor: 'white' }}
								onClick={() => updateInformation(id)}
							>
								Update
							</Button>
						</Grid>
					</Grid>
				</div>
			</Box>
		</Modal>
	);
}
