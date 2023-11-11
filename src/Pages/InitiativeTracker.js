import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Main } from '../Component/Initiative Drawer/Drawer';
import SearchDrawer from '../Component/Initiative Drawer/Drawer';
import { useState, useEffect } from 'react';
import InitiativeOrderCard from '../Component/InitiativeOrder/InitiativeOrderCard';
import CombatantCard from '../Component/InititiativeDescription/CombatantCard';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import BattleList from '../Component/InitiativeOrder/BattleList';
import Button from '@mui/material/Button';
import { Auth } from '../Component/Auth';
import { db, auth } from '../Config/firebase-config';
import {
	getDocs,
	collection,
	addDoc,
	getDoc,
	deleteDoc,
	doc,
	updateDoc,
	collectionGroup,
	where,
	query,
} from 'firebase/firestore';

const user = auth.currentUser;
const uid = 'IUrvXT56cFZ8VsU8InD7rriNdN23';
// const uid = user.uid;
const battleListCollectionRef = collection(db, 'Users', uid, 'Battles');

function InitiativeTracker() {
	const [battleListTitle, setBattleListTitle] = useState('');
	const [open, setOpen] = useState(true);
	const [unitsData, setUnitsData] = useState([]);
	// const battleListRef = collection(db, 'battleList');
	const [battleLists, setBattleLists] = useState([]);
	const [selectedArray, setSelectedArray] = useState([]);
	const [selectedUnit, setSelectedUnit] = useState(false);

	//Combatant info that gets passed in when selecting more info on the character
	const [combatantAC, setCombatantAC] = useState(null);
	const [combatantInitiative, setCombatantInitiative] = useState(null);
	const [combatantName, setCombatantName] = useState(null);
	const [combatantHp, setCombatantHp] = useState(null);
	const [combatantReflexSave, setCombatantReflexSave] = useState(null);
	const [combatantFortitudeSave, setCombatantFortitudeSave] = useState(null);
	const [combatantWillSave, setCombatantWillSave] = useState(null);

	// const [activeStep, setActiveStep] = React.useState(0);

	// const handleNext = () => {
	//   setActiveStep((prevActiveStep) => prevActiveStep + 1);
	// };

	// const handleBack = () => {
	//   setActiveStep((prevActiveStep) => prevActiveStep - 1);
	// };

	const handleSelectedCard = (i) => {
		const tempArray = [...selectedArray];
		if (tempArray[i] == i) {
			tempArray[i] = undefined;
		} else {
			tempArray[i] = i;
		}
		console.log(selectedArray);
		setSelectedArray(tempArray);
	};

	// const unitsRef = doc(battleListRef, 'uJXIauGJluS61wWgwcNm')
	useEffect(() => {
		const fetchData = async () => {
			try {
				// const battleListCollectionRef = collection(db, 'battleList');

				// if (battleListTitle) {
				// 	// If a title is provided, execute the query with the title filter
				// 	const battleListQuery = query(battleListCollectionRef, where('title', '==', battleListTitle));
				// 	const battleListQuerySnapshot = await getDocs(battleListQuery);
				// 	setBattleLists(getFormattedData(battleListQuerySnapshot));
				// 	setUnitsData(getUnitsData(battleListQuerySnapshot));
				// } else {
				// If no title is provided, fetch all battle lists
				const battleListQuerySnapshot = await getDocs(battleListCollectionRef);
				setBattleLists(getFormattedData(battleListQuerySnapshot));
				// }
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		// Helper function to format battle list data
		const getFormattedData = (querySnapshot) => {
			const lists = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				lists.push({
					id: doc.id,
					title: data.title,
					// Add other fields as needed
				});
			});
			return lists;
		};

		// Execute the fetchData function when the component mounts
		fetchData();
	}, []);

	//Onchange of selector this will render battlelist units
	const handleChangeBattleList = async (event) => {
		setBattleListTitle(event.target.value);

		const getUnitsData = (querySnapshot) => {
			const units = [];
			querySnapshot.forEach((doc) => {
				const data = { ...doc.data(), id: doc.id };
				units.push(data);
			});
			return units;
		};

		const battleRef = doc(battleListCollectionRef, event.target.value);
		const unitsQuery = query(collection(battleRef, 'Units'));
		const unitDocs = await getDocs(unitsQuery);

		setUnitsData(getUnitsData(unitDocs));
		console.log(getUnitsData(unitDocs));
	};

	//updates battlelists when new battles are created
	const onBattleCreated = async (newBattleList) => {
		setBattleLists(newBattleList);
		// console.log(battleLists);
	};

	//deletes battleLists
	const deleteBattle = async () => {
		const updatedBattles = battleLists.filter(
			(battle) => battle.id !== battleListTitle
		);
		const battleDoc = doc(battleListCollectionRef, battleListTitle);
		await deleteDoc(battleDoc);
		setBattleLists(updatedBattles);
		setBattleListTitle('');
	};

	//Adds units from drawer to battlelist and manipulates state for 'seamless' updating
	const addUnitsToBattle = async (newUnit) => {
		if (!battleListTitle) {
			return alert('Select a Battle');
		}

		const battleUnitsRef = collection(
			battleListCollectionRef,
			battleListTitle,
			'Units'
		);
		try {
			const docRef = await addDoc(battleUnitsRef, newUnit);
			const newUnitsData = [...unitsData, { ...newUnit, id: docRef.id }];
			console.log(newUnitsData);

			setUnitsData(newUnitsData);
		} catch (error) {
			console.error('Error adding document: ', error);
		}
	};

	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<SearchDrawer
					addUnitsToBattle={addUnitsToBattle}
					open={open}
					setOpen={setOpen}
				/>
				<Main open={open}>
					<Grid container spacing={2}>
						<Grid item xs={12} md>
							<Paper sx={{ backgroundColor: 'lightblue', mb: 1 }}>
								<BattleList
									onBattleCreated={onBattleCreated}
									deleteBattle={deleteBattle}
									handleChangeBattleList={handleChangeBattleList}
									battleLists={battleLists}
									setBattleListTitle={setBattleListTitle}
									battleListTitle={battleListTitle}
								/>
							</Paper>
							<Paper sx={{ backgroundColor: 'lightblue', mb: 1 }}>
								{/* <Button onClick={prevCard}>Previous</Button>
								<Button onClick={nextCard}>Next</Button> */}
							</Paper>
							<Box sx={{ backgroundColor: 'lightblue' }}>Tracker cards</Box>

							{unitsData?.map(
								(unit, index) => (
									// unitsList?.map((unit, index) => (
									<InitiativeOrderCard
										key={index}
										name={unit.name}
										ac={unit.AC}
										fortitudeSave={unit.fortitudeSave}
										willSave={unit.willSave}
										reflexSave={unit.reflexSave}
										hp={unit.hp}
										setCombatantInitiative={setCombatantInitiative}
										setCombatantHp={setCombatantHp}
										setCombatantName={setCombatantName}
										setCombatantAC={setCombatantAC}
										setCombatantFortitudeSave={setCombatantFortitudeSave}
										setCombatantReflexSave={setCombatantReflexSave}
										setCombatantWillSave={setCombatantWillSave}
										setSelectedUnit={setSelectedUnit}
										selectedUnit={selectedUnit}
									/>
								)
								// ))
							)}
						</Grid>
						<Grid item xs>
							<Paper sx={{ backgroundColor: 'lightgreen' }}>
								Combatant Details
							</Paper>
							<CombatantCard
								name={combatantName}
								ac={combatantAC}
								hp={combatantHp}
								initiative={combatantInitiative}
								fortitudeSave={combatantFortitudeSave}
								reflexSave={combatantReflexSave}
								willSave={combatantWillSave}
							/>
						</Grid>
					</Grid>
				</Main>
			</Box>
		</>
	);
}

export default InitiativeTracker;
