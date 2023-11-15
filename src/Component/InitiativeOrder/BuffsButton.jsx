import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import SeverityLevelRadio from "./SeverityLevelRadio";
import FlareIcon from "@mui/icons-material/Flare";
import ModifierPopover from "./ModiferPopover";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Buffs } from "../../Data/Buffs";
import { alpha } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

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

export default function BuffsButton({
  statusValues,
  handleStatusToggle,
  handleSeveritySelect,
  severityValues
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [buffs, setBuffs] = React.useState(Buffs);
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          startIcon={<FlareIcon />}
          onClick={handleOpen}
          color="success"
        >
          <Typography
            sx={{
              display: { md: "none", lg: "flex" },
            }}
          >
            Buffs
          </Typography>
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
              width: 500,
              bgcolor: "rgba(38, 50, 56,0.75)",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", right: 1, top: 1 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Chip label="Buffs" color="primary" />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Grid container spacing={2} columns={8}>
                {/* Conditions mapping */}
                {buffs.map((buff, index) => (
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    md={4}
                    key={index}
                    sx={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      borderColor: "primary.main",
                      bgcolor: "rgba(200,184,116)",
                    }}
                  >
                    {/* <Chip label={buff.name} color="primary" /> */}
                    <ModifierPopover buff={buff} type="buff" />
                    <BlueSwitch
                      {...label}
                      checked={statusValues.includes(buff.name)}
                      onChange={() => handleStatusToggle(buff.name)}
                    />
                    <SeverityLevelRadio
                      handleSeveritySelect={handleSeveritySelect}
                      name={buff.name}
                      modifiers={buff}
                      // setModifier={setBuffs}
                      value={severityValues.find(
                        (item) => item.name === buff.name
                      )}
                    />
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
