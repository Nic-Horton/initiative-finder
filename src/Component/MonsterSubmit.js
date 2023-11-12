import React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { db, auth } from "../Config/firebase-config";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {
  Alert,
  Badge,
  IconButton,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

const styles = {
  container: {
    width: 50,
  },
};

export default function MonsterSubmit() {
  const uid = auth.currentUser.uid;
  // const uid = user.uid;
  // const monsterCollectionRef = collection(db, 'Monsters');
  // const characterCollectionRef = collection(db, 'Characters');
  const monsterCollectionRef = collection(db, "Users", uid, "Monsters");
  const characterCollectionRef = collection(db, "Users", uid, "Characters");

  const onSubmitMonster = async () => {
    await addDoc(
      tabValue === "Characters" ? characterCollectionRef : monsterCollectionRef,
      {
        name: monsterName,
        ac: monsterAC,
        fortitudeSave: monsterFortSave,
        reflexSave: monsterReflexSave,
        willSave: monsterWillSave,
        initiative: monsterInitiative,
        description: monsterDescription,
        userId: auth?.currentUser?.uid,
      }
    );
    setMonsterAC(10);
    alert("Monster Submitted!");
  };

  const [open, setOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 800);
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
      <div>
        <Snackbar
          open={open}
          autoHideDuration={300}
          action={action}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success">"Tab Changed!"</Alert>
        </Snackbar>
      </div>
      <Paper
        sx={{
          width: 700,
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
              New Entry
            </Typography>
          </Grid>
        </Grid>

        {/* character and monsters tabs */}
        <Grid xs={16} justifyContent="center">
          <Tabs
            sx={{
              backgroundColor: "white",
              border: 1,
              borderRadius: 3,
              width: 450,
              ml: "auto",
              mr: "auto",
              mb: 2,
            }}
            textColor="primary"
            indicatorColor="secondary"
            variant="fullWidth"
            value={tabValue}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Characters" value={"Characters"} />
            <Tab label="Monsters" value={"Monsters"} />
          </Tabs>
        </Grid>

        {/* AC and Name Row */}
        <Grid
          xs
          container
          justifyContent="center"
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Badge
            badgeContent={
              <div>
                <Grid>
                  <InputLabel
                    sx={{ mt: 2, color: "white" }}
                    htmlFor="bootstrap-input"
                  >
                    AC
                  </InputLabel>
                </Grid>
                <TextField
                  variant="outlined"
                  type="tel"
                  color="error"
                  value={monsterAC}
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
                      const limitedAC = Math.min(
                        parseInt(input.slice(0, 3), 10),
                        99
                      );
                      setMonsterAC(limitedAC);
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
              <ArrowCircleUpIcon
                sx={{ marginLeft: -3, fontSize: "40", color: "white" }}
              />
            </IconButton>
            <IconButton
              variant="outlined"
              onClick={() => setMonsterAC(monsterAC - 1)}
              color="Error"
            >
              <ArrowCircleDownIcon
                sx={{ marginLeft: -3, fontSize: "10", color: "white" }}
              />
            </IconButton>
          </Grid>
          <Grid xs={9}>
            <InputLabel
              sx={{ ml: -2, color: "white" }}
              htmlFor="bootstrap-input"
            >
              Name
            </InputLabel>
            <TextField
              color="success"
              variant="outlined"
              placeholder="Enter the character/monster name here!"
              value={monsterName}
              onChange={(e) => setMonsterName(e.target.value)}
              sx={{
                color: "white",
                width: 532,
                backgroundColor: "white",
                border: "5px solid rgba(54,69,79,0.5)",
                borderRadius: 2,
                marginLeft: -3,
                textAlign: "center",
              }}
            />
          </Grid>
        </Grid>

        {/*stat blocks */}
        <Grid container xs={14} direction="row" sx={{ ml: 4, pt: 2, pb: 2 }}>
          <Grid xs={2} direction="column" sx={{ borderRadius: 2 }}>
            <InputLabel sx={{ color: "white" }}>HP</InputLabel>
            <TextField
              type="number"
              variant="outlined"
              value={monsterHP}
              onChange={(e) => setMonsterHP(e.target.value)}
              sx={{
                color: "white",
                backgroundColor: "white",
                width: 70,
                border: "5px solid rgba(54,69,79,0.5)",
                borderRadius: 2,
                textAlign: "center",
              }}
            />
          </Grid>

          <Grid xs={2} sx={{ borderRadius: 2 }}>
            <InputLabel sx={{ color: "white" }} htmlFor="bootstrap-input">
              Initiative
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
                border: "5px solid rgba(54,69,79,0.5)",
                borderRadius: 2,
                textAlign: "center",
              }}
            />
          </Grid>
          <Grid xs={2} sx={{ borderRadius: 2 }}>
            <InputLabel sx={{ color: "white" }} htmlFor="bootstrap-input">
              Fortitude
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
                border: "5px solid rgba(54,69,79,0.5)",
                borderRadius: 2,
                textAlign: "center",
              }}
            />
          </Grid>
          <Grid xs={2} sx={{ borderRadius: 2 }}>
            <InputLabel sx={{ color: "white" }} htmlFor="bootstrap-input">
              Will
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
                border: "5px solid rgba(54,69,79,0.5)",
                borderRadius: 2,
                textAlign: "center",
              }}
            />
          </Grid>
          <Grid xs={2} sx={{ borderRadius: 2 }}>
            <InputLabel sx={{ color: "white" }} htmlFor="bootstrap-input">
              Reflex
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
                border: "5px solid rgba(54,69,79,0.5)",
                borderRadius: 2,
                borderLeft: -10,
              }}
            />
          </Grid>
        </Grid>
        <Grid xs={15}>
          <TextField
            type="string"
            value={monsterDescription}
            onChange={(e) => setMonsterDescription(e.target.value)}
            multiline
            rows={7}
            placeholder="Enter your monster description here!"
            variant="outlined"
            sx={{
              justifyContent: "center",
              color: "white",
              ml: 4,
              backgroundColor: "white",
              width: 615,
              border: "5px solid rgba(54,69,79,0.5)",
              borderRadius: 2,
            }}
          />
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: 400,
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
              sx={{
                color: "yellow",
                backgroundColor: "rgba(14, 78, 14, 0.99)",
                border: 2,
                borderColor: "rgba(200,184,116)",
              }}
              variant="outlined"
              onClick={() => onSubmitMonster()}
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
