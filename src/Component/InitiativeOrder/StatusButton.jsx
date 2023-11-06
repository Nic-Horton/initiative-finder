import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function StatusButton({ statusValues }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          startIcon={<RocketLaunchIcon />}
          onClick={handleOpen}
        >
          Statuses
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
              Selected Status Effects
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {/* Ternary for if statusValues is = then there are no status effects selected message displayed. Else, the modal is populated with the status */}
              {statusValues.length === 0 ? (
                <div>No status effects selected.</div>
              ) : (
                statusValues.map((status, index) => (
                  <div key={index}>{status}</div>
                ))
              )}
            </Typography>
          </Box>
        </Modal>
      </Stack>
    </div>
  );
}
