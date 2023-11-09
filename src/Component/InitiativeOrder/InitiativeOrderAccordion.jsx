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
import StatusButton from "./StatusButton";
import { amber } from "@mui/material/colors";
import { lightBlue } from "@mui/material/colors";

const accordionTop = lightBlue[100];
const accordionDrop = amber[500];

export default function InitiativeOrderAccordion({name, AC, fortitudeSave, reflexSave, willSave}) {
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

  //For status to be added to statusValues state array. If the status is already in the array, it will filter out the matching status and remove from array. Else, it will add the status to the array. When switch it toggled "on" it should do the else statement.
  const handleSeveritySelect = (severity) => {
    const findSeverity = severityValues.find(item => item.name === severity.name);
    
  if (findSeverity) {
    const updatedSeverityValues = severityValues.map(item =>
      item.name === severity.name ? { ...item, stage: severity.stage } : item
    );
    setSeverityValues(updatedSeverityValues);
    } else {
      setSeverityValues([...severityValues, severity]);
    }
  };


  
  
  console.log(severityValues)
  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ backgroundColor: accordionTop }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <SentimentSatisfiedAltIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Character Constitution
          </Typography>
          {/* Character Points */}
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <Typography sx={{ color: "text.secondary" }}>HP</Typography>
              <Typography sx={{ color: "text.secondary" }}></Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ color: "text.secondary" }}>AC</Typography>
              <Typography sx={{ color: "text.secondary" }}>{AC}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ color: "text.secondary" }}>Reflex</Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {reflexSave}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ color: "text.secondary" }}>Fort</Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {fortitudeSave}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ color: "text.secondary" }}>Will</Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {willSave}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        {/* Dropdown Buttons */}
        <AccordionDetails sx={{ backgroundColor: accordionDrop }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <ConditionsButton
                    statusValues={statusValues}
                    handleStatusToggle={handleStatusToggle}
                    severityValues={severityValues}
                    handleSeveritySelect={handleSeveritySelect}
                  />
                </Grid>
                <Grid item xs={3}>
                  <BuffsButton
                    statusValues={statusValues}
                    handleStatusToggle={handleStatusToggle}
                    severityValues={severityValues}
                    handleSeveritySelect={handleSeveritySelect}
                  />
                </Grid>
                <Grid item xs={3}>
                  <StatusButton
                    statusValues={statusValues}
                    severityValues={severityValues}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
