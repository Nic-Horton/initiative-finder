import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListResult from "./ListResult";

function SearchList({ category, search, filteredList, combatantList }) {
  return (
    <List
      sx={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {!search ? (
        category === "characters" ? (
          combatantList?.characterList?.map((character) => {
            return <ListResult key={character.id} combatant={character} />;
          })
        ) : (
          combatantList?.monsterList?.map((monster) => {
            return <ListResult key={monster.id} combatant={monster} />;
          })
        )
      ) : filteredList?.length > 0 ? (
        filteredList?.map((combatant) => {
          return <ListResult key={combatant.id} combatant={combatant} />;
        })
      ) : (
        <ListItem>
          <ListItemText primary="Nothing found" />
        </ListItem>
      )}
    </List>
  );
}

export default SearchList;
