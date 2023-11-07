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
} from 'firebase/firestore';
import BattleList from '../Component/InitiativeOrder/BattleList';

function Crud() {
	const [monsterList, setMonsterList] = useState([]);
	const [monsterName, setMonsterName] = useState('');
	const [monsterAC, setMonsterAC] = useState('');
	const [monsterWillSave, setMonsterWillSave] = useState('');
	const [monsterReflexSave, setMonsterReflexSave] = useState('');
	const [monsterFortSave, setMonsterFortSave] = useState('');

	const [updatedMonsterAC, setUpdatedMonsterAC] = useState('');

	const battleListRef = collection(db, 'battleList')
	const unitsRef = doc(battleListRef, 'uJXIauGJluS61wWgwcNm')

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
	useEffect(() => {
		const getMonsterList = async () => {
			try {
				const data = await getDocs(battleListRef);
				const filteredData = data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				console.log(data)
				setMonsterList(filteredData);
			} catch (err) {
				console.error(err);
			}
		};
		getMonsterList();
	}, []);

	return (
		<>
			<div className="App">
				<header className="App-header">
					<BattleList/>
					<Auth />
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
					{monsterList.map((monster) => (
						<>
							<h1>Name: {monster.name}</h1>
							<h3>AC: {monster.AC}</h3>
							<h3>Reflex Save: {monster.reflexSave}</h3>
							<h3>fortitude Save:{monster.fortitudeSave}</h3>
							<h3>Will Save: {monster.willSave}</h3>
							<button onClick={() => deleteMonster(monster.id)}>
								Delete Monster
							</button>
							<input
								placeholder="Adjust AC"
								type="number"
								onChange={(e) => setUpdatedMonsterAC(Number(e.target.value))}
							></input>
							<button onClick={() => updateMonsterAC(monster.id)}>
								Update AC
							</button>
						</>
					))}
				</header>
			</div>
		</>
	);
}

export default Crud;
