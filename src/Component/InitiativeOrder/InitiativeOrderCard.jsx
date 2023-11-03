import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

import ConditionsButton from "./ConditionsButton";
import BuffsButton from "./BuffsButton";
import BonusButton from "./BonusButton";
import { amber } from "@mui/material/colors";
import { lightBlue } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
const accordionTop = lightBlue[100];
const accordionDrop = amber[500];

export default function InitiativeOrderCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Container>
          {/* Accordion only */}
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
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <Typography sx={{ color: "text.secondary" }}>HP</Typography>
                  <Typography sx={{ color: "text.secondary" }}>##</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography sx={{ color: "text.secondary" }}>AC</Typography>
                  <Typography sx={{ color: "text.secondary" }}>##</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography sx={{ color: "text.secondary" }}>
                    Reflex
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>##</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography sx={{ color: "text.secondary" }}>Fort</Typography>
                  <Typography sx={{ color: "text.secondary" }}>##</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography sx={{ color: "text.secondary" }}>Will</Typography>
                  <Typography sx={{ color: "text.secondary" }}>##</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: accordionDrop }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <ConditionsButton />
                    </Grid>
                    <Grid item xs={4}>
                      <BuffsButton />
                    </Grid>
                    <Grid item xs={4}>
                      <BonusButton />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          {/* Accordion only */}
          <Box sx={{ bgcolor: "#cfe8fc", height: "50vh" }} />
        </Container>
      </React.Fragment>
    </>
  );
}
