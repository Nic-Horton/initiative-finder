import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function CombatantCard() {
  return (
    <Card sx={{ minWidth: 275, backgroundColor:'lightgreen' }}>
      <CardContent>
        <Typography variant='h4' color="text.secondary" gutterBottom>
          Combatant Details
        </Typography>
        <Typography variant="h5" component="div">
          Combatant Name
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Character or Monster
        </Typography>
        <Typography variant="body2">
          Stat List
        </Typography>
        <br />
        <Typography variant="body2">
          Conditions applied List (if any)
        </Typography>    
      </CardContent>
    </Card>
  )
}

export default CombatantCard