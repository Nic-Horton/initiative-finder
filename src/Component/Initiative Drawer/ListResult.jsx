import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

function ListResult({combatant}) {
  return (
    <Box width='100%' sx={{borderBottom:'solid 1px'}}>
    <ListItem key={combatant.id}
      secondaryAction={
        <IconButton aria-label="info">
        <QuestionMarkIcon/>
        </IconButton>
      }
    >
      <ListItemButton>
      <ListItemText primary={combatant.name}/>
      </ListItemButton>
    </ListItem>
    </Box>
  )
}

export default ListResult