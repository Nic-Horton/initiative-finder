import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListResult from "./ListResult";

function SearchList({
  addUnitsToBattle,
  category,
  search,
  filteredList,
  combatantList,
}) {


  const renderCards = () => {
    if (category === "characters") {
      return combatantList.characterList
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        .map((character) => (
          <ListResult
                  key={character.id}
                  combatant={character}
                  addUnitsToBattle={addUnitsToBattle}
                />
        ));
    } else {
      return combatantList.monsterList
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        .map((monster) => (
          <ListResult
                  key={monster.id}
                  combatant={monster}
                  addUnitsToBattle={addUnitsToBattle}
                />
        ));
    }
  }

const renderSearchedCards = () => {
    if (filteredList.length > 0) {
      return filteredList
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        .map((combatant) => (
          <ListResult
                  key={combatant.id}
                  combatant={combatant}
                  addUnitsToBattle={addUnitsToBattle}
                />
        ));
    } else {
      return (
      <ListItem>
        <ListItemText primary="Nothing found" />
      </ListItem>
      )} 
};


  return (
    <List
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        overflow:'scroll',
        backgroundColor: 'rgba(38, 50, 56,0.75)',
        color:'rgba(200,184,116)'
      }}
    >
      {!search ? (
        renderCards()
       ) : (
        renderSearchedCards()
       )}
    </List>
  );
}

export default SearchList;
