import Stepper from "@mui/material/Stepper";

export default function AppSteps () { 
return(

<Stepper
  steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
  activeStep={2}
/>
)
}