import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import { db, auth } from "../../Config/firebase-config";
import { collection, addDoc, doc } from "firebase/firestore";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: 'rgba(200, 184, 116)', 
    },
    secondary: {
      main: 'rgba(200, 184, 116)', 
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

function AddBattleList({ onBattleCreated, battleLists }) {
  const uid = auth.currentUser.uid;
  const battleListRef = collection(db, "Users", uid, "Battles");

  const [newTitle, setNewTitle] = React.useState("");

  const onHandleAddBattle = async (title) => {
    if (title.trim() === "") {
      alert("Input is blank. Try Again.");
      return;
    }

    try {
      const docRef = await addDoc(battleListRef, { title: title, rounds: 0 });
      const newBattleList = [...battleLists, { id: docRef.id, title: title }];

      onBattleCreated(newBattleList);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    alert("Battle Created!");
    setNewTitle("");
  };

  const handleChange = (event) => {
    setNewTitle(event.target.value);
  };

  return (
    <>
      <Box component={"form"}
      sx={{
        
      }}>
        <ThemeProvider theme={customTheme}>
        <TextField
          label="Create Battle"
          required
          type="text"
          variant="filled"
          value={newTitle}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            sx: {
              color:(theme) => theme.palette.text.primary
            },}}
          InputProps={{
            sx:{p:0},
            endAdornment: (
              <IconButton onClick={() => onHandleAddBattle(newTitle)}>
                <AddCircleOutlineOutlinedIcon sx={{fontSize:'larger',color:'rgba(200,184,116)'}}/>
              </IconButton>
            ),
          }}
          sx={{
            backgroundColor:"rgba(54,69,79,0.5)",
          }}
        />
        </ThemeProvider>
      </Box>
    </>
  );
}

export default AddBattleList;
