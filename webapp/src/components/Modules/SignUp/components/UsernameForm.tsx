import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import NextButton from "./NextButton";
import { Typography } from "@mui/material";
import StyledInput from "@/components/Blocks/StyledInput";

const UsernameForm = ({ onSubmit }) => (
  <>
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
          <Typography variant="h5" sx={{ my: 2 }} color="text.primary">
            Choose a username
          </Typography>
          <Field
            placeholder="e.g saasguy"
            fullWidth
            name="username"
            as={StyledInput}
            type="text"
            error={Boolean(errors.username) && Boolean(touched.username)}
          />
          <div>
            <Typography variant="caption" sx={{ my: 2 }} color="secondary">
              {Boolean(errors.username) && errors.username}
            </Typography>
          </div>
          <NextButton />
        </Form>
      )}
    </Formik>
  </>
);

export default UsernameForm;
