import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function BonusButton() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<RocketLaunchIcon />}>
        Bonuses
      </Button>
    </Stack>
  );
}
