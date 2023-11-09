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


export default function BattleList({ battleLists, handleChangeBattleList, setBattleListTitle, battleListTitle }) {
    const battleListRef = collection(db, 'battleList');
    const unitsRef = doc(battleListRef, 'ENTER-MONSTER-ID');
    //const [battleListTitle, setBattleListTitle] = useState('');

    const onSubmitBattleList = async () => {
        await addDoc(battleListRef, {
            name: battleListTitle,
            userId: auth?.currentUser?.uid,
        });
    };

    return (
        <>
            <Grid container >
                <Grid item xs={12}  sx={{display:'flex'}}>
                    <FormControl fullWidth>
                        <InputLabel id="battleList-select-label">Select BattleList</InputLabel>
                        <Select
                            labelId="battleList-select-label"
                            id="battleList-select"
                            value={battleListTitle}
                            label="Battle List"
                            onChange={handleChangeBattleList}
                        >
                            {battleLists.map((battle => {
                                return <MenuItem value={battle.title}>{battle.title}</MenuItem>
                            }))}

                        </Select>
                    </FormControl>
                    {/* <Stack direction="row" spacing={1} height={'100%'} > */}
                        <Button variant="contained" size='large' startIcon={<SaveIcon />}>
                            Save
                        </Button>
                        <Button variant="outlined" size='large' startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    {/* </Stack> */}
                </Grid>
            </Grid>
        </>
    );
}




