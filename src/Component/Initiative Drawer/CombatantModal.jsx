import React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

const leftWidth = {
  xs: 270,
  sm: 300,
  md: 350,
  lg: 450,
};

const style = {
  position: "absolute",
  top: 240,
  left: {
    xs: leftWidth.xs,
    sm: leftWidth.sm,
    md: leftWidth.md,
    lg: leftWidth.lg,
  },
  width: { xs: 250, sm: 300 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

function CombatantModal({ handleClose, open, combatant }) {
  return (
    <Box key={combatant.id}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, .25)",
            },
          },
        }}
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 1, top: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ overflow: "scroll" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {combatant.name.toUpperCase()}
          </Typography>
          <List>
            <ListItem sx={{ px: 0 }}>
              <ListItemText>{"Armor Class: " + combatant.AC}</ListItemText>
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemText>
                {"Fortitude Save: " + combatant.fortitudeSave}
              </ListItemText>
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemText>
                {"Reflex Save: " + combatant.reflexSave}
              </ListItemText>
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemText>{"Will Save: " + combatant.willSave}</ListItemText>
            </ListItem>
          </List>
        </Box>
      </Modal>
    </Box>
  );
}

export default CombatantModal;
