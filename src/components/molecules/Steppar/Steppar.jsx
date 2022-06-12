import React from "react";
import { makeStyles } from "@mui/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  }
}));

const getSteps = ()=> {
  return ["Basic Setup", "Additional Functionality", "Confirm"];
}

export default function Steppar(props) {
  const classes = useStyles();
  const steps = getSteps();
  return (
    <div className={classes.root}>
      <Stepper activeStep={props.activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>    
    </div>
  );
}