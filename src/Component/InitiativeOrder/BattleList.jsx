import { Auth } from '../Auth';
import { db, auth } from '../../Config/firebase-config'
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

export default function BattleList() {
    const battleListRef = collection(db, 'battleList');
    const unitsRef = doc(battleListRef, 'ENTER-MONSTER-ID');
    const [battleListTitle, setBattleListTitle] = useState('');

    const onSubmitBattleList = async () => {
        await addDoc(battleListRef, {
            name: battleListTitle,
            userId: auth?.currentUser?.uid,
        });
    };

    return (
        <div>
            <input
                value={battleListTitle}
                onChange={(e) => setBattleListTitle(e.target.value)}
            />
            <button onClick={onSubmitBattleList}>Submit</button>
        </div>
    );
}




