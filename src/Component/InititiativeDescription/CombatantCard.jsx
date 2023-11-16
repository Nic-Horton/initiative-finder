import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid'
import PsychologyIcon from '@mui/icons-material/Psychology';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import SecurityIcon from '@mui/icons-material/Security';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from "@mui/material";

function CombatantCard({ name, ac, fortitudeSave, willSave, reflexSave, hp, conditions, initiative, portrait, description }) {

  if (name) {
    return (
      <div>
      <Card sx={{
        minWidth: 275,
        maxWidth: 500,
        height: 'auto',
        backgroundColor: "rgb(38, 50, 56,0.75)",
        border: "5px solid rgb(200, 184, 116)",
      borderRadius:5
      }}>
        <CardContent >
          <Typography variant="h4" color="text.secondary" gutterBottom>
            <img src={portrait} height={"auto"} width={'100%'} ></img>
          </Typography>
          <Typography variant="h5" component="div"
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              border: "5px solid rgb(200, 184, 116)",
              minHeight: 50
            }}>
            {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">

          </Typography>
          <Grid container spacing={1} >

            <Grid item xs={2} sx={{}}>
              <Box sx={{ alignItems: 'center', mt: 2, width: "100%", display: 'flex', flexDirection: 'column', }}>
                <FavoriteIcon sx={{color:"rgba(200, 184, 116)"}}></FavoriteIcon>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={{ alignItems: 'center', mt: 2, width: "100%", display: 'flex', flexDirection: 'column' }}>
                <SecurityIcon sx={{color:"rgba(200, 184, 116)"}} />
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={{ alignItems: 'center', mt: 2, width: "100%", display: 'flex', flexDirection: 'column' }}>
                <SettingsAccessibilityIcon  sx={{color:"rgba(200, 184, 116)"}}/>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={{ alignItems: 'center', mt: 2, width: "100%", display: 'flex', flexDirection: 'column' }}>
                <PsychologyIcon  sx={{color:"rgba(200, 184, 116)"}}/>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={{ alignItems: 'center', mt: 2, width: "100%", display: 'flex', flexDirection: 'column' }}>
                <DirectionsRunIcon sx={{color:"rgba(200, 184, 116)"}}/>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box sx={{ alignItems: 'center', mt: 2, width: "100%", display: 'flex', flexDirection: 'column' }}>
                <AvTimerIcon sx={{color:"rgba(200, 184, 116)"}}/>
              </Box>

            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{
                backgroundColor: "white",
                borderRadius: 2,
                border: "5px solid rgb(200, 184, 116)",
                minHeight: 50,
                
                textAlign: 'center'
              }}>
                {hp}

              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{
                backgroundColor: "white",
                borderRadius: 2,
                border: "5px solid rgb(200, 184, 116)",
                minHeight: 50,
                textAlign: 'center'
              }}>
                {ac}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{
                backgroundColor: "white",
                borderRadius: 2,
                border: "5px solid rgb(200, 184, 116)",
                minHeight: 50,
                textAlign: 'center'
              }}>
                {fortitudeSave}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{
                backgroundColor: "white",
                borderRadius: 2,
                border: "5px solid rgb(200, 184, 116)",
                minHeight: 50,
                textAlign: 'center'
              }}>
                {willSave}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{
                backgroundColor: "white",
                borderRadius: 2,
                border: "5px solid rgb(200, 184, 116)",
                minHeight: 50,
                textAlign: 'center'
              }}>
                {reflexSave}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{
                backgroundColor: "white",
                borderRadius: 2,
                border: "5px solid rgb(200, 184, 116)",
                minHeight: 50,
                textAlign: 'center'
              }}>
                {initiative}
              </Typography>

            </Grid>
          </Grid>
          <br />
          <Typography variant="body2" sx={{
            backgroundColor: "white",
            borderRadius: 2
          }}>
          
          </Typography>
        </CardContent>
      </Card>
      </div>
    );
  }
} 

export default CombatantCard;
