import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Main } from '../Initiative Drawer/Drawer';
import SearchDrawer from '../Initiative Drawer/Drawer';
import { useState, useEffect } from 'react';
import InitiativeOrderCard from './InitiativeOrderCard';
import CombatantCard from '../InititiativeDescription/CombatantCard';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import BattleList from './BattleList';
import Button from '@mui/material/Button';
import { Auth } from '../Auth';
import { db, auth } from '../../Config/firebase-config';
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

function Tracker() {
	const uid = auth.currentUser.uid;
	const battleListCollectionRef = collection(db, 'Users', uid, 'Battles');
	const [open, setOpen] = useState(true);
	const [battleListTitle, setBattleListTitle] = useState('');
	const [unitsData, setUnitsData] = useState([]);
	// const battleListRef = collection(db, 'battleList');
	const [battleLists, setBattleLists] = useState([]);
	const [selectedArray, setSelectedArray] = useState([]);
	const [selectedUnit, setSelectedUnit] = useState(false);
	const [childRolledInitiative, setChildRolledInitiative] = useState(0);

	//Combatant info that gets passed in when selecting more info on the character
	const [combatantAC, setCombatantAC] = useState(null);
	const [combatantInitiative, setCombatantInitiative] = useState(null);
	const [combatantName, setCombatantName] = useState(null);
	const [combatantHp, setCombatantHp] = useState(null);
	const [combatantReflexSave, setCombatantReflexSave] = useState(null);
	const [combatantFortitudeSave, setCombatantFortitudeSave] = useState(null);
	const [combatantWillSave, setCombatantWillSave] = useState(null);
	const [combatantPortrait, setCombatantPortrait] = useState(null)

	// const [activeStep, setActiveStep] = React.useState(0);

	// const handleNext = () => {
	//   setActiveStep((prevActiveStep) => prevActiveStep + 1);
	// };

	// const handleBack = () => {
	//   setActiveStep((prevActiveStep) => prevActiveStep - 1);
	// };


	//Fetches Battles list for select TextField
	useEffect(() => {
		const fetchData = async () => {
			try {
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

	// const [rolledInitiative, setRolledInitiative] = useState(0);

	const onRolledInitiativeChange = (value) => {
		setChildRolledInitiative(value)
		console.log("child" + childRolledInitiative)
	}

	const renderCards = () => {
		if (unitsData) {
			return unitsData
				.sort((a, b) => b.initiativeRoll - a.initiativeRoll)
				.map((unit, index) => (
					<InitiativeOrderCard
						key={index}
						name={unit.name}
						ac={unit.ac}
						fortitudeSave={unit.fortitudeSave}
						willSave={unit.willSave}
						reflexSave={unit.reflexSave}
						portrait={unit.portrait}
						hp={unit.hp}
						id={unit.id}
						initiative={unit.initiative}
						initiativeRoll={unit.initiativeRoll}
						isSelected={selectedCardIndex === index}
						handleSelectedCard={() => setSelectedCardIndex(index)}
						handleRolledInitiative={handleRolledInitiative}
						onRolledInitiativeChange={onRolledInitiativeChange}
						setCombatantInitiative={setCombatantInitiative}
						setCombatantHp={setCombatantHp}
						setCombatantName={setCombatantName}
						setCombatantAC={setCombatantAC}
						setCombatantFortitudeSave={setCombatantFortitudeSave}
						setCombatantReflexSave={setCombatantReflexSave}
						setCombatantWillSave={setCombatantWillSave}
						setSelectedUnit={setSelectedUnit}
						setCombatantPortrait={setCombatantPortrait}
						selectedUnit={selectedUnit}
					/>
				));
		}
	};
	const characterPortrait = "https://storage.prompt-hunt.workers.dev/clf2eooxi000bl108ctdeygbf_1"
	const handleRolledInitiative = (id,initiative) => {
		const finalValue = roll20SidedDieWithModifier(initiative);
		console.log("final" + finalValue)
		// onRolledInitiativeChange(finalValue)
		// setRolledInitiative(finalValue);
		const index = unitsData.findIndex(u => u.id === id)
		if (index != -1) {
			const updatedUnits = [...unitsData];
			updatedUnits[index] = { ...updatedUnits[index], initiativeRoll: finalValue }
			setUnitsData(updatedUnits)
		}
	};

	function roll20SidedDieWithModifier(modifier) {
		const rollResult = Math.floor(Math.random() * 20) + 1;


		const finalResult = rollResult + modifier;
		return finalResult;
	}
	const [selectedCardIndex, setSelectedCardIndex] = useState(null);

	const selectNextCard = () => {
		if (unitsData.length === 0) return; 
	
		let newIndex = selectedCardIndex === null ? 0 : selectedCardIndex + 1;
	
		
		if (newIndex >= unitsData.length) {
		  newIndex = 0;
		}
	
		setSelectedCardIndex(newIndex);
		console.log(selectedCardIndex)
	  };
	
	const handleSelectedCard = (cardIndex) => {
		
	}

	return (
		<>
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

						<Button onClick={selectNextCard}>Select Next Card</Button>
						</Paper>
						<Box sx={{ backgroundColor: 'lightblue' }}>Tracker cards</Box>
						{renderCards()}
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
							portrait={combatantPortrait}
						/>
					</Grid>
         </Grid>
         </Main>
		</>
	);
}

export default Tracker;
