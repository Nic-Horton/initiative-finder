import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FlareIcon from "@mui/icons-material/Flare";

export default function BuffsButton() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<FlareIcon />}>
        Buffs
      </Button>
    </Stack>
  );
}
