import { Typography, Button } from "@mui/material";
import CheckBoxControl from "./CheckBoxControl";
import { initialSelectionData } from "./constant";
import RadioGroupControl from "./RadioGroupControl";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import NextButton from "./NextButton";

const PersonalInterest = ({ theme, onSubmit }) => {
  return (
    <>
      <Formik
        initialValues={{ industry: "" }}
        onSubmit={onSubmit}
        validationSchema={object({
          industry: string().required("!!! field is required"),
        })}
      >
        {({ errors, isValid, touched, dirty, values, setFieldValue }) => (
          <Form>
            <RadioGroupControl
              value={values.industry.toString() || ""}
              onChange={(e) => setFieldValue(e.target.name, e.target.value)}
              items={initialSelectionData}
              theme={theme}
              label="Are you an entrepreneur ?"
              name="industry"
            />
            <div>
              <Typography variant="caption" sx={{ my: 2 }} color="secondary">
                {Boolean(errors.industry) && errors.industry}
              </Typography>
            </div>
            <div>
              <NextButton />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PersonalInterest;
