import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SeverityLevelRadio from "./SeverityLevelRadio";
import ModifierPopover from "./ModiferPopover";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Conditions } from "../../Data/Conditions";
import { alpha } from "@mui/material/styles";
import { red } from "@mui/material/colors";

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

export default function ConditionsButton({
  statusValues,
  handleStatusToggle,
  handleSeveritySelect,
  severityValues,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [conditions, setConditions] = React.useState(Conditions);

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          startIcon={<MonitorHeartIcon />}
          onClick={handleOpen}
          color="error"
        >
          <Typography
            sx={{
              display: { md: "none", lg: "flex" },
            }}
          >
            Conditions
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
              width: 850,
              bgcolor: "rgba(38, 50, 56,0.75)",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              overflowY: "auto",
              maxHeight: "60vh",
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
              <Chip label="Conditions" color="error" />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Grid container columns={12}>
                {/* Conditions mapping */}
                {conditions.map((condition, index) => (
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    lg={3}
                    key={index}
                    sx={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      borderColor: "error.main",
                      bgcolor: "rgba(200,184,116)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <Chip label={condition.name} color="error" /> */}
                    <ModifierPopover condition={condition} type="condition" />
                    <RedSwitch
                      {...label}
                      checked={statusValues.includes(condition.name)}
                      onChange={() => {
                        // if (condition.name === "prone") {
                        //   handleStatusToggleForGroup([
                        //     "prone",
                        //     "flatfooted",
                        //     "petrified",
                        //   ]);
                        // } else {
                        handleStatusToggle(condition.name);
                      }}
                    />
                    <div>
                      <SeverityLevelRadio
                        handleSeveritySelect={handleSeveritySelect}
                        name={condition.name}
                        stages={condition.conditionEffects}
                        modifiers={condition}
                        // setModifiers={setConditions}
                        value={severityValues.find(
                          (item) => item.name === condition.name
                        )}
                      />
                    </div>
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
