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
        backgroundColor: "rgba(38, 50, 56,0.75)",
        borderColor: "rgba(200,184,116)",
        borderRadius: 2,
        border:1,
        paddingTop:1,
        paddingBottom:1
      }}>
        <TextField
          label="Create Battle"
          required
          type="text"
          variant="filled"
          value={newTitle}
          onChange={handleChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => onHandleAddBattle(newTitle)}>
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            ),
          }}
          sx={{
            backgroundColor:"white",
            width: "82%",
            alignItems:"center",
            ml:4,
            borderRadius: 1
          }}
        />
      </Box>
    </>
  );
}

export default AddBattleList;
