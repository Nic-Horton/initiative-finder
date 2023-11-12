import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";
import CombatantModal from "./CombatantModal";

function ListResult({ addUnitsToBattle, combatant }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box width="100%" sx={{ borderBottom: "solid 1px" }}>
      <ListItem
        secondaryAction={
          <IconButton aria-label="info" edge="end" onClick={handleOpen}>
            <PageviewOutlinedIcon />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton onClick={() => addUnitsToBattle(combatant)}>
          <ListItemText primary={combatant.name} />
        </ListItemButton>
      </ListItem>
      <CombatantModal
        combatant={combatant}
        handleClose={handleClose}
        open={open}
      />
    </Box>
  );
}

export default ListResult;
