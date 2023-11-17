import React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";


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
  width: { xs: 250 },
  bgcolor: "rgba(38, 50, 56,0.75)",
  border: "5px solid rgba(200,184,116)",
  boxShadow: 24,
  borderRadius: "10px",
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
            <CloseIcon sx={{ color: 'red' }} />
          </IconButton>

          <Typography
            sx={{ overflowX: "scroll", mb: 2, color: 'rgba(200,184,116)' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            <b>{combatant.name.toUpperCase()}</b>
          </Typography>

          <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={4} sx={{ borderRadius: 2 }}>
              <InputLabel sx={{ color: 'rgba(200,184,116)', textAlign: 'center' }} htmlFor="bootstrap-input">
                AC
              </InputLabel>
              <Typography
                sx={{ color: 'red', border: '3px solid rgba(200,184,116,.5)', borderRadius: 2, textAlign: 'center' }}
                variant="h6"
                component="h6"
              >
                {combatant.ac}
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ borderRadius: 2 }}>
              <InputLabel sx={{ color: 'rgba(200,184,116)', textAlign: 'center' }} htmlFor="bootstrap-input">
                HP
              </InputLabel>
              <Typography
                sx={{ color: 'red', border: '3px solid rgba(200,184,116,.5)', borderRadius: 2, textAlign: 'center' }}
                variant="h6"
                component="h6"
              >
                {combatant.hp}
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ borderRadius: 2 }}>
              <InputLabel sx={{ color: 'rgba(200,184,116)', textAlign: 'center' }} htmlFor="bootstrap-input">
                INIT
              </InputLabel>
              <Typography
                sx={{ color: 'red', border: '3px solid rgba(200,184,116,.5)', borderRadius: 2, textAlign: 'center' }}
                variant="h6"
                component="h6"
              >
                {combatant.initiative}
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ borderRadius: 2 }}>
              <InputLabel sx={{ color: 'rgba(200,184,116)', textAlign: 'center' }} htmlFor="bootstrap-input">
                FS
              </InputLabel>
              <Typography
                sx={{ color: 'red', border: '3px solid rgba(200,184,116,.5)', borderRadius: 2, textAlign: 'center' }}
                variant="h6"
                component="h6"
              >
                {combatant.fortitudeSave}
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ borderRadius: 2 }}>
              <InputLabel sx={{ color: 'rgba(200,184,116)', textAlign: 'center' }} htmlFor="bootstrap-input">
                RS
              </InputLabel>
              <Typography
                sx={{ color: 'red', border: '3px solid rgba(200,184,116,.5)', borderRadius: 2, textAlign: 'center' }}
                variant="h6"
                component="h6"
              >
                {combatant.reflexSave}
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ borderRadius: 2 }}>
              <InputLabel sx={{ color: 'rgba(200,184,116)', textAlign: 'center' }} htmlFor="bootstrap-input">
                WS
              </InputLabel>
              <Typography
                sx={{ color: 'red', border: '3px solid rgba(200,184,116,.5)', borderRadius: 2, textAlign: 'center' }}
                variant="h6"
                component="h6"
              >
                {combatant.willSave}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}

export default CombatantModal;
