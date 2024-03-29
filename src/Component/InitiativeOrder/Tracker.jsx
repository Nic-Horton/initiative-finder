import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Main } from "../Initiative Drawer/Drawer";
import SearchDrawer from "../Initiative Drawer/Drawer";
import { useState, useEffect } from "react";
import InitiativeOrderCard from "./InitiativeOrderCard";
import CombatantCard from "../InititiativeDescription/CombatantCard";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import BattleList from "./BattleList";
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
import { Typography } from "@mui/material";
import { WidthFull } from "@mui/icons-material";

function Tracker() {
  const uid = auth.currentUser.uid;
  const battleListCollectionRef = collection(db, 'Users', uid, 'Battles');
  const [open, setOpen] = useState(true);
  const [battleListTitle, setBattleListTitle] = useState('');
  const [unitsData, setUnitsData] = useState([]);
  const [battleLists, setBattleLists] = useState([]);
  const [selectedArray, setSelectedArray] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(false);
  const [childRolledInitiative, setChildRolledInitiative] = useState(0);

  //Combatant info that gets passed in when selecting more info on the character
  const [combatantAC, setCombatantAC] = useState(null);
  const [combatantInitiative, setCombatantInitiative] = useState(null);
  const [combatantName, setCombatantName] = useState(null);
  const [combatantHp, setCombatantHp] = useState(null);
  const [combatantReflexSave, setCombatantReflexSave] = useState(null);
  const [combatantFortitudeSave, setCombatantFortitudeSave] = useState(null);
  const [combatantWillSave, setCombatantWillSave] = useState(null);
  const [combatantPortrait, setCombatantPortrait] = useState(null)
  const [combatantDescription, setCombatantDescription] = useState(null)



  //Fetches Battles list for select TextField
  useEffect(() => {
    const fetchData = async () => {
      try {
        const battleListQuerySnapshot = await getDocs(battleListCollectionRef);
        setBattleLists(getFormattedData(battleListQuerySnapshot));
        // }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Helper function to format battle list data
    const getFormattedData = (querySnapshot) => {
      const lists = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        lists.push({
          id: doc.id,
          title: data.title,

        });
      });
      return lists;
    };
    fetchData();
  }, []);


  const handleChangeBattleList = async (event) => {
    setBattleListTitle(event.target.value);

    const getUnitsData = (querySnapshot) => {
      const units = [];
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        units.push(data);
      });
      return units;
    };

    const battleRef = doc(battleListCollectionRef, event.target.value);
    const unitsQuery = query(collection(battleRef, 'Units'));
    const unitDocs = await getDocs(unitsQuery);

    setUnitsData(getUnitsData(unitDocs));
  };


  const onBattleCreated = async (newBattleList) => {
    setBattleLists(newBattleList);

  };

  
  const deleteBattle = async () => {
    const updatedBattles = battleLists.filter(
      (battle) => battle.id !== battleListTitle
    );
    const battleDoc = doc(battleListCollectionRef, battleListTitle);
    await deleteDoc(battleDoc);
    setBattleLists(updatedBattles);
    setBattleListTitle("");
  };

 
  const addUnitsToBattle = async (newUnit) => {
    if (!battleListTitle) {
      return alert("Select a Battle");
    }

    const battleUnitsRef = collection(
      battleListCollectionRef,
      battleListTitle,
      "Units"
    );
    try {
      const docRef = await addDoc(battleUnitsRef, newUnit);
      const newUnitsData = [...unitsData, { ...newUnit, id: docRef.id }];
      

      setUnitsData(newUnitsData);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  
  const deleteUnitsFromBattle = async (unitID) => {
    const updatedUnits = unitsData.filter(
      (unit) => unit.id !== unitID
    );

    const battleUnitsRef = collection(
      battleListCollectionRef,
      battleListTitle,
      "Units"
    );
    const unitDoc = doc(battleUnitsRef, unitID)
    await deleteDoc(unitDoc)

    setUnitsData(updatedUnits);
  }

  

  const onRolledInitiativeChange = (value) => {
    setChildRolledInitiative(value);
    
  };

  const renderCards = () => {
    if (unitsData) {
      return unitsData
        .sort((a, b) => b.initiativeRoll - a.initiativeRoll)
        .map((unit, index) => (
          <InitiativeOrderCard
            key={unit.id}
            name={unit.name}
            ac={unit.ac}
            fortitudeSave={unit.fortitudeSave}
            willSave={unit.willSave}
            reflexSave={unit.reflexSave}
            portrait={unit.portrait}
            hp={unit.hp}
            id={unit.id}
            description={unit.description}
            initiative={unit.initiative}
            initiativeRoll={unit.initiativeRoll}
            isSelected={selectedCardIndex === index}
            handleSelectedCard={() => setSelectedCardIndex(index)}
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
            setCombatantPortrait={setCombatantPortrait}
            setCombatantDescription={setCombatantDescription}
            selectedUnit={selectedUnit}
            deleteUnitsFromBattle={deleteUnitsFromBattle}
          />
        ));
    }
  };
  

  const handleRolledInitiative = async (id, initiative) => {
    const finalValue = roll20SidedDieWithModifier(initiative);
    console.log("final" + finalValue)

    const battleUnitsRef = collection(
      battleListCollectionRef,
      battleListTitle,
      "Units"
    );

    const index = unitsData.findIndex(u => u.id === id)
    if (index !== -1) {
      const updatedUnits = [...unitsData];
      updatedUnits[index] = { ...updatedUnits[index], initiativeRoll: finalValue }
      setUnitsData(updatedUnits)
      const unitDoc = doc(battleUnitsRef, id);
      await updateDoc(unitDoc, { initiativeRoll: Number(finalValue) })
    }
  };

  const handleMassRoll = async () => {
    if (!battleListTitle) {
      return alert('Select a Battle!');
    }
    if (unitsData.length === 0 || !unitsData) {
      return alert('Add Units to Battle!');
    }

    const battleUnitsRef = collection(
      battleListCollectionRef,
      battleListTitle,
      "Units"
    );
    const massRollUnits = [];

    for (const unit of unitsData) {
      const finalValue = roll20SidedDieWithModifier(unit.initiative);
      const unitDoc = doc(battleUnitsRef, unit.id);
      await updateDoc(unitDoc, { initiativeRoll: Number(finalValue) });
      massRollUnits.push({ ...unit, initiativeRoll: finalValue });
    }
    setUnitsData(massRollUnits)
  };

  function roll20SidedDieWithModifier(modifier) {
    const rollResult = Math.floor(Math.random() * 20) + 1;

    const finalResult = rollResult + modifier;
    return finalResult;
  }
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const selectNextCard = () => {
    if (unitsData.length === 0) return;

    let newIndex = selectedCardIndex === null ? 0 : selectedCardIndex + 1;

    if (newIndex >= unitsData.length) {
      newIndex = 0;
    }

    setSelectedCardIndex(newIndex);
    
  };

  const handleSelectedCard = (cardIndex) => { };

  return (
    <>
      <SearchDrawer
        addUnitsToBattle={addUnitsToBattle}
        open={open}
        setOpen={setOpen}
      />
      <Main open={open}>
        <Grid container spacing={2}>
          <Grid item xs={12} md>
            <Paper sx={{ backgroundColor: "rgba(38, 50, 56,0.75)", mb: 1 }}>
              <BattleList
                onBattleCreated={onBattleCreated}
                deleteBattle={deleteBattle}
                handleChangeBattleList={handleChangeBattleList}
                battleLists={battleLists}
                setBattleListTitle={setBattleListTitle}
                battleListTitle={battleListTitle}
                handleMassRoll={handleMassRoll}
              />
            </Paper>
            <Paper
              sx={{
                backgroundColor: "rgba(38, 50, 56,0.75)",
                mb: 1,
                textAlign: "center",
              }}
            >
              <Button onClick={selectNextCard}>
                <Typography sx={{ color: "rgba(200, 184, 116)" }}>
                  Select Next Card
                </Typography>
              </Button>
            </Paper>
            <Box
              sx={{
                backgroundColor: "rgba(38, 50, 56,0.75)",
                textAlign: "center",
              }}
            >
              <Typography sx={{ color: "rgba(200, 184, 116)" }}>
                Tracker cards
              </Typography>
            </Box>
            {renderCards()}
          </Grid>
          <Grid item xs={2}>
          <CombatantCard
            sx={{ position: 'flex', zIndex: 1000,}}

            name={combatantName}
            ac={combatantAC}
            hp={combatantHp}
            initiative={combatantInitiative}
            fortitudeSave={combatantFortitudeSave}
            reflexSave={combatantReflexSave}
            willSave={combatantWillSave}
            portrait={combatantPortrait}
            description={combatantDescription}

          />
          </Grid>
        </Grid>

      </Main>
    </>
  );
}

export default Tracker;
