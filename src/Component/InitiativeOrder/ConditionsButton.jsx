import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Conditions } from "../../Data/Conditions";
import { alpha } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import Switch from "@mui/material/Switch";

const RedSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: red[500],
    "&:hover": {
      backgroundColor: alpha(red[500], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: red[500],
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

export default function ConditionsButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          startIcon={<MonitorHeartIcon />}
          onClick={handleOpen}
        >
          Conditions
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Conditions
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Grid container spacing={5} columns={12}>
                {Conditions.map((condition, index) => (
                  <Grid item xs={6} sm={6} md={3} key={index}>
                    {condition.name}
                    <RedSwitch {...label} />
                  </Grid>
                ))}
              </Grid>
            </Typography>
          </Box>
        </Modal>
      </Stack>
    </div>
  );
}
