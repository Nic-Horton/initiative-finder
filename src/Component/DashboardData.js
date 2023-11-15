import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Auth } from "./Auth";
import { db, auth } from "../Config/firebase-config";
import UpdateModal from "./UpdateModal";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Box, InputLabel, Paper, Typography } from "@mui/material";
import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp';


export default function DashboardData() {
  const uid = auth.currentUser.uid;
  const monsterCollectionRef = collection(db, "Users", uid, "Monsters");
  const characterCollectionRef = collection(db, "Users", uid, "Characters");
  const [tabValue, setTabValue] = React.useState("Characters");

  const [combatantList, setCombatantList] = useState([]);
  const [dataSearch, setDataSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [openStates, setOpenStates] = React.useState([]);

  const [filteredList, setFilteredList] = useState([]);

  const collectionRef =
    tabValue === "Monsters" ? monsterCollectionRef : characterCollectionRef;
  useEffect(() => {
    const getInformationList = async () => {
      try {
        const data = await getDocs(collectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // .filter((doc) => doc.userId === auth.currentUser.uid);
        setCombatantList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getInformationList();
  }, [tabValue]);

  // Initialize open states for each list item to false
  useEffect(() => {
    setOpenStates(new Array(combatantList.length).fill(false));
  }, [combatantList]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index === selectedIndex ? -1 : index);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  // Set the corresponding open state to true for the clicked item
  const handleOpen = (index) => {
    const updatedOpenStates = [...openStates];
    updatedOpenStates[index] = true;
    setOpenStates(updatedOpenStates);
  };

  // Set the corresponding open state to false for the clicked item
  const handleClose = (index) => {
    const updatedOpenStates = [...openStates];
    updatedOpenStates[index] = false;
    setOpenStates(updatedOpenStates);
  };

  const deleteEntry = async (id) => {
    const monsterDoc = doc(collectionRef, id);
    await deleteDoc(monsterDoc);
  };

  const handleSearchChange = (e) => {
    setDataSearch(e.target.value.toLowerCase());
    const filteredResult = combatantList?.filter((combatant) => {
      if (combatant.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true;
      }
      return false;
    });
    setFilteredList(filteredResult);
  };

  console.log(dataSearch);
  return (
    <>
      <Paper
        sx={{
          width: 400,
          height: 700,
          border: 5,
          backgroundColor: "rgba(38, 50, 56,0.75)",
          borderColor: "rgba(200,184,116)",
          borderRadius: 10,
          mb: 10,
          mt: 20,
        }}
        elevation={20}
      >
        <Grid
          sx={{ color: "white", p: 2, m: "auto" }}
          container
          spacing={3}
          columns={16}
          justifyContent="center"
        >
          <Grid xs={16} justifyContent="center">
            <Typography
              align="center"
              variant="h4"
              sx={{ textAlign: "center" }}
            >
              Character List
            </Typography>
          </Grid>
        </Grid>

        <Grid container sx={{ justifyContent: "center" }}>
          <Tabs
            sx={{
              backgroundColor: "white",
              border: 1,
              borderRadius: 3,
              width: 350,
              mt: 3,
            }}
            textColor="primary"
            indicatorColor="success"
            value={tabValue}
            variant="fullWidth"
            onChange={handleTabChange}
          >
            <Tab label="Characters" value={"Characters"} sx={{
            '&.Mui-selected': {
              backgroundColor: 'rgba(23,118,185) ', 
              color: 'white', 
            },
          }}/>
            <Tab label="Monsters" value={"Monsters"} sx={{
            '&.Mui-selected': {
              backgroundColor: 'rgba(212,18,18)', 
              color: 'white', 
            },
          }}/>
          </Tabs>
        </Grid>
        
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <TextField
            onChange={(e) => handleSearchChange(e)}
            variant="outlined"
            value={dataSearch ? dataSearch : ""}
            type="search"
            size="small"
            placeholder="Filter character/monster by Name"
            sx={{
              color: "white",
              width: 300,
              backgroundColor: "white",
              border: "5px solid rgba(54,69,79,0.5)",
              borderRadius: 2,
              textAlign: "center",
            }}
          />
        </Grid>
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "black",
            backgroundColor: "white",
            border: "5px solid rgba(54,69,79,0.5)",
          }}
        >
          {tabValue}
        </Typography>
        <List
          component="nav"
          aria-label="secondary mailbox folder"
          sx={{
            color: "black",
            maxWidth: 350,
            width: "100%",
            backgroundColor: "white",
            border: "5px solid rgba(54,69,79,0.5)",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            maxHeight: 350,
            ml:.5,
            height: "100%",
            mt:2,
            p:2,
            overflow: "auto",
          }}
        >
          {!dataSearch
            ? combatantList?.map((monster, index) => (
                
            <Grid
                  key={monster.id}
                  sx={{ height: "100", backgroundColor: "white" }}
                >
                  
              <Grid
                    sx={{
                      border: 1,
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      color:'rgba(200,184,116)',
                  mb:1,
                  p:.5,
                }}
                    overflow="auto"
              >
              <ArrowRightSharpIcon sx={{color:'red'}}/>
                <ListItemButton
                      onClick={(event) => handleListItemClick(event, index)}
                    >
                      
                  <ListItemText
                        sx={{ color:'black' }}
                        primary={monster.name}
                      />
                    </ListItemButton>
                    <Button
                      variant="outlined"
                      startIcon={<EditNoteIcon />}
                      onClick={() => handleOpen(index)}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<DeleteForeverTwoToneIcon />}
                      onClick={() => deleteEntry(monster.id)}
                    />
                  </Grid>
                  <UpdateModal
                    name={monster.name}
                    initiative={monster.initiative}
                    ac={monster.ac}
                    hp={monster.hp}
                reflexSave={monster.reflexSave}
                    fortitudeSave={monster.fortitudeSave}
                    willSave={monster.willSave}
                    description={monster.description}
                    open={openStates[index]} // Use the open state for this list item
                    onClose={() => handleClose(index)} // Pass the index to handleClose
                    id={monster.id}
                    databaseRef={tabValue}
                  />

                  {selectedIndex === index && (
                    <Grid
                      container
                      spacing={0}
                     sx={{
                        flexDirection:"row",
                    color: "white",
                        width: "100%",
                    mt:-1,
                    height:70,
                        background: 'linear-gradient(to top, darkblue, rgba(2, 78, 165))',
                        border: "5px solid rgba(217,212,215)",
                        borderRadius: 2,

                    textAlign: "center",
                  }}
                >
                  <Grid
                    item
                    xs={3}
                    sx={{
                      color: "white",
                      width: 300,
                      backgroundColor: "blue",
                      border: "5px solid rgba(54,69,79,0.5)",
                      borderRadius: 2,

                      textAlign: "center",
                    }}
                  >
                    <div sx={{ backgroundColor: "red" }}>AC: {monster.ac}</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div sx={{}}>HP {monster.hp}</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div sx={{}}>Reflex Save: {monster.reflexSave}</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div sx={{}}>Fortitude Save: {monster.fortitudeSave}</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div sx={{}}>Will Save: {monster.willSave}</div>
                  </Grid>
                </Grid>
                   )}
                   </Grid>
                  ))
                  : filteredList?.map((monster, index) => (
                    <Grid
                  key={monster.id}
                  sx={{ height: "100", backgroundColor: "white" }}
                >
                  
              <Grid
                    sx={{
                      border: 1,
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      color:'rgba(200,184,116)',
                  mb:1,
                  p:.5,
                }}
                    overflow="auto"
              >
              <ArrowRightSharpIcon sx={{color:'red'}}/>
                <ListItemButton
                      onClick={(event) => handleListItemClick(event, index)}
                    >
                      
                  <ListItemText
                        sx={{ color:'black' }}
                        primary={monster.name}
                      />
                    </ListItemButton>
                    <Button
                      variant="outlined"
                      startIcon={<EditNoteIcon />}
                      onClick={() => handleOpen(index)}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<DeleteForeverTwoToneIcon />}
                      onClick={() => deleteEntry(monster.id)}
                    />
                  </Grid>
                  <UpdateModal
                    name={monster.name}
                    initiative={monster.initiative}
                    ac={monster.ac}
                    hp={monster.hp}
                reflexSave={monster.reflexSave}
                    fortitudeSave={monster.fortitudeSave}
                    willSave={monster.willSave}
                    description={monster.description}
                    open={openStates[index]} // Use the open state for this list item
                    onClose={() => handleClose(index)} // Pass the index to handleClose
                    id={monster.id}
                    databaseRef={tabValue}
                  />

                  {selectedIndex === index && (
                    <Grid
                      container
                      spacing={0}
                     sx={{
                        flexDirection:"row",
                    color: "white",
                        width: "100%",
                    mt:-1,
                    height:70,
                        background: 'linear-gradient(to top, darkblue, rgba(2, 78, 165))',
                        border: "5px solid rgba(217,212,215)",
                        borderRadius: 2,

                    textAlign: "center",
                  }}
                >
                  <Grid
                    item
                    xs={3}
                    sx={{
                      color: "white",
                      width: 300,
                      backgroundColor: "blue",
                      border: "5px solid rgba(54,69,79,0.5)",
                      borderRadius: 2,

                      textAlign: "center",
                    }}
                  >
                    <div sx={{ backgroundColor: "red" }}>AC: {monster.ac}</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div sx={{}}>HP {monster.hp}</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div sx={{}}>Reflex Save: {monster.reflexSave}</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div sx={{}}>Fortitude Save: {monster.fortitudeSave}</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div sx={{}}>Will Save: {monster.willSave}</div>
                  </Grid>
                </Grid>
              )}
            </Grid>
          ))}
        </List>
      </Paper>
    </>
  );
}
