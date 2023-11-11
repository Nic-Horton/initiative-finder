import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InitiativeOrderAccordion from "./InitiativeOrderAccordion";

export default function InitiativeOrderCard({age, name, ac, fortitudeSave, willSave, reflexSave, hp}) {
  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Card sx={{ minWidth: 275, backgroundColor: "lightblue" }}>
          <CardContent>
          <InitiativeOrderAccordion 
            age={age} 
            name={name} 
            ac={ac} 
            fortitudeSave={fortitudeSave}
            willSave={willSave}
            reflexSave={reflexSave}
            hp={hp}/>
          </CardContent>
        </Card>
      </React.Fragment>
    </>
  );
}
