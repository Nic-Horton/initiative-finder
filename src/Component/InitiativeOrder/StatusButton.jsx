import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import StatusEntry from "./StatusEntry";

export default function StatusButton({ statusValues, severityValues }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          startIcon={<RocketLaunchIcon />}
          onClick={handleOpen}
          color="warning"
        >
          <Typography
            sx={{
              display: { xs: "none", md: "none", lg: "flex" },
            }}
          >
            Statuses
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
              width: 400,
              bgcolor: "rgba(200,184,116)",
              border: "5px solid rgba(200,184,116)",
              boxShadow: 24,
              borderRadius: "10px",
              p: 3,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Selected Status Effects
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {statusValues.length === 0 ? (
                <div>No status effects selected.</div>
              ) : (
                statusValues.map((status, index) => (
                  <StatusEntry
                    key={index}
                    status={status}
                    severityValues={severityValues}
                    index={index}
                  />
                ))
              )}
            </Typography>
          </Box>
        </Modal>
      </Stack>
    </div>
  );
}
