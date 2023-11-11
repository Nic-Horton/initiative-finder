import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InitiativeOrderAccordion from "./InitiativeOrderAccordion";

export default function InitiativeOrderCard() {
  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Card sx={{ minWidth: 275, backgroundColor: "lightblue" }}>
          <CardContent>
            <InitiativeOrderAccordion />
          </CardContent>
        </Card>
      </React.Fragment>
    </>
  );
}
