import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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

                setMonsterList(filteredData)
            } catch (err) {
                console.error(err)
            }
        }
        getMonsterList()
    }, [])


    const [monsterList, setMonsterList] = useState([])
    const [dataSearch, setDataSearch] = useState('')
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <div className='dashboardData'>
                <TextField onChange={(e) => setDataSearch(e.target.value)} label="Filled" variant="filled" sx={{ width: '50%' }} />
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItemButton>
                </List>
                <Divider />
                <List component="nav" aria-label="secondary mailbox folder">
                    {monsterList.map((monster) => (
                        <ListItemButton key={monster.id}>
                            <ListItemText primary={monster.name} />
                            <ListItemText primary={monster.AC} />
                            <ListItemText primary={monster.reflexSave} />
                        </ListItemButton>
                    ))}
                </List>
            </div>
        </>
    )
}
