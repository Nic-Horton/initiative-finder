import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader'
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { Auth } from './Auth';
import { db, auth } from '../Config/firebase-config'

export default function DashboardData() {

    const monsterCollectionRef = collection(db, 'Monsters')

    useEffect(() => {
        const getMonsterList = async () => {
            try {
                const data = await getDocs(monsterCollectionRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                .filter((doc) => doc.userId === auth.currentUser.uid)
                setMonsterList(filteredData)
            } catch (err) {
                console.error(err)
            }
        }
        getMonsterList()
    }, [])


    const [monsterList, setMonsterList] = useState([])
    const [dataSearch, setDataSearch] = useState('')

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index === selectedIndex ? -1 : index);
    };

    return (
        <div className='dashboardData'>
            <TextField onChange={(e) => setDataSearch(e.target.value)} label="Filled" variant="filled" sx={{ width: '75%' }} />
            <Divider />
            <List component="nav" aria-label="secondary mailbox folder">
            <ListSubheader>{`Monsters`}</ListSubheader>
                {monsterList.map((monster, index) => (
                    <React.Fragment key={monster.id}>
                        <ListItemButton onClick={(event) => handleListItemClick(event, index)}>
                            <ListItemText primary={monster.name} />
                        </ListItemButton>
                        {selectedIndex === index && (
                            <div>
                                <p>AC: {monster.AC}</p>
                                <p>Reflex Save: {monster.reflexSave}</p>
                                <p>Fortitude Save: {monster.fortitudeSave}</p>
                                <p>Will Save: {monster.willSave}</p>
                                <p>description: {monster.description}</p>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
}


