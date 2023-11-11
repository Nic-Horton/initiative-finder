import { Auth } from './Auth';
import { db, auth } from '../Config/firebase-config';
import { useState, useEffect } from 'react';
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
import BattleList from '../Component/InitiativeOrder/BattleList';
import InitiativeOrderCard from './InitiativeOrder/InitiativeOrderCard';
import InitiativeOrderAccordion from './InitiativeOrder/InitiativeOrderAccordion';

function Crud() {
	const [monsterList, setMonsterList] = useState([]);
	const [monsterName, setMonsterName] = useState('');
	const [monsterAC, setMonsterAC] = useState('');
	const [monsterWillSave, setMonsterWillSave] = useState('');
	const [monsterReflexSave, setMonsterReflexSave] = useState('');
	const [monsterFortSave, setMonsterFortSave] = useState('');
	const [unitTestArray, setUnitTestArray] = useState([]);

	const [updatedMonsterAC, setUpdatedMonsterAC] = useState('');

	const battleListRef = collection(db, 'battleList');
	const unitsRef = doc(battleListRef, 'uJXIauGJluS61wWgwcNm');

	const onSubmitMonster = async () => {
		// Create the new monster object
		const newMonster = {
			name: monsterName,
			AC: monsterAC,
			fortitudeSave: monsterFortSave,
			reflexSave: monsterReflexSave,
			willSave: monsterWillSave,
		};

		// Get the current data from the document
		const unitsData = (await getDoc(unitsRef)).data();

		// Check if the 'units' field exists, or create an empty array if it doesn't
		const unitsArray = unitsData.units || [];

		// Add the new monster data to the array
		unitsArray.push(newMonster);

		// Update the document with the updated array
		await updateDoc(unitsRef, {
			units: unitsArray,
		});
	};

	const monsterCollectionRef = collection(db, 'battleList');
	// const onSubmitMonster = async () => {
	// 	await addDoc(battleListRef, {
	// 		name: monsterName,
	// 		AC: monsterAC,
	// 		fortitudeSave: monsterFortSave,
	// 		reflexSave: monsterReflexSave,
	// 		willSave: monsterWillSave,
	// 		userId: auth?.currentUser?.uid,
	// 	});
	// };

	const deleteMonster = async (id) => {
		const monsterDoc = doc(db, 'Monsters', id);
		await deleteDoc(monsterDoc);
	};

	const updateMonsterAC = async (id) => {
		const monsterDoc = doc(db, 'Monsters', id);
		await updateDoc(monsterDoc, { AC: updatedMonsterAC });
	};
	// useEffect(() => {
	// 	const getMonsterList = async () => {
	// 		try {
	// 			const data = await getDocs(battleListRef);
	// 			const filteredData = data.docs.map((doc) => ({
	// 				...doc.data(),
	// 				id: doc.id,
	// 			}));
	// 			console.log(data)
	// 			setMonsterList(filteredData);
	// 		} catch (err) {
	// 			console.error(err);
	// 		}
	// 	};
	// 	getMonsterList();
	// }, []);

	const [battleListData, setBattleListData] = useState([]); // Initialize state variable for data
	const [unitsData, setUnitsData] = useState([]);
	const [battleListId, setBattleListId] = useState(null);
	const searchTitle = 'test';
	useEffect(() => {
		const fetchUnitsData = async () => {
			try {
				// Reference to the "battleList" collection
				const battleListCollectionRef = collection(db, 'battleList');
				// Create a query to search for documents with a specific title
				const battleListQuery = query(
					battleListCollectionRef,
					where('title', '==', searchTitle)
				);
				// Execute the query to get matching documents
				const battleListQuerySnapshot = await getDocs(battleListQuery);

				// Create an array to store the fetched units data
				const units = [];

				// Loop through each matching document in "battleList" collection
				battleListQuerySnapshot.forEach(async (battleListDoc) => {
					const battleListData = battleListDoc.data();
					// Check if the document has an 'units' field
					if (
						'units' in battleListData &&
						Array.isArray(battleListData.units)
					) {
						units.push({ units: battleListData.units, id: battleListData.id });
					}
				});

				// Set the state variable with the fetched units data
				console.log(units);
				setUnitsData(units);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		// Execute the fetchUnitsData function when the component mounts
		fetchUnitsData();
	}, []);

	const deleteUnit = async (documentId, unitToDelete) => {
		try {
			// Reference to the specific document containing the units
			const battleListDocumentRef = doc(db, 'battleList', documentId);

			// Fetch the current data of the document
			const battleListDocumentSnapshot = await getDoc(battleListDocumentRef);

			if (battleListDocumentSnapshot.exists()) {
				const battleListData = battleListDocumentSnapshot.data();

				// Check if the document has an 'units' field and it's an array
				if ('units' in battleListData && Array.isArray(battleListData.units)) {
					// Remove the unit to delete from the 'units' array
					const updatedUnits = battleListData.units.filter(
						(unit) => unit !== unitToDelete
					);

					// Update the document with the new 'units' array
					await updateDoc(battleListDocumentRef, {
						units: updatedUnits,
					});

					// If you want to update the state to reflect the change, you can call the fetchUnitsData function again
					// fetchUnitsData();
				}
			}
		} catch (error) {
			console.error('Error deleting unit:', error);
		}
	};

	// useEffect(() => {
	// 	const fetchBattleListData = async () => {
	// 		try {
	// 			// Reference to the "battleList" collection
	// 			const battleListCollectionRef = collection(db, 'battleList');

	// 			// Query the "battleList" collection to get all documents
	// 			const battleListQuerySnapshot = await getDocs(battleListCollectionRef);

	// 			// Create an array to store the fetched data
	// 			const data = [];

	// 			// Loop through each document in "battleList" collection
	// 			battleListQuerySnapshot.forEach(async (battleListDoc) => {
	// 				const battleListData = battleListDoc.data();
	// 				data.push(battleListData);
	// 			});
	// 			console.log(data)
	// 			// Set the state variable with the fetched data
	// 			setBattleListData(data);
	// 		} catch (error) {
	// 			console.error('Error fetching data:', error);
	// 		}
	// 	};

	// 	fetchBattleListData(); // The empty dependency array means this effect runs once on component mount
	// }, [])

	return (
		<>
			<div className="App">
				<header className="App-header">
					<BattleList />
					{/* <Auth /> */}
					<div>
						<input
							placeholder="Monster Entry...."
							type="string"
							onChange={(e) => setMonsterName(e.target.value)}
						/>
						<input
							placeholder="AC"
							type="number"
							onChange={(e) => setMonsterAC(Number(e.target.value))}
						/>
						<input
							placeholder="Will Save"
							type="number"
							onChange={(e) => setMonsterWillSave(Number(e.target.value))}
						/>
						<input
							placeholder="Fortitude Save"
							type="number"
							onChange={(e) => setMonsterFortSave(Number(e.target.value))}
						/>
						<input
							placeholder="Reflex Save"
							type="number"
							onChange={(e) => setMonsterReflexSave(Number(e.target.value))}
						/>
						<button onClick={() => onSubmitMonster()}>Submit Monster</button>
					</div>
					{unitsData
								?.flat() // Flatten the nested arrays
								.map((unit, index) => (
							(unit) => {
								return (
									<InitiativeOrderAccordion
										name={unit.name}
										AC={unit.AC}
										fortitudeSave={unit.fortitudeSave}
										willSave={unit.willSave}
										reflexSave={unit.reflexSave}
									/>
								);
							}
							// <>
							// 	<h1>Name: {monster.name}</h1>
							// 	<h3>AC: {monster.AC}</h3>
							// 	<h3>Reflex Save: {monster.reflexSave}</h3>
							// 	<h3>fortitude Save:{monster.fortitudeSave}</h3>
							// 	<h3>Will Save: {monster.willSave}</h3>
							// 	<button onClick={() => deleteMonster(monster.id)}>
							// 		Delete Monster
							// 	</button>
							// 	<input
							// 		placeholder="Adjust AC"
							// 		type="number"
							// 		onChange={(e) => setUpdatedMonsterAC(Number(e.target.value))}
							// 	></input>
							// 	<button onClick={() => updateMonsterAC(monster.id)}>
							// 		Update AC
							// 	</button>
							// </>
						)
					)} 
				</header>
			</div>
		</>
	);
}

export default Crud;
