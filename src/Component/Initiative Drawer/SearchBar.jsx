import React from "react";
import TextField from "@mui/material/TextField";
import { db, auth } from "../../Config/firebase-config";
import { useState, useEffect } from "react";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import SearchList from "./SearchList";

function SearchBar({ addUnitsToBattle, category }) {
  const uid = auth.currentUser.uid;
  const monsterCollectionRef = collection(db, "Users", uid, "Monsters");
  const characterCollectionRef = collection(db, "Users", uid, "Characters");
  const [search, setSearch] = useState("");

  const [filteredList, setFilteredList] = useState([]);
  const [combatantList, setCombatantList] = useState([
    { monsterList: [], characterList: [] },
  ]);

  useEffect(() => {
    const getLists = async () => {
      try {
        const monsterData = await getDocs(monsterCollectionRef);
        const characterData = await getDocs(characterCollectionRef);

        const filteredMonsterData = monsterData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const filteredCharacterData = characterData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setCombatantList({
          monsterList: filteredMonsterData,
          characterList: filteredCharacterData,
        });
      } catch (err) {
        console.error(err);
      }
    };
    getLists();
  }, []);

  const handleSearchChange = (e, category) => {
    setSearch(e.target.value.toLowerCase());

    if (category === "characters") {
      const filteredResult = combatantList.characterList.filter((character) => {
        if (
          character.name.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      setFilteredList(filteredResult);
    } else {
      const filteredResult = combatantList.monsterList.filter((monster) => {
        if (monster.name.toLowerCase().includes(e.target.value.toLowerCase())) {
          return true;
        }
        return false;
      });
      setFilteredList(filteredResult);
    }
  };

  return (
    <>
      <TextField
        label="Search"
        type="search"
        variant="outlined"
        value={search ? search : ""}
        onChange={(e) => handleSearchChange(e, category)}
        sx={{ width: "90%" }}
      />
      <SearchList
        addUnitsToBattle={addUnitsToBattle}
        search={search}
        category={category}
        filteredList={filteredList}
        combatantList={combatantList}
      />
    </>
  );
}

export default SearchBar;
