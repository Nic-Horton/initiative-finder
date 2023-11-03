import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

export default function ConditionsButton() { 
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<MonitorHeartIcon />}>
        Conditions
      </Button>
    </Stack>
  );
}