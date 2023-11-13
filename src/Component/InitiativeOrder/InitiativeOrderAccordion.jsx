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
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [statusValues, setStatusValues] = useState([]);
  const [severityValues, setSeverityValues] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //For status to be added to statusValues state array. If the status is already in the array, it will filter out the matching status and remove from array. Else, it will add the status to the array. When switch it toggled "on" it should do the else statement.
  const handleStatusToggle = (status) => {
    if (statusValues.includes(status)) {
      setStatusValues(
        statusValues.filter((selectedStatus) => selectedStatus !== status)
      );
    } else {
      setStatusValues([...statusValues, status]);
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
    const findSeverity = severityValues.find(
      (item) => item.name === severity.name
    );

    if (findSeverity) {
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

  console.log(severityValues);
  return (
    <>
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
                  <Grid item xs={8}>
                    <SentimentSatisfiedAltIcon
                      sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      {name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography sx={{ color: "text.secondary" }}>
                      Init
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {initiative}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography sx={{ color: "text.secondary" }}>
                      rolled
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {initiativeRoll}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/* Second row */}
              <Grid item xs={6} lg={12}>
                {/* Character Points */}
                <Grid container spacing={1}>
                  <Grid item xs={4} lg={2}>
                    <Typography sx={{ color: "text.secondary" }}>HP</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {hp}
                    </Typography>
                  </Grid>
                  {/* Add other items for the second row as needed */}
                  <Grid item xs={4} lg={2}>
                    <Typography sx={{ color: "text.secondary" }}>AC</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {ac + acCumulativeEffect}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} lg={2}>
                    <Typography sx={{ color: "text.secondary" }}>
                      Reflex
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {reflexSave + reflexCumulativeEffect}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} lg={2}>
                    <Typography sx={{ color: "text.secondary" }}>
                      Fort
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {fortitudeSave + fortitudeCumulativeEffect}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} lg={2}>
                    <Typography sx={{ color: "text.secondary" }}>
                      Will
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
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
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item lg={4}>
                  <ConditionsButton
                    statusValues={statusValues}
                    handleStatusToggle={handleStatusToggle}
                    severityValues={severityValues}
                    handleSeveritySelect={handleSeveritySelect}
                  />
                </Grid>
                <Grid item lg={4}>
                  <BuffsButton
                    statusValues={statusValues}
                    handleStatusToggle={handleStatusToggle}
                    severityValues={severityValues}
                    handleSeveritySelect={handleSeveritySelect}
                  />
                </Grid>
                <Grid item lg={4}>
                  <StatusButton
                    statusValues={statusValues}
                    severityValues={severityValues}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<CasinoOutlinedIcon />}
                    onClick={() => handleRolledInitiative(id,initiative)}
                  >
                    <Typography
                      sx={{
                        display: { md: "none", lg: "flex" },
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
