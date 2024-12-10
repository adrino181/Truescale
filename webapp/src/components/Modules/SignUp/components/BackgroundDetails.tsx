import { Typography, Button, MenuItem, Select } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import RadioGroupControl from "./RadioGroupControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import NextButton from "./NextButton";

const BackgroundDetail = ({ onSubmit, initialSelectionData, values }) => {
  //@ts-ignore
  const theme = useTheme();
  const personalInterest = values.industry;
  const backgroundData = initialSelectionData.find(
    (item) => item.value.toString() === personalInterest.toString()
  );
  const subCategory = backgroundData?.subCategory;

  return (
    <>
      <Formik
        initialValues={{ background: "" }}
        onSubmit={onSubmit}
        validationSchema={object({
          background: string().required("!!! field is required"),
        })}
      >
        {({ errors, values, touched, setFieldValue }) => (
          <Form>
            {subCategory.type === "radio" ? (
              <RadioGroupControl
                theme={theme}
                onChange={(e) => setFieldValue("background", e.target.value)}
                value={values?.background.toString()}
                items={subCategory.data}
                label={subCategory.title}
                name="background"
              />
            ) : subCategory.type === "select" ? (
              <>
                <Typography variant="h5" sx={{ mt: 2 }} color="text.primary">
                  {subCategory.title}
                </Typography>
                <CustomSelect
                  value={values.background}
                  theme={theme}
                  onChange={(e) => setFieldValue("background", e.target.value)}
                />
                <div
                  style={{ background: "#41576B", borderRadius: "4px" }}
                ></div>
              </>
            ) : (
              <></>
            )}
            <div>
              <Typography variant="caption" sx={{ my: 2 }} color="secondary">
                {Boolean(errors.background) && errors.background}
              </Typography>
            </div>
            <NextButton />
          </Form>
        )}
      </Formik>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  paper: {
    background: "#192741",
    color: "white",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  color: "white",
  border: "none",
  "& .MuiSelect-icon": {
    color: "white",
  },
  "& .MuiSelect-select": {
    background: theme.palette.tertiary.main,
  },
}));

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    display: "none",
  },
}));
const CustomSelect = ({ value, onChange, theme }) => {
  const classes = useStyles();
  return (
    <StyledSelect
      id="sample-input-domain"
      value={value}
      label="Select your industry"
      input={<StyledOutlinedInput />}
      name="background"
      onChange={onChange}
      variant="filled"
      sx={{ width: "100%" }}
      MenuProps={{
        classes: {
          paper: classes.paper,
        },
      }}
    >
      <MenuItem value="entrepreneur">Entrepreneur</MenuItem>
      <MenuItem value="organisation">Organisation</MenuItem>
      <MenuItem value="student">Student</MenuItem>
      <MenuItem value="creator">Creator</MenuItem>
      <MenuItem value="visitor">Visitor</MenuItem>
      <MenuItem value="others">Others</MenuItem>
    </StyledSelect>
  );
};

export default BackgroundDetail;
