import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import { db, auth } from '../Config/firebase-config'
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';


export default function MonsterSubmit() {

    const monsterCollectionRef = collection(db, "Monsters")
    const characterCollectionRef = collection(db, "Characters")

    const onSubmitMonster = async () => {
        await addDoc(tabValue === 'Characters' ? characterCollectionRef : monsterCollectionRef ,{
            name: monsterName,
            ac: monsterAC,
            fortitudeSave: monsterFortSave,
            reflexSave: monsterReflexSave,
            willSave: monsterWillSave,
            initiative: monsterInitiative,
            userId: auth?.currentUser?.uid
        }
        )
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const [tabValue, setTabValue] = React.useState('characters');
    const [monsterName, setMonsterName] = useState('')
    const [monsterAC, setMonsterAC] = useState('')
    const [monsterWillSave, setMonsterWillSave] = useState('')
    const [monsterReflexSave, setMonsterReflexSave] = useState('')
    const [monsterFortSave, setMonsterFortSave] = useState('')
    const [monsterInitiative, setMonsterInitiative] = useState('')
    const [monsterDescription, setMonsterDescription] = useState('')



    return (
        <div className='monsterBox'>
            <Grid container spacing={2} columns={15} direction="row">
                <Grid xs={6}></Grid>
                <Grid xs={7}><h3>New Entry</h3></Grid>
                <Grid xs={15} justifyContent="center" >
                    <Tabs value={tabValue} centered onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="Characters" value={'Characters'} />
                        <Tab label="Monsters" value={'Monsters'} />
                    </Tabs>
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={12} justifyContent="center" sx={{ borderRadius: 2 }}>
                    <TextField
                        label="Name" variant="filled"
                        value={monsterName}
                        onChange={(e) => setMonsterName(e.target.value)}
                        sx={{ width: '425px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center' }} />
                </Grid>
                <Grid xs={3} sx={{ borderRadius: 2 }}>
                    <TextField
                        type="number"
                        label="AC" variant="filled"
                        value={monsterAC}
                        onChange={(e) => setMonsterAC(e.target.value)}
                        sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center' }} />
                </Grid>
                <Grid xs={3} sx={{ borderRadius: 2 }}>
                    <TextField
                        type="number"
                        label="Init" variant="filled"
                        value={monsterInitiative}
                        onChange={(e) => setMonsterInitiative(e.target.value)}
                        sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center' }} />
                </Grid>
                <Grid xs={3} sx={{ borderRadius: 2 }}>
                    <TextField
                        type="number"
                        label="Fort" variant="filled"
                        onChange={(e) => setMonsterFortSave(e.target.value)}
                        value={monsterFortSave}
                        sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center' }} />
                </Grid>
                <Grid xs={3} sx={{ borderRadius: 2 }}>
                    <TextField
                        value={monsterWillSave}
                        type='number'
                        label="Will" variant="filled"
                        onChange={(e) => setMonsterWillSave(e.target.value)}
                        sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center' }} />
                </Grid>
                <Grid xs={3} sx={{ borderRadius: 2 }}>
                    <TextField
                        type="number"
                        value={monsterReflexSave}
                        label="Reflex" variant="filled"
                        onChange={(e) => setMonsterReflexSave(e.target.value)}
                        sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center' }} />
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={13}>
                    <TextField
                        type="string"
                        value={monsterDescription}
                        onChange={(e) => setMonsterDescription(e.target.value)}
                        multiline rows={8} label="Description" variant="filled"
                        sx={{ width: "425px", height: "216px", border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2 }} />
                </Grid>
                <Grid xs={3}></Grid>
                <Grid xs={5}>
                    <Button variant="outlined" onClick={() => onSubmitMonster()}>Submit</Button>
                </Grid>
                <Grid xs={5}>
                    <Button variant="outlined">Outlined</Button>
                </Grid>
            </Grid>
        </div>
    )
}