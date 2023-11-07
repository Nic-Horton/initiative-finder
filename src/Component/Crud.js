import { Auth } from './Auth';
import { db, auth } from '../Config/firebase-config';
import { useState, useEffect } from 'react';
import {
	getDocs,
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';

function Crud() {
	const [monsterList, setMonsterList] = useState([]);
	const [monsterName, setMonsterName] = useState('');
	const [monsterAC, setMonsterAC] = useState('');
	const [monsterWillSave, setMonsterWillSave] = useState('');
	const [monsterReflexSave, setMonsterReflexSave] = useState('');
	const [monsterFortSave, setMonsterFortSave] = useState('');

	const [updatedMonsterAC, setUpdatedMonsterAC] = useState('');

	const monsterCollectionRef = collection(db, 'Monsters');
	const onSubmitMonster = async () => {
		await addDoc(monsterCollectionRef, {
			name: monsterName,
			AC: monsterAC,
			fortitudeSave: monsterFortSave,
			reflexSave: monsterReflexSave,
			willSave: monsterWillSave,
			userId: auth?.currentUser?.uid,
		});
	};

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
				const data = await getDocs(monsterCollectionRef);
				const filteredData = data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));

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
