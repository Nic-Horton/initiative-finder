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
  return (
    <List
      sx={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        overflow:'scroll'
      }}
    >
      {!search ? (
        category === "characters" ? (
          combatantList?.characterList?.map((character) => {
            return (
              <ListResult
                key={character.id}
                combatant={character}
                addUnitsToBattle={addUnitsToBattle}
              />
            );
          })
        ) : (
          combatantList?.monsterList?.map((monster) => {
            return (
              <ListResult
                key={monster.id}
                combatant={monster}
                addUnitsToBattle={addUnitsToBattle}
              />
            );
          })
        )
      ) : filteredList?.length > 0 ? (
        filteredList?.map((combatant) => {
          return (
            <ListResult
              key={combatant.id}
              combatant={combatant}
              addUnitsToBattle={addUnitsToBattle}
            />
          );
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
