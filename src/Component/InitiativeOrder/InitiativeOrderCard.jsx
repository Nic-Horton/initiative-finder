import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardContent from "@mui/material/CardContent";
import InitiativeOrderAccordion from "./InitiativeOrderAccordion";
import Typography from '@mui/material/Typography';
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { useState, useEffect } from "react";
import { red } from "@mui/material/colors";

export default function InitiativeOrderCard({
  age,
  name,
  ac,
  fortitudeSave,
  willSave,
  reflexSave,
  portrait,
  hp,
  id,
  initiative,
  initiativeRoll,
  isSelected,
  handleSelectedCard,
  handleRolledInitiative,
  onRolledInitiativeChange,
  setCombatantName,
  setCombatantAC,
  setCombatantHp,
  setCombatantReflexSave,
  setCombatantFortitudeSave,
  setCombatantWillSave,
  setCombatantInitiative,
  setCombatantPortrait,
  setSelectedUnit,
  selectedUnit,
  deleteUnitsFromBattle
}) 



{

  const cardStyles = {
    // Define your card styles here
    border: isSelected ? "green" : "2px solid transparent",
    backgroundColor: isSelected ? "red" : "rgba(38, 50, 56,0.75)",
    minWidth: 275,
    // Add other styles as needed
  };

  


  
  return (
    <>
      {/* <React.Fragment> */}
        {/* <CssBaseline  /> */}
        <Card isSelected={false} style={cardStyles}>
          <CardContent 					sx={{
					border: 5,
					backgroundColor: 'rgba(38, 50, 56,0.75)',
					borderColor: 'rgba(200,184,116)',
					borderRadius: 5,
					
				}}
>

            <CardHeader
            sx={{padding:0, mb:1}}
            avatar={
                <SentimentSatisfiedAltIcon sx={{color:'rgba(200,184,116)'}}/>
            }
            title={<Typography sx={{color:'rgba(200,184,116)'}} variant="h5">{name}</Typography>}
            action={
              <IconButton onClick={()=>deleteUnitsFromBattle(id)}>
                <DeleteIcon  sx={{color:"#D90000"}} />
              </IconButton>
            }
            />

            <InitiativeOrderAccordion
              age={age}
              name={name}
              ac={ac}
              fortitudeSave={fortitudeSave}
              willSave={willSave}
              reflexSave={reflexSave}
              portrait={portrait}
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
              setCombatantPortrait={setCombatantPortrait}
              setSelectedUnit={setSelectedUnit}
              selectedUnit={selectedUnit}
            />
          </CardContent>
        </Card>
      {/* </React.Fragment> */}
    </>
  );
}
