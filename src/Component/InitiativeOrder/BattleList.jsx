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
import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton'
import AddBattleList from './AddBattleList';



export default function BattleList({onBattleCreated,deleteBattle, battleLists, handleChangeBattleList, battleListTitle }) {
    // const user = auth.currentUser;
    // const uid = 'IUrvXT56cFZ8VsU8InD7rriNdN23';
    const uid = auth.currentUser.uid;
    // const battleListRef = collection(db,'Users', uid, 'Battles');
    // const unitsRef = doc(battleListRef, 'ENTER-MONSTER-ID');
    //const [battleListTitle, setBattleListTitle] = useState('');
      
    return (
        <>
            <Grid container >
            <Grid item xs={12} lg={6}>
                <AddBattleList onBattleCreated={onBattleCreated} battleLists={battleLists}/>
                </Grid>
                <Grid item xs={12} lg={6} >
                
                    <FormControl  sx={{display:'flex', flexDirection:'row'}}>
                        <InputLabel id="battleList-select-label">Battles</InputLabel>
                        <Select
                            labelId="battleList-select-label"
                            id="battleList-select"
                            value={battleListTitle}
                            label="Battle List"
                            onChange={handleChangeBattleList}
                            variant='outlined'
                            fullWidth
                        >
                            {battleLists?.map((battle => {
                                return <MenuItem key={battle.id} value={battle.id}>{battle.title}</MenuItem>
                            }))}

                        </Select>
                        <IconButton><SaveIcon /></IconButton>
                        <IconButton onClick={deleteBattle}><DeleteIcon /></IconButton>
                    </FormControl>        
                </Grid>
            </Grid>
        </>
    );
}




