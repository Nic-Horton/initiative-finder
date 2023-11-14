import { Auth } from "../Auth";
import { db, auth } from "../../Config/firebase-config";
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  addDoc,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import AddBattleList from "./AddBattleList";
import DTwentyIcon from "../DTwentyIcon";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: 'rgba(200, 184, 116)', 
    },
    secondary: {
      main: 'rgba(38, 50, 56,0.75)', 
    },
    text: {
      primary: 'rgb(200, 184, 116)', 
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            backgroundColor: 'rgba(38, 50, 56,0.75)',
            color: 'rgb(200, 184, 116)', 
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused fieldset': {
            borderColor: 'rgb(200, 184, 116)', 
          },
        },
      },
    },
  },
});


export default function BattleList({
  onBattleCreated,
  deleteBattle,
  handleMassRoll,
  battleLists,
  handleChangeBattleList,
  battleListTitle,
}) {
  // const user = auth.currentUser;
  // const uid = 'IUrvXT56cFZ8VsU8InD7rriNdN23';
  const uid = auth.currentUser.uid;
  // const battleListRef = collection(db,'Users', uid, 'Battles');
  // const unitsRef = doc(battleListRef, 'ENTER-MONSTER-ID');
  //const [battleListTitle, setBattleListTitle] = useState('');

  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <AddBattleList
            onBattleCreated={onBattleCreated}
            battleLists={battleLists}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl sx={{ 
            display: "flex",
            flexDirection: "row",
            justifyContent: 'center',
            // borderColor: "rgba(200,184,116)",
            // borderRadius: 5,
            // paddingTop:1,
            // paddingBottom:1,
            // border:1
            }}>
            <ThemeProvider theme={customTheme}>
            <TextField
              fullWidth
              select
              labelId="battleList-select-label"
              id="battleList-select"
              value={battleListTitle}
              label="Battle List"
              onChange={handleChangeBattleList}
              variant="filled"
              color="primary"
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "lightblue"
                },
                '& .MuiSelect-icon': {
                  color: 'primary.main'
               }
              }}
              InputLabelProps={{
                sx: {
                  color: 'text.primary',
                },}}
              inputProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                       backgroundColor: 'rgba(255, 50, 56,0.9)'
                    }
                  },
                    MenuListProps: {
                        sx: {
                            backgroundColor: 'rgba(38, 50, 56,0.75)'
                        }
                    }
                }
              }}
            > 
              {battleLists?.map((battle) => {
                return (
                  <MenuItem key={battle.id} value={battle.id}>
                    {battle.title}
                  </MenuItem>
                );
              })}
            </TextField>
            </ThemeProvider>
            <IconButton onClick={handleMassRoll}>
              <DTwentyIcon />
            </IconButton>
            <IconButton onClick={deleteBattle}>
              <DeleteIcon sx={{color:"#D90000"}} />
            </IconButton>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
