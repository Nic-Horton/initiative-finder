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
  id,
  initiative,
  initiativeRoll,
  handleRolledInitiative,
  onRolledInitiativeChange,
  setCombatantName,
  setCombatantAC,
  setCombatantHp,
  setCombatantReflexSave,
  setCombatantFortitudeSave,
  setCombatantWillSave,
  setCombatantInitiative,
  setSelectedUnit,
  selectedUnit,
}) {
  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Card
          sx={{
            minWidth: 275,
            backgroundColor: "rgba(38, 50, 56,0.75)",
            border: 5,
            borderColor: "rgba(200,184,116)",
            borderRadius: 5,
          }}
        >
          <CardContent>
            <InitiativeOrderAccordion
              age={age}
              name={name}
              ac={ac}
              fortitudeSave={fortitudeSave}
              willSave={willSave}
              reflexSave={reflexSave}
              hp={hp}
              id={id}
              initiative={initiative}
              initiativeRoll={initiativeRoll}
              handleRolledInitiative={handleRolledInitiative}
              onRolledInitiativeChange={onRolledInitiativeChange}
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
