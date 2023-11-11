import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Main } from "../Component/Initiative Drawer/Drawer";
import SearchDrawer from "../Component/Initiative Drawer/Drawer";
import InitiativeOrderCard from "../Component/InitiativeOrder/InitiativeOrderCard";
import CombatantCard from "../Component/InititiativeDescription/CombatantCard";
import Navbar from "../Component/Navbar";
import { auth } from "../Config/firebase-config";
import { NavLink } from "react-router-dom";
import { Button, Typography } from "@mui/material";

function InitiativeTracker() {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState(null);

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
      <Navbar />
      <Box sx={{ display: "flex", marginTop: 7 }}>
        <CssBaseline />
        <SearchDrawer open={open} setOpen={setOpen} />
        <Main open={open}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg>
              <Paper sx={{ backgroundColor: "lightblue" }}>Tracker</Paper>
              <InitiativeOrderCard />
            </Grid>
            <Grid item xs>
              <Paper sx={{ backgroundColor: "green" }}>Character Details</Paper>
              <CombatantCard />
            </Grid>
          </Grid>
        </Main>
      </Box>
    </>
  );
}

export default InitiativeTracker;
