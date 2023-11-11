import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Main } from '../Component/Initiative Drawer/Drawer';
import SearchDrawer from '../Component/Initiative Drawer/Drawer';
import { useState, useEffect } from 'react';
import InitiativeOrderCard from '../Component/InitiativeOrder/InitiativeOrderCard';
import CombatantCard from '../Component/InititiativeDescription/CombatantCard';
import BattleList from '../Component/InitiativeOrder/BattleList';
import { Auth } from '../Component/Auth';
import Navbar from '../Component/Navbar';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { db, auth } from '../Config/firebase-config';
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
} from 'firebase/firestore';
const battleListCollectionRef = collection(db, 'battleList');

function InitiativeTracker() {
	const [battleListTitle, setBattleListTitle] = useState('');
	const [open, setOpen] = useState(true);
	const [unitsData, setUnitsData] = useState();
	const battleListRef = collection(db, 'battleList');
	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const [battleLists, setBattleLists] = useState([]);
	const [selectedArray,setSelectedArray]=useState([])
	const [selectedUnit, setSelectedUnit] =useState(false)
	
	//Combatant info that gets passed in when selecting more info on the character
	const [combatantAC, setCombatantAC] = useState(null)
	const [combatantInitiative, setCombatantInitiative] = useState(null)
	const [combatantName, setCombatantName] = useState(null)
	const [combatantHp, setCombatantHp] = useState(null)
	const [combatantReflexSave, setCombatantReflexSave] = useState(null)
	const [combatantFortitudeSave, setCombatantFortitudeSave] = useState(null)
	const [combatantWillSave, setCombatantWillSave] = useState(null)
  
  //usestate for user
  const [user, setUser] = useState(null);
	

	// const [activeStep, setActiveStep] = React.useState(0);

	// const handleNext = () => {
	//   setActiveStep((prevActiveStep) => prevActiveStep + 1);
	// };
  
	// const handleBack = () => {
	//   setActiveStep((prevActiveStep) => prevActiveStep - 1);
	// };
  


const handleSelectedCard=(i)=>{
const tempArray =[...selectedArray]
if(tempArray[i]==i){tempArray[i]=undefined}
else {tempArray[i]=i}
console.log(selectedArray)
setSelectedArray(tempArray)
}

	// const unitsRef = doc(battleListRef, 'uJXIauGJluS61wWgwcNm')
	useEffect(() => {
		const fetchData = async () => {
			try {
				// const battleListCollectionRef = collection(db, 'battleList');

				// if (battleListTitle) {
				// 	// If a title is provided, execute the query with the title filter
				// 	const battleListQuery = query(battleListCollectionRef, where('title', '==', battleListTitle));
				// 	const battleListQuerySnapshot = await getDocs(battleListQuery);
				// 	setBattleLists(getFormattedData(battleListQuerySnapshot));
				// 	setUnitsData(getUnitsData(battleListQuerySnapshot));
				// } else {
				// If no title is provided, fetch all battle lists
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
					// Add other fields as needed
				});
			});
			return lists;
		};

		// Helper function to get units data
		const getUnitsData = (querySnapshot) => {
			const units = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				if ('units' in data && Array.isArray(data.units)) {
					units.push(data.units);
				}
			});
			return units;
		};

		// Execute the fetchData function when the component mounts
		fetchData();
	}, []);

	const handleChangeBattleList = async (event) => {
		setBattleListTitle(event.target.value);
		// If a title is provided, execute the query with the title filter

		const getUnitsData = (querySnapshot) => {
			const units = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				if ('units' in data && Array.isArray(data.units)) {
					units.push(data.units);
				}
			});
			return units;
		};
		const battleListQuery = query(
			battleListCollectionRef,
			where('title', '==', event.target.value)
		);
		const battleListQuerySnapshot = await getDocs(battleListQuery);
		setUnitsData(getUnitsData(battleListQuerySnapshot));
	};

// Checks if user is signed in

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser); 
      } else {
        setUser(null); 
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (user === null) {
    return (
      <>
        <div
          style={{
            position: "relative",
            height: "100vh",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              backgroundImage: `url('https://livingmythrpg.files.wordpress.com/2016/03/fairy-with-dying-warrior-wallpaper-1920x1080.jpg')`,
              height: "100vh",
              width: "100%",
			  backgroundSize: "cover",
			  backgroundRepeat: "no-repeat",
              filter: "blur(2px)",
              zIndex: -1,
            }}
          ></div>
          <div
            style={{
              zIndex: 1,
            }}
          >
            <Navbar />
            <Box
              textAlign="center"
              sx={{
                border: 3,
                borderRadius: 2,
                p: 3,
                m: "auto",
                width: 700,
                backgroundColor: "rgba(0,0,0,.5)",
                color: "white",
              }}
            >
              <Typography sx={{ color: "Red", marginTop: 10 }} variant="h2">
                Please login and try again
              </Typography>
            </Box>
            <Box sx={{ mt: 20 }} textAlign="center">
              <Button
                sx={{
                  fontSize: 25,
                  width: 300,
                  height: 150,
                }}
                variant="contained"
                component={NavLink}
                color="error"
                to="/Login"
              >
                Click here to go re-roll
              </Button>
            </Box>
          </div>
        </div>
      </>
    );
  }
  
  
	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<SearchDrawer open={open} setOpen={setOpen} />
				<Main open={open}>
					<Grid container spacing={2}>
						<Grid item xs={12} lg>
							<Paper sx={{ backgroundColor: 'lightblue', mb: 1 }}>
								<BattleList
									handleChangeBattleList={handleChangeBattleList}
									battleLists={battleLists}
									setBattleListTitle={setBattleListTitle}
									battleListTitle={battleListTitle}
								/>
							</Paper>
							<Paper sx={{ backgroundColor: 'lightblue', mb: 1 }}>
								<button onClick={prevCard}>Previous</button>
								<button onClick={nextCard}>Next</button>
							</Paper>
							<Paper sx={{ backgroundColor: 'lightblue' }}>Tracker cards</Paper>
							{unitsData?.map((unitsList) =>
								unitsList?.map((unit, index) => (
									<InitiativeOrderCard
										key={index}
										name={unit.name}
										ac={unit.AC}
										fortitudeSave={unit.fortitudeSave}
										willSave={unit.willSave}
										reflexSave={unit.reflexSave}
										hp={unit.hp}
										className={
											index === highlightedIndex ? 'highlighted-card' : ''
										}
									/>
								))
							)}
						</Grid>
						<Grid item xs>
							<Paper sx={{ backgroundColor: 'lightgreen' }}>
								Combatant Details
							</Paper>
							<CombatantCard />
						</Grid>
					</Grid>
				</Main>
			</Box>
		</>
	);
}

export default InitiativeTracker;
