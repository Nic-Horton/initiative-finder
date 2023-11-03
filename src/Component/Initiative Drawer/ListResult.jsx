import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

function ListResult({combatant}) {
  return (
    <Box width='100%' sx={{borderBottom:'solid 1px'}}>
    <ListItem key={combatant.id}>
      <ListItemText primary={combatant.name}/>
    </ListItem>
    </Box>
  )
}

export default ListResult