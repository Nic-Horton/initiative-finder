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

function CombatantCard({ name, ac, fortitudeSave, willSave, reflexSave, hp, conditions, initiative, portrait }) {
  return (
    <Card sx={{
      minWidth: 275,
      backgroundColor: "rgb(38, 50, 56,0.75)",
      border: "5px solid rgb(200, 184, 116)",

    }}>
      <CardContent >
        <Typography variant="h4" color="text.secondary" gutterBottom>
          <img src={portrait} height={"auto"} width={'100%'}></img>
        </Typography>
        <Typography variant="h5" component="div"
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
              borderRadius: 2,
              border: "5px solid rgb(200, 184, 116)",
              minHeight:50
          }}>
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">

        </Typography>
        <Grid container spacing={1}>
         
          <Grid item xs={2} sx={{}}>
            <Box sx={{alignItems:'center', ml:5, mt:2}}>
            <FavoriteIcon></FavoriteIcon>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{alignItems:'center',  ml:5, mt:2}}>
            <SecurityIcon/>
            </Box>
          </Grid>
          <Grid item xs={2}>
          <Box sx={{alignItems:'center',  ml:5, mt:2}}>
          <SettingsAccessibilityIcon />
            </Box>
          </Grid>
          <Grid item xs={2}>
          <Box sx={{alignItems:'center',  ml:5, mt:2}}>
            <PsychologyIcon/>
            </Box>
          </Grid>
          <Grid item xs={2}>
          <Box sx={{alignItems:'center',  ml:5, mt:2}}>
            <DirectionsRunIcon/>
            </Box>
          </Grid>
          <Grid item xs={2}>
          <Box sx={{alignItems:'center',  ml:5, mt:2}}>
            <AvTimerIcon />
            </Box>
            
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{
              backgroundColor: "white",
              borderRadius: 2,
              border: "5px solid rgb(200, 184, 116)",
              minHeight:50
            }}>
            {hp}

            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{
              backgroundColor: "white",
              borderRadius: 2,
              border: "5px solid rgb(200, 184, 116)",
              minHeight:50
            }}>
            {ac}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{
              backgroundColor: "white",
              borderRadius: 2,
              border: "5px solid rgb(200, 184, 116)",
              minHeight:50
            }}>
            {fortitudeSave}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{
              backgroundColor: "white",
              borderRadius: 2,
              border: "5px solid rgb(200, 184, 116)",
              minHeight:50
            }}>
              {willSave}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{
              backgroundColor: "white",
              borderRadius: 2,
              border: "5px solid rgb(200, 184, 116)",
              minHeight:50
            }}>
              {reflexSave}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{
              backgroundColor: "white",
              borderRadius: 2,
              border: "5px solid rgb(200, 184, 116)",
              minHeight:50
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
          Conditions applied List (if any)
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CombatantCard;
