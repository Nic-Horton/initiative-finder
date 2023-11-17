import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import { blueGrey } from "@mui/material/colors";

export default function SeverityLevelRadio({
  handleSeveritySelect,
  name,
  stages,
  modifiers,
  setModifiers,
  selectedSeverity,
  value,
}) {
  const [selectedValue, setSelectedValue] = React.useState(
    value ? value.stage : "0"
  );
  const handleChange = (
    name,
    stage,
    acEffect,
    fortitudeEffect,
    willEffect,
    reflexEffect
  ) => {
    setSelectedValue(stage);
    handleSeveritySelect({
      name: name,
      stage: stage,
      acEffect: acEffect,
      fortitudeEffect: fortitudeEffect,
      willEffect: willEffect,
      reflexEffect: reflexEffect,
    });
  };

  return (
    <FormControl>
      <FormLabel
        id="SeverityLevelInput"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color:"rgba(200,184,116)",
          }}
        >
          Severity
        </Typography>
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="SeverityLevelInput"
        name="severity-radio-buttons-group"
      >
        {modifiers?.conditionEffects?.map((modifier) => {
          return (
            <FormControlLabel
              value={modifier.stage}
              control={
                <Radio
                  checked={selectedValue === modifier.stage}
                  onChange={() =>
                    handleChange(
                      modifiers.name,
                      modifier.stage,
                      modifier.acEffect,
                      modifier.fortitudeEffect,
                      modifier.willEffect,
                      modifier.reflexEffect
                    )
                  }
                  sx={{
                    color: blueGrey[800],
                    "&.Mui-checked": {
                      color: blueGrey[600],
                    },
                  }}
                  size="small"
                />
              }
              label={
                <Typography
                  sx={{
                    color: "rgba(200, 184, 116)",
                  }}
                >
                  {modifier.stage}
                </Typography>
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
