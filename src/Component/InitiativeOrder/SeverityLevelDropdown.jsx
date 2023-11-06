import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SeverityLevelDropdown() {
  const [severityLevel, setSeverityLevel] = React.useState("");

  const handleChangeSeverityLevel = (event) => {
    setSeverityLevel(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="SeverityLevelInput">#</InputLabel>
        <Select
          labelId="SeverityLevelSelectLabel"
          id="SeverityLevelSelectid"
          value={severityLevel}
          onChange={handleChangeSeverityLevel}
          autoWidth
          label="Severity Level"
        >
          <MenuItem value={0}>Zero</MenuItem>
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
