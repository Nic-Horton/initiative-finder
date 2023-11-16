import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
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
    // const keyValueName = { [name]: name  };
    // const keyValueStage = { [stage]: stage  } // Create a key-value pair
    // handleSeveritySelect(keyValue); // Pass the key-value pair to the callback
    handleSeveritySelect({
      name: name,
      stage: stage,
      acEffect: acEffect,
      fortitudeEffect: fortitudeEffect,
      willEffect: willEffect,
      reflexEffect: reflexEffect,
    });
  };

  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  //   const updatedModifiers = [...modifiers];
  //   updatedModifiers[conditionIndex].conditionEffects[0].stage = severity;
  //   updatedModifiers[conditionIndex].isActive =
  //   !updatedModifiers[conditionIndex].isActive;
  //   setModifiers(updatedModifiers); // Create a key-value pair
  //   //handleSeveritySelect(keyValue); // Pass the key-value pair to the callback
  // };

  // const controlProps = (index,item) => ({
  //   checked: selectedValue === item,
  //   onChange: handleChange,
  //   value: item,
  //   name: "severity-radio-button-demo", // Update the name
  //   inputProps: { "aria-label": item },
  // });

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
        Severity
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="SeverityLevelInput"
        name="severity-radio-buttons-group"
      >
        {modifiers?.conditionEffects?.map((modifier) => {
          return (
            <FormControlLabel
              value={modifier.stage} // Use a string value
              control={
                <Radio
                  // {...controlProps(index,modifier.stage)}
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
              label={modifier.stage}
            />
          );
        })}

        {/* <FormControlLabel
          value="0" // Use a string value
          control={
            <Radio
              {...controlProps("0")}
              sx={{
                color: blueGrey[800],
                "&.Mui-checked": {
                  color: blueGrey[600],
                },
              }}
              size="small"
            />
          }
          label="0"
        />
        <FormControlLabel
          value="1"
          control={
            <Radio
              {...controlProps("1")}
              sx={{
                color: blueGrey[800],
                "&.Mui-checked": {
                  color: blueGrey[600],
                },
              }}
              size="small"
            />
          }
          label="1"
        />
        <FormControlLabel
          value="2"
          control={
            <Radio
              {...controlProps("2")}
              sx={{
                color: blueGrey[800],
                "&.Mui-checked": {
                  color: blueGrey[600],
                },
              }}
              size="small"
            />
          }
          label="2"
        />
        <FormControlLabel
          value="3"
          control={
            <Radio
              {...controlProps("3")}
              sx={{
                color: blueGrey[800],
                "&.Mui-checked": {
                  color: blueGrey[600],
                },
              }}
              size="small"
            />
          }
          label="3"
        /> */}
      </RadioGroup>
    </FormControl>
  );
}
