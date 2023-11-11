import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InitiativeOrderAccordion from "./InitiativeOrderAccordion";
import { useState } from "react";

export default function InitiativeOrderCard({
  age,
  name,
  ac,
  fortitudeSave,
  willSave,
  reflexSave,
  hp,
  initiative,
  onRolledInitiativeChange,
  setCombatantName,
  setCombatantAC,
  setCombatantHp,
  setCombatantReflexSave,
  setCombatantFortitudeSave,
  setCombatantWillSave,
  setCombatantInitiative,
  setSelectedUnit,
  selectedUnit
}) 

{
  
  
  const [rolledInitiative, setRolledInitiative] = useState(0);
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
              hp={hp}
              rolledInitiative={rolledInitiative}
              setRolledInitiative={setRolledInitiative}
              onRolledInitiativeChange={onRolledInitiativeChange}
              initiative={initiative}
              setCombatantInitiative={setCombatantInitiative}
              setCombatantHp={setCombatantHp}
              setCombatantName={setCombatantName}
              setCombatantAC={setCombatantAC}
              setCombatantFortitudeSave={setCombatantFortitudeSave}
              setCombatantReflexSave={setCombatantReflexSave}
              setCombatantWillSave={setCombatantWillSave}
              setSelectedUnit={setSelectedUnit}
              selectedUnit={selectedUnit}
            />
          </CardContent>
        </Card>
      </React.Fragment>
    </>
  );
}
