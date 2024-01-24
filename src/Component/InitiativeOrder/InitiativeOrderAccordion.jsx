import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AccordionDetails from "@mui/material/AccordionDetails";
import ConditionsButton from "./ConditionsButton";
import BuffsButton from "./BuffsButton";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import StatusButton from "./StatusButton";
import { amber } from "@mui/material/colors";
import { lightBlue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { Auth } from "../Auth";
import { db, auth } from "../../Config/firebase-config";
import {
  getDocs,
  collection,
  addDoc,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  collectionGroup,
  where,
  query,
} from "firebase/firestore";

const accordionTop = "rgba(200,184,116)";
const accordionDrop = "rgba(150,134,66,0.75)";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function InitiativeOrderAccordion({
  name,
  ac,
  fortitudeSave,
  reflexSave,
  willSave,
  hp,
  portrait,
  initiative,
  initiativeRoll,
  id,
  rolledInitiative,
  onRolledInitiativeChange,
  handleRolledInitiative,
  setCombatantAC,
  setCombatantName,
  setCombatantFortitudeSave,
  setCombatantReflexSave,
  setCombatantInitiative,
  setCombatantWillSave,
  setCombatantHp,
  setCombatantPortrait,
  setSelectedUnit,
  selectedUnit,
  value,
}) {
  //States
  const [expanded, setExpanded] = React.useState(false);
  const [statusValues, setStatusValues] = useState([]);
  const [severityValues, setSeverityValues] = useState([]);
  const [circumstanceSnackbar, setCircumstanceSnackbar] = useState(false);
  const [removeCircumstanceSnackbar, setRemoveCircumstanceSnackbar] =
    useState(false);
  const [selectedValue, setSelectedValue] = React.useState(
    value ? value.stage : "0"
  );
  //Accordion open/close
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //Circumstance Snackbar
  const handleCircumstanceSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCircumstanceSnackbar(false);
  };
  const handleRemoveCircumstanceSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setRemoveCircumstanceSnackbar(false);
  };
  // adds status to be added to statusValues state array. 
  const handleStatusToggle = (status) => {
    if (statusValues.includes(status)) {
      // console.log("removed", status, "from --->", statusValues);
      setStatusValues(
        statusValues.filter((selectedStatus) => selectedStatus !== status)
      );
      if (status === "prone") {
        setRemoveCircumstanceSnackbar(true);
      }
    } else {
      //Testing the below set SelectedValue
      // console.log("added", status, "to --->", statusValues);
      setStatusValues([...statusValues, status]);
      // setSelectedValue("1");
      // console.log(selectedValue)

      if (status === "prone") {
        setCircumstanceSnackbar(true);
        setStatusValues((prevStatusValues) => {
          if (!prevStatusValues.includes("flatfooted")) {
            return [...prevStatusValues, "flatfooted"];
          }
          return prevStatusValues;
        });
      }
    }
  };

  //To calculate each condition or buff modifier effect and "reduce" all of the array values for each effect to one value and subtract it from the character points below
  const calculateCumulativeEffect = (effectType) => {
    return severityValues.reduce(
      (cumulativeEffect, severity) =>
        cumulativeEffect + (severity[effectType] || 0),
      0
    );
  };
  const acCumulativeEffect = calculateCumulativeEffect("acEffect");
  const fortitudeCumulativeEffect =
    calculateCumulativeEffect("fortitudeEffect");
  const willCumulativeEffect = calculateCumulativeEffect("willEffect");
  const reflexCumulativeEffect = calculateCumulativeEffect("reflexEffect");

  //For status to be added to statusValues state array. If the status is already in the array, it will filter out the matching status and remove from array. Else, it will add the status to the array. When switch it toggled "on" it should do the else statement.
  const handleSeveritySelect = (severity) => {
    // console.log("Severity Select Has Run");
    const findSeverity = severityValues.find(
      (item) => item.name === severity.name
    );

    if (findSeverity) {
      // console.log("Severity IF Statement");
      const updatedSeverityValues = severityValues.map((item) =>
        item.name === severity.name
          ? {
            ...item,
            stage: severity.stage,
            acEffect: severity.acEffect,
            fortitudeEffect: severity.fortitudeEffect,
            willEffect: severity.willEffect,
            reflexEffect: severity.reflexEffect,
          }
          : item
      );
      setSeverityValues(updatedSeverityValues);
    } else {
      // console.log("Severity ELSE Statement");
      // console.log(severity);
      setSeverityValues([...severityValues, severity]);
    }
  };

  const setCombatantDetails = () => {
    setCombatantAC(ac);
    setCombatantHp(hp);
    setCombatantName(name);
    setCombatantFortitudeSave(fortitudeSave);
    setCombatantInitiative(initiative);
    setCombatantReflexSave(reflexSave);
    setCombatantWillSave(willSave);
    setCombatantPortrait(portrait);
    setSelectedUnit(true);
  };

  const clearCombatantDetails = () => {
    setCombatantAC(null);
    setCombatantHp(null);
    setCombatantName(null);
    setCombatantFortitudeSave(null);
    setCombatantInitiative(null);
    setCombatantReflexSave(null);
    setCombatantWillSave(null);
    setCombatantPortrait(null);
    setSelectedUnit(null);
  };

  return (
    <>
      <Snackbar
        open={circumstanceSnackbar}
        autoHideDuration={6000}
        onClose={handleCircumstanceSnackbarClose}
      >
        <Alert onClose={handleCircumstanceSnackbarClose} severity="warning">
          "You are also flatfooted when you are prone"
        </Alert>
      </Snackbar>
      <Snackbar
        open={removeCircumstanceSnackbar}
        autoHideDuration={6000}
        onClose={handleRemoveCircumstanceSnackbarClose}
      >
        <Alert onClose={handleRemoveCircumstanceSnackbarClose} severity="error">
          "You are still flatfooted, adjust if needed"
        </Alert>
      </Snackbar>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        onClick={() =>
          !expanded ? setCombatantDetails() : clearCombatantDetails()
        }
        sx={{ backgroundColor: !expanded ? accordionTop : "rgba(200,184,116)" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {/* First row */}
              <Grid item xs={12}>
                <Grid container alignItems="center">
                  <Grid item xs={2} sx={{ display: 'flex', flexDirection:"column", alignItems:"center"}}>
                    <Typography sx={{ color: "text.secondary", fontSize: 20,}}>
                      Init
                    </Typography>
                    <Typography variant="body2" sx={{
                      backgroundColor: "white",
                      borderRadius: 2,
                      border: "3px solid rgb(38, 50, 56)",
                      minHeight: 50,
                      minWidth: 50,
                      width: '50%',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 25,
                    }}>
                      {initiative}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ display: 'flex', flexDirection:"column", alignItems:"center"}}>
                    <Typography sx={{ color: "text.secondary", fontSize: 20,}}>
                      Rolled
                    </Typography>
                    <Typography variant="body2" sx={{
                      backgroundColor: "white",
                      borderRadius: 2,
                      border: "3px solid rgb(38, 50, 56)",
                      minHeight: 50,
                      minWidth: 50,
                      width: '50%',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 25,
                    }}>
                      {initiativeRoll}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/* Second row */}
              <Grid item xs={6} lg={12}>
                {/* Character Points */}
                <Grid container spacing={1}>
                  <Grid item xs={4} lg={2} sx={{ display: 'flex', flexDirection:"column", alignItems:"center"}}>
                    <Typography sx={{ color: "text.secondary", fontSize: 20, }}>HP</Typography>
                    <Typography variant="body2" sx={{
                      backgroundColor: "white",
                      borderRadius: 2,
                      border: "3px solid rgb(38, 50, 56)",
                      minHeight: 50,
                      minWidth: 50,
                      width: '50%',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 25,
                    }}>
                      {hp}
                    </Typography>
                  </Grid>
                  {/* Add other items for the second row as needed */}
                  <Grid item xs={4} lg={2} sx={{ display: 'flex', flexDirection:"column", alignItems:"center"}}>
                    <Typography sx={{ color: "text.secondary" , fontSize: 20,}}>AC</Typography>
                    <Typography variant="body2" sx={{
                      backgroundColor: "white",
                      borderRadius: 2,
                      border: "3px solid rgb(38, 50, 56)",
                      minHeight: 50,
                      minWidth: 50,
                      width: '50%',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 25,
                    }}>
                      {ac + acCumulativeEffect}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} lg={2} sx={{ display: 'flex', flexDirection:"column", alignItems:"center"}}>
                    <Typography sx={{ color: "text.secondary", fontSize: 20, }}>
                      Reflex
                    </Typography>
                    <Typography variant="body2" sx={{
                      backgroundColor: "white",
                      borderRadius: 2,
                      border: "3px solid rgb(38, 50, 56)",
                      minHeight: 50,
                      minWidth: 50,
                      width: '50%',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 25,
                    }}>
                      {reflexSave + reflexCumulativeEffect}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} lg={2} sx={{ display: 'flex', flexDirection:"column", alignItems:"center"}}>
                      <Typography sx={{ color: "text.secondary" , fontSize: 20,}}>
                        Fort
                      </Typography>
                    <Typography variant="body2" sx={{
                      backgroundColor: "white",
                      borderRadius: 2,
                      border: "3px solid rgb(38, 50, 56)",
                      minHeight: 50,
                      minWidth: 50,
                      width: '50%',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 25,
                    }}>
                      {fortitudeSave + fortitudeCumulativeEffect}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} lg={2} sx={{ display: 'flex', flexDirection:"column", alignItems:"center"}}>
                    <Typography sx={{ color: "text.secondary", fontSize: 20, }}>
                      Will
                    </Typography>
                    <Typography variant="body2" sx={{
                      backgroundColor: "white",
                      borderRadius: 2,
                      border: "3px solid rgb(38, 50, 56)",
                      minHeight: 50,
                      minWidth: 50,
                      width: '50%',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 25,
                    }}>
                      {willSave + willCumulativeEffect}
                    </Typography>
                    <Grid item xs={4} lg={2}></Grid>
                  </Grid>
                  <Grid item xs={6} lg={2}>
                    <Button> Adjust</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </AccordionSummary>
        {/* Dropdown Buttons */}
        <AccordionDetails sx={{ backgroundColor: accordionDrop }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{display:'flex', }}>
              <Grid container spacing={2} sx={{ display: 'flex'}}>
                <Grid item lg={3} sx={{ display:'flex', justifyContent:'center'}}>
                  <ConditionsButton
                    statusValues={statusValues}
                    handleStatusToggle={handleStatusToggle}
                    severityValues={severityValues}
                    handleSeveritySelect={handleSeveritySelect}
                    value={selectedValue}
                    
                  />
                </Grid>
                <Grid item lg={3} sx={{ display:'flex', justifyContent:'center'}}>
                  <BuffsButton
                    statusValues={statusValues}
                    handleStatusToggle={handleStatusToggle}
                    severityValues={severityValues}
                    handleSeveritySelect={handleSeveritySelect}
                    value={selectedValue}
                  />
                </Grid>
                <Grid item lg={3} sx={{ display:'flex', justifyContent:'center'}}>
                  <StatusButton
                    statusValues={statusValues}
                    severityValues={severityValues}
                  />
                </Grid>
                <Grid item lg={3} sx={{ display:'flex', justifyContent:'center'}}>
                  <Button
                    variant="contained"
                    startIcon={<CasinoOutlinedIcon />}
                    onClick={() => handleRolledInitiative(id, initiative)}
                  >
                    <Typography
                      sx={{
                        display: { xs: "none", md: "none", lg: "flex" },
                      }}
                    >
                      Roll it
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
