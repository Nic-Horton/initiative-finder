
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
  const monsterCollectionRef = collection(db, "Monsters");
  const characterCollectionRef = collection(db, "Characters");
  const [tabValue, setTabValue] = useState("Characters");

  const collectionRef =
    tabValue === "Monsters" ? monsterCollectionRef : characterCollectionRef;
  useEffect(() => {
    const getInformationList = async () => {
      try {
        const data = await getDocs(collectionRef);
        const filteredData = data.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .filter((doc) => doc.userId === auth.currentUser.uid);
        setMonsterList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getInformationList();
  }, [tabValue]);

  const [monsterList, setMonsterList] = useState([]);
  const [dataSearch, setDataSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [openStates, setOpenStates] = React.useState([]);

  
  // Initialize open states for each list item to false
  useEffect(() => {
    setOpenStates(new Array(monsterList.length).fill(false));
  }, [monsterList]);

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
          <InputLabel sx={{ color: "white" }} htmlFor="bootstrap-input">
            Filter
          </InputLabel>
          <Typography>{dataSearch}</Typography>
          <TextField
            onChange={(e) => setDataSearch(e.target.value)}
            variant="outlined"
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
        <List
          component="nav"
          aria-label="secondary mailbox folder"
          sx={{
            color: "green",
            maxWidth: 350,
            width:"100%",
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

          {monsterList.map((monster, index) => (
            
            <Grid key={monster.id} sx={{ height: "100", backgroundColor:"white"}}>
              
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
                    sx={{color:'black' }}
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
                  
                  <Grid item xs>
                    <Box sx={{position: 'absolute', mt:1.8, ml:2.3,textAlign: 'center',fontSize: monster.ac.length > 2 ? 15 : 20 }}>
          {monster.ac}
        </Box>
        <Box sx={{position:'absolute'}}>
        <ShieldTwoToneIcon sx={{ fontSize: 60}} />
        </Box>
        
                  </Grid >
                  <Grid item xs sx={{flexDirection:"column"}}>
                    <Box sx={{}}>HP: <br></br>{monster.hp}</Box>
                  </Grid>
                  <Grid item xs>
                    <Box sx={{}}>RS:<br></br> {monster.reflexSave}</Box>
                  </Grid>
                  <Grid item xs>
                    <Box sx={{}}>FS: <br></br> {monster.fortitudeSave}</Box>
                  </Grid>
                  <Grid item xs>
                    <Box sx={{}}>WS: <br></br> {monster.willSave}</Box>
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
