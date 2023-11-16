import React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { db, auth } from "../../Config/firebase-config";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {
  Alert,
  AlertTitle,
  Badge,
  IconButton,
  InputLabel,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(200, 184, 116)", // Set your custom color as the primary color
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: "rgb(264,0,0)", // Set the color of non-selected tabs to red
          "&.Mui-selected": {
            color: "rgba(200, 184, 116)", // Set the color of the selected tab to your custom color
          },
        },
      },
    },
  },
});

export default function SideCreation({ combatantList, setCombatantList }) {
  const uid = auth.currentUser.uid;
  // const uid = user.uid;
  // const monsterCollectionRef = collection(db, 'Monsters');
  // const characterCollectionRef = collection(db, 'Characters');
  const monsterCollectionRef = collection(db, "Users", uid, "Monsters");
  const characterCollectionRef = collection(db, "Users", uid, "Characters");

  const onSubmitMonster = async (e) => {
    if (!monsterName) {
      return;
    }
    e.preventDefault();
    const docRef = await addDoc(
      tabValue === "Characters" ? characterCollectionRef : monsterCollectionRef,
      {
        name: monsterName,
        hp: Number(monsterHP),
        ac: Number(monsterAC),
        fortitudeSave: Number(monsterFortSave),
        reflexSave: Number(monsterReflexSave),
        willSave: Number(monsterWillSave),
        initiative: Number(monsterInitiative),
        description: monsterDescription,
      }
    );
    if (tabValue === "Characters") {
      const newCombatantList = [
        ...combatantList.characterList,
        {
          id: docRef.id,
          name: monsterName,
          hp: Number(monsterHP),
          ac: Number(monsterAC),
          fortitudeSave: Number(monsterFortSave),
          reflexSave: Number(monsterReflexSave),
          willSave: Number(monsterWillSave),
          initiative: Number(monsterInitiative),
          description: monsterDescription,
        },
      ];
      setCombatantList({
        characterList: newCombatantList,
        monsterList: [...combatantList.monsterList],
      });
    } else {
      const newCombatantList = [
        ...combatantList.monsterList,
        {
          id: docRef.id,
          name: monsterName,
          hp: Number(monsterHP),
          ac: Number(monsterAC),
          fortitudeSave: Number(monsterFortSave),
          reflexSave: Number(monsterReflexSave),
          willSave: Number(monsterWillSave),
          initiative: Number(monsterInitiative),
          description: monsterDescription,
        },
      ];
      setCombatantList({
        characterList: [...combatantList.characterList],
        monsterList: newCombatantList,
      });
    }
    setOpen(true);
    handleReset();
    setTimeout(() => {
      setOpen(false);
    }, 800);
  };

  const [open, setOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const [tabValue, setTabValue] = useState("Characters");
  const [monsterName, setMonsterName] = useState("");
  const [monsterAC, setMonsterAC] = useState(10);
  const [monsterHP, setMonsterHP] = useState(10);
  const [monsterWillSave, setMonsterWillSave] = useState(10);
  const [monsterReflexSave, setMonsterReflexSave] = useState(10);
  const [monsterFortSave, setMonsterFortSave] = useState(10);
  const [monsterInitiative, setMonsterInitiative] = useState(10);
  const [monsterDescription, setMonsterDescription] = useState("");

  function handleReset() {
    setMonsterName("");
    setMonsterAC(10);
    setMonsterHP(10);
    setMonsterWillSave(10);
    setMonsterReflexSave(10);
    setMonsterFortSave(10);
    setMonsterInitiative(10);
    setMonsterDescription("");
  }
  return (
    <>
      {/* <Box> */}
      <Snackbar
        open={open}
        autoHideDuration={750}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert sx={{ p: 1 }} severity="success">
          <AlertTitle sx={{ fontSize: "1rem" }}>Combatant Created!</AlertTitle>
        </Alert>
      </Snackbar>
      {/* </Box> */}
      <Paper
        component="form"
        sx={{
          border: 5,
          backgroundColor: "rgba(38, 50, 56,0.75)" ,
          borderColor: "rgba(200,184,116)",
          borderRadius: 6,
          mt: 2,
          width: "97%",
        }}
        elevation={15}
      >
        <Grid
          sx={{ color: "white", p: 2 }}
          container
          columns={16}
          justifyContent="center"
        >
          <Grid xs={12} justifyContent="center">
            <Typography
              align="center"
              variant="h4"
              sx={{ textAlign: "center", color:"rgba(200,184,116)" }}
            >
              {tabValue === "Characters" ? "New Character" : "New Monster"}
            </Typography>
          </Grid>
        </Grid>

        {/* character and monsters tabs */}
        <Grid xs sx={{ display: "flex", justifyContent: "center" }}>
          <ThemeProvider theme={customTheme}>
            <Tabs
              sx={{
                mb: 2,
              }}
              variant="fullWidth"
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Characters" value={"Characters"} />
              <Tab label="Monsters" value={"Monsters"} />
            </Tabs>
          </ThemeProvider>
        </Grid>

        {/* AC and Name Row */}
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={1}
        >
          <Grid container spacing={2}>
            <Badge
              badgeContent={
                <div>
                  <Grid>
                    <InputLabel
                      sx={{ textAlign: "center", mt: 2, color: "white" }}
                      htmlFor="bootstrap-input"
                    >
                      AC
                    </InputLabel>
                  </Grid>
                  <TextField
                    variant="outlined"
                    type="tel"
                    color="error"
                    value={monsterAC === "" ? 0 : monsterAC}
                    InputProps={{
                      style: {
                        display: "flex",
                        alignItems: "flex-start",
                        marginTop: -15,
                        marginBottom: 20,
                        padding: 2,
                        fontSize: 20,
                        color: "white",
                      },
                    }}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (/^\d*$/.test(input)) {
                        const limitedAC =
                          input === ""
                            ? 0
                            : Math.min(parseInt(input.slice(0, 3), 10), 99);
                        setMonsterAC(limitedAC === "" ? 0 : limitedAC);
                      } else {
                        alert("Numbers Only Please");
                      }
                    }}
                    sx={{
                      "& fieldset": {
                        borderColor: "transparent", // Remove outline color
                      },
                    }}
                    inputProps={{
                      pattern: "[0-9]*", // Allow only numeric input
                    }}
                  >
                    {monsterAC}
                  </TextField>
                </div>
              }
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShieldTwoToneIcon
                sx={{ mt: 3, fontSize: 70, color: "rgba(139, 0, 0)" }}
              />
            </Badge>
            <Grid
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IconButton
                variant="outlined"
                onClick={() => setMonsterAC(monsterAC + 1)}
              >
                <ArrowCircleUpIcon sx={{ marginLeft: -3, color: "white" }} />
              </IconButton>
              <IconButton
                variant="outlined"
                onClick={() => setMonsterAC(monsterAC - 1)}
                color="Error"
              >
                <ArrowCircleDownIcon sx={{ marginLeft: -3, color: "white" }} />
              </IconButton>
            </Grid>
          </Grid>
          <Box>
            <Grid xs={12}>
              <InputLabel sx={{ color: "white" }} htmlFor="bootstrap-input">
                Name
              </InputLabel>
              <TextField
                color="success"
                variant="outlined"
                placeholder="Enter Name"
                value={monsterName}
                required
                onChange={(e) => setMonsterName(e.target.value)}
                sx={{
                  width: 180,
                  color: "white",
                  backgroundColor: "white",
                  border: "5px solid rgba(200,184,116)",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              />
            </Grid>
          </Box>
        </Grid>

        {/*stat blocks */}
        <Grid
          container
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            pt: 2,
            pb: 2,
          }}
        >
          <Grid
            xs={3.5}
            sm={3.25}
            lg={2}
            direction="column"
            sx={{ borderRadius: 2 }}
          >
            <InputLabel sx={{ textAlign: "center", color: "white" }}>
              HP
            </InputLabel>
            <TextField
              type="number"
              variant="outlined"
              value={monsterHP}
              onChange={(e) => setMonsterHP(e.target.value)}
              sx={{
                boxSizing: "border-box",
                color: "white",
                backgroundColor: "white",
                width: 70,
                border: "5px solid rgba(200,184,116)",
                borderRadius: 2,
                textAlign: "center",
              }}
            />
          </Grid>

          <Grid xs={3.5} sm={3.25} lg={2} sx={{ borderRadius: 2 }}>
            <InputLabel
              sx={{ textAlign: "center", color: "white" }}
              htmlFor="bootstrap-input"
            >
              Init
            </InputLabel>
            <TextField
              type="number"
              variant="outlined"
              value={monsterInitiative}
              onChange={(e) => setMonsterInitiative(e.target.value)}
              size="large"
              sx={{
                color: "white",
                backgroundColor: "white",
                width: 70,
                border: "5px solid rgba(200,184,116)",
                borderRadius: 2,
                textAlign: "center",
              }}
            />
          </Grid>
          <Grid xs={3.5} sm={3.25} lg={2} sx={{ borderRadius: 2 }}>
            <InputLabel
              sx={{ textAlign: "center", color: "white" }}
              htmlFor="bootstrap-input"
            >
              FS
            </InputLabel>
            <TextField
              type="number"
              variant="outlined"
              onChange={(e) => setMonsterFortSave(e.target.value)}
              value={monsterFortSave}
              sx={{
                color: "white",
                backgroundColor: "white",
                width: 70,
                border: "5px solid rgba(200,184,116)",
                borderRadius: 2,
                textAlign: "center",
              }}
            />
          </Grid>
          <Grid xs={3.5} sm={3.25} lg={2} sx={{ borderRadius: 2 }}>
            <InputLabel
              sx={{ textAlign: "center", color: "white" }}
              htmlFor="bootstrap-input"
            >
              WS
            </InputLabel>
            <TextField
              value={monsterWillSave}
              type="number"
              variant="outlined"
              onChange={(e) => setMonsterWillSave(e.target.value)}
              sx={{
                color: "white",
                backgroundColor: "white",
                width: 70,
                border: "5px solid rgba(200,184,116)",
                borderRadius: 2,
                textAlign: "center",
              }}
            />
          </Grid>
          <Grid xs={3.5} sm={3.25} lg={2} sx={{ borderRadius: 2 }}>
            <InputLabel
              sx={{ textAlign: "center", color: "white" }}
              htmlFor="bootstrap-input"
            >
              RS
            </InputLabel>
            <TextField
              type="number"
              value={monsterReflexSave}
              variant="outlined"
              onChange={(e) => setMonsterReflexSave(e.target.value)}
              sx={{
                color: "white",
                backgroundColor: "white",
                width: 70,
                border: "5px solid rgba(200,184,116)",
                borderRadius: 2,
                borderLeft: -10,
              }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            m: "auto",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 50,
              p: 3,
            }}
          >
            <Button
              type="submit"
              sx={{
                color: "yellow",
                backgroundColor: "rgba(14, 78, 14, 0.99)",
                border: 2,
                borderColor: "rgba(200,184,116)",
              }}
              variant="outlined"
              onClick={(e) => onSubmitMonster(e)}
            >
              Submit
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 50,
              p: 3,
            }}
          >
            <Button
              sx={{ color: "red", backgroundColor: "black" }}
              variant="outlined"
              onClick={handleReset}
            >
              Reset?
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
