import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { blueGrey } from "@mui/material/colors";

export default function SeverityLevelRadio({ handleSeveritySelect }) {
    const [selectedValue, setSelectedValue] = React.useState("0");
    
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
      console.log(event.target.value)
      handleSeveritySelect(event.target.value);
    };

    const controlProps = (item) => ({
      checked: selectedValue === item,
      onChange: handleChange,
      value: item,
      name: "size-radio-button-demo",
      inputProps: { "aria-label": item },
  });
  
  return (
    <FormControl>
      <FormLabel id="SeverityLevelInput">Severity</FormLabel>
      <RadioGroup
        row
        aria-labelledby="SeverityLevelInput"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value={0}
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
          value={1}
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
          value={2}
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
          value={3}
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
        />
      </RadioGroup>
    </FormControl>
  );
}