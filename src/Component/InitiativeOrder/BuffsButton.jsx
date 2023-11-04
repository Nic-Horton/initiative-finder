import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FlareIcon from "@mui/icons-material/Flare";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Buffs } from "../../Data/Buffs";
import { alpha } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import Switch from "@mui/material/Switch";

const BlueSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: blue[500],
    "&:hover": {
      backgroundColor: alpha(blue[500], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: blue[500],
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };


export default function BuffsButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          startIcon={<FlareIcon />}
          onClick={handleOpen}
        >
          Buffs
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
              Buffs
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Grid container spacing={5} columns={8}>
                {Buffs.map((condition, index) => (
                  <Grid item xs={4} sm={4} md={4} key={index}>
                    {condition.name}
                    <BlueSwitch {...label} />
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
