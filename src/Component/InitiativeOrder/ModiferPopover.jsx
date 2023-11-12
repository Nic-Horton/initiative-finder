import React from "react";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "relative",
  top: "50%",
  left: "75%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(200,184,116)",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ModifierPopover({ buff, condition, type }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div
        aria-haspopup="true"
        style={{ display: "flex", alignItems: "center" }}
      >
        {type === "buff" && (
          <Chip
            label={buff.name}
            color="primary"
            style={{ marginRight: "4px" }}
          />
        )}
        {type === "condition" && (
          <Chip
            label={condition.name}
            color="error"
            style={{ marginRight: "4px" }}
          />
        )}
        <Button onClick={handleOpen}>
          {type === "buff" && <InfoOutlinedIcon color="info" />}
          {type === "condition" && <InfoOutlinedIcon color="error" />}
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {type === "buff" ? (
              <Typography sx={{ p: 1 }}>{buff.definition}</Typography>
            ) : type === "condition" ? (
              <Typography sx={{ p: 1 }}>{condition.definition}</Typography>
            ) : null}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
