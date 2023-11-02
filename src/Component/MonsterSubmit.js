import React from 'react';
import Container from '@mui/material/Container';
import { ThemeProvider, styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import { db, auth } from '../Config/firebase-config'
import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore'

export default function MonsterSubmit() {
    const MonsterSubmitBox = styled('div')({
        width: 500,
        height: 600,
        borderRadius: 1,
        border: '5px solid rgba(54,69,79,0.5)',
        borderRadius: 10,
        backgroundColor: 'grey',
        marginBottom: 10
    });
    const monsterCollectionRef = collection(db, 'Monsters')
    const onSubmitMonster = async () => {
        await addDoc(monsterCollectionRef, {
            Name: monsterName,
            AC: monsterAC,
            fortitudeSave: monsterFortSave,
            reflexSave: monsterReflexSave,
            willSave: monsterWillSave,
            initiative: monsterInitiative,
            userId: auth?.currentUser?.uid
        }
        )
    }
    const [monsterName, setMonsterName] = useState('')
    const [monsterAC, setMonsterAC] = useState('')
    const [monsterWillSave, setMonsterWillSave] = useState('')
    const [monsterReflexSave, setMonsterReflexSave] = useState('')
    const [monsterFortSave, setMonsterFortSave] = useState('')
    const [monsterInitiative, setMonsterInitiative] =useState('')
    const [monsterDescription, setMonsterDescription] = useState('')

    return (
        <MonsterSubmitBox>
            <h4 sx={{border: "5px solid rgba(54, 69, 79, 0.5)"}}>New Monster</h4>
						<Grid container spacing={2} columns={15}>
							<Grid xs={16} sx={{ borderRadius: 2 }}>
								<TextField id="filled-basic" 
                                key={monsterName}
                                label="Name" variant="filled" 
                                value={monsterName}
                                onChange={(e) => setMonsterName(e.target.value)} 
                                sx={{ width: '350px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center' }} />
							</Grid>
							<Grid xs={3} sx={{ borderRadius: 2 }}>
								<TextField id="filled-basic" 
                                
                                label="AC" variant="filled"
                                value={monsterAC}
                                onChange={(e) => setMonsterAC(Number(e.target.value))}
                                sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center' }} />
							</Grid>
							<Grid xs={3} sx={{ borderRadius: 2 }}>
								<TextField id="filled-basic" 
                                label="Init" variant="filled" 
                                value={monsterInitiative}
                                onChange={(e) => setMonsterInitiative(Number(e.target.value))}
                                sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center' }} />
							</Grid>
							<Grid xs={3} sx={{ borderRadius: 2 }}>
								<TextField id="filled-basic" 
                                type="number"
                                label="Fort" variant="filled" 
                                onChange={(e) => setMonsterFortSave(Number(e.target.value))}
                                value={monsterFortSave}
                                sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center'}} />
							</Grid>
							<Grid xs={3} sx={{ borderRadius: 2 }}>
								<TextField id="filled-basic" 
                                value={monsterWillSave}
                                type='number'
                                label="Will" variant="filled" 
                                onChange={(e) => setMonsterWillSave(Number(e.target.value))}
                                sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center'}} />
							</Grid>
							<Grid xs={3} sx={{ borderRadius: 2 }}>
								<TextField id="filled-basic" 
                                value={monsterReflexSave}
                                label="Reflex" variant="filled" 
                                onChange={(e) => setMonsterReflexSave(Number(e.target.value))}
                                sx={{ width: '75px', border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2, textAlign: 'center'}} />
							</Grid>
							<Grid xs={16}>
								<TextField id="filled-basic"
                                value={monsterDescription}
                                onChange={(e) => setMonsterDescription(e.target.value)}
                                multiline rows={8} label="Description" variant="filled" 
                                sx={{ width: "460px", height: "216px", border: '5px solid rgba(54,69,79,0.5)', borderRadius: 2 }} />
							</Grid>
							<Grid xs={7}>
								<Button variant="outlined" onClick={() => onSubmitMonster()}>Submit</Button>
							</Grid>
							<Grid xs={8}>
								<Button variant="outlined">Outlined</Button>
							</Grid>
						</Grid>
        </MonsterSubmitBox>
    )
}