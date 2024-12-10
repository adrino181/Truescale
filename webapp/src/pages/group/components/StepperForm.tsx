import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import TextField from "@mui/material/TextField";
import StyledInput from "@/components/Blocks/StyledInput";
import Container from "@mui/material/Container";
import styled from "@mui/system/styled";

const StepLabelStyled = styled(StepLabel)(({ theme }) => ({
  "& .Mui-active, & .Mui-completed": {
    color: `${theme.palette.secondary.main} !important`,
  },
}));

const FormikWrapper = ({ onSubmit, children }) => {
  return (
    <Formik
      initialValues={{ username: "" }}
      onSubmit={onSubmit}
      validationSchema={object({
        username: string()
          .required("Username is required")
          .matches(/^[a-zA-Z0-9]+$/, {
            message: (
              <Typography variant="caption" sx={{ my: 2 }}>
                only single alpha character allowed, e.g: SAASGUY
              </Typography>
            ),
          })
          .min(5, "should be more than 4")
          .max(9, "should be less than 9"),
      })}
    >
      {({ errors, isValid, touched, dirty, values, setFieldValue }) => (
        <Form>
          {children}
          <div>
            <Typography variant="caption" sx={{ my: 2 }} color="secondary">
              {Boolean(errors.username) && errors.username}
            </Typography>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const steps = [
  {
    label: "Add Tags",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

type StepperProp = {
  onSubmit: Function | (() => void);
};
export default function VerticalLinearStepper({ onSubmit }: StepperProp) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //create a form with user entry
  // user fills form and group created
  // route user to group page
  //

  return (
    <Container sx={{ maxWidth: 400 }}>
      <FormikWrapper onSubmit={onSubmit}>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabelStyled>Choose handle</StepLabelStyled>
            <StepContent>
              {/* {<Typography variant="h6" sx={{ my: 2 }} color="text.primary">
                Choose a username
              </Typography>} */}
              <Field
                placeholder="e.g saasguy"
                fullWidth
                name="username"
                as={StyledInput}
                type="text"
              />
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
                color="secondary"
              >
                Continue
              </Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabelStyled>Description</StepLabelStyled>
            <StepContent>
              <Typography variant="h6" sx={{ my: 2 }} color="text.primary">
                Add a short description
              </Typography>
              <TextField
                placeholder="MultiLine with rows: 2 and rowsMax: 4"
                multiline
                rows={2}
                maxRows={4}
              />
            </StepContent>
          </Step>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
              >
                {activeStep === 2 ? "Finish" : "Continue"}
              </Button>
              <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Back
              </Button>
            </div>
          </Box>
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </FormikWrapper>
    </Container>
  );
}
