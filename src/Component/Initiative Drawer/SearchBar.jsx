import React from 'react'
import TextField from '@mui/material/TextField';
import { db, auth } from '../../Config/firebase-config'
import { useState, useEffect } from 'react';
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore'

const monsterCollectionRef = collection(db, 'Monsters')
const characterCollectionRef = collection(db, 'Characters')

function SearchBar({category}) {
  const [search,setSearch] = useState('');

  const [monsterList, setMonsterList] = useState([]);
  const [characterList, setCharacterList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  

  useEffect(() => {
    const getMonsterList = async () => {
        try {
            const data = await getDocs(monsterCollectionRef)
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            
            setMonsterList(filteredData)
        } catch (err) {
            console.error(err)
        }
    }
    getMonsterList()
}, [])

  useEffect(() => {
    const getCharacterList = async () => {
        try {
            const data = await getDocs(characterCollectionRef)
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            
            setCharacterList(filteredData)
        } catch (err) {
            console.error(err)
        }
    }
    getCharacterList()
}, [])

  const handleSearchChange = (e, category) =>{
		setSearch(e.target.value.toLowerCase())

    if(category === 'characters'){
      const filteredResult = characterList.filter((character)=>{
        if(character.name.toLowerCase().includes(e.target.value.toLowerCase())){
          return true;
        }
        return false;
      })
      setFilteredList(filteredResult)
    } else {
      const filteredResult = monsterList.filter((monster)=>{
        if(monster.name &&monster.name.toLowerCase().includes(e.target.value.toLowerCase())){
          return true;
        }
        return false;
      })
      setFilteredList(filteredResult)
    }
	} 

  return (
    <>
    <TextField label="Search" type='search' variant="outlined"
    			value={search ? search : ''}
					onChange={(e)=>handleSearchChange(e, category)}
					sx={{width:'90%'}}
				/>
        <ul>
          {!search ? 
          (category === 'characters' ? 
          characterList.map((character) => {
            return (<li key={character.id}>{character.name}</li>)
          })
          :
          monsterList.map((monster) => {
            return (<li key={monster.id}>{monster.name}</li>)
          })
          ) : ( filteredList.length > 0 ?
            filteredList.map((creature) => {
              return (<li key={creature.id}>{creature.name}</li>)
            }) 
            :
            <p>Nothing found</p>
          )}
        </ul>
    </>
  )
}

export default SearchBar