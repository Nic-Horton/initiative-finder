import React from "react";
import TextField from "@mui/material/TextField";
import { db, auth } from "../../Config/firebase-config";
import { useState, useEffect } from "react";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import SearchList from "./SearchList";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from "@mui/material/Divider";

// const customTheme = createTheme({
//   palette: {
//     secondary: {
//       main: 'rgba(200, 184, 116)',
//     },
//   },
// });

const customTheme = createTheme({
  palette: {
    primary: {
      main: 'rgba(200, 184, 116)', // Set your custom color as the primary color
    },
    secondary: {
      main: 'rgba(200, 184, 116)', // Set your custom color as the secondary color
    },
    text: {
      primary: 'rgb(200, 184, 116)', // Set the text color to your custom RGB color
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            backgroundColor: 'rgba(38, 50, 56,0.75)',
            color: 'rgb(200, 184, 116)', // Set the background color to your custom RGB color
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused fieldset': {
            borderColor: 'rgb(200, 184, 116)', // Set the border color for focused state
          },
          '& fieldset': {
            borderColor: 'rgb(200, 184, 116)', // Set the border color for unfocused state
          },
        },
      },
    },
  },
});

function SearchBar({ addUnitsToBattle, category, combatantList, setCombatantList, search, setSearch }) {
  const uid = auth.currentUser.uid;
  const monsterCollectionRef = collection(db, "Users", uid, "Monsters");
  const characterCollectionRef = collection(db, "Users", uid, "Characters");

  const [filteredList, setFilteredList] = useState([]);


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
      const filteredResult = combatantList?.characterList?.filter((character) => {
        if (
          character.name.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      setFilteredList(filteredResult);
    } else {
      const filteredResult = combatantList?.monsterList?.filter((monster) => {
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
    <ThemeProvider theme={customTheme}>
      <TextField
        label="Search"
        type="search"
        variant="outlined"
        value={search ? search : ""}
        onChange={(e) => handleSearchChange(e, category)}
        sx={{ width: "100%"}}
        InputLabelProps={{
          sx: {
            color:(theme) => theme.palette.text.primary
          },}}
        
      />
      <Divider sx={{ height:'10px'}}/>
      </ThemeProvider>
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
