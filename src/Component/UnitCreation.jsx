import React from 'react'
import DashboardData from './DashboardData'
import MonsterSubmit from './MonsterSubmit'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
	getDocs,
	collection,
} from 'firebase/firestore';
import { db, auth } from '../Config/firebase-config';

function UnitCreation() {

	const uid = auth.currentUser.uid;
	const monsterCollectionRef = collection(db, 'Users', uid, 'Monsters');
	const characterCollectionRef = collection(db, 'Users', uid, 'Characters');
	const [combatantList, setCombatantList] = React.useState([]);

	React.useEffect(() => {
		const getLists = async () => {
			try {
				const monsterData = await getDocs(monsterCollectionRef);
				const characterData = await getDocs(characterCollectionRef);

				const filteredMonsterData = monsterData.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				const filteredCharacterData = characterData.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));

				setCombatantList({
					monsterList: filteredMonsterData,
					characterList: filteredCharacterData,
				});
			} catch (err) {
				console.error(err);
			}
		};
		getLists();
		console.log(uid)
	}, []);

	return (
		<>
			<Container>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'flex-start',
					}}
				>
					<Box>
						<MonsterSubmit combatantList={combatantList} setCombatantList={setCombatantList} />
					</Box>
					<Box sx={{ ml: 5 }}>
						<DashboardData combatantList={combatantList} setCombatantList={setCombatantList} />
					</Box>
				</Box>
			</Container>
		</>
	)
}

export default UnitCreation