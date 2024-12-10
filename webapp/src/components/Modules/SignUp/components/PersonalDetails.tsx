import StyledInput from "@/components/Blocks/StyledInput";
import { Button, Typography } from "@mui/material";
import CheckBoxControl from "./CheckBoxControl";
import { Field, Form, Formik } from "formik";
import { object, string, ref } from "yup";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Link from "next/link";
const GoogleLogin = dynamic(import("@/components/Blocks/Scripts/GoogleLogin"), {
  ssr: false,
});

const PersonalDetail = ({ theme, onSubmit, handleGoogleSignup }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      onSubmit={onSubmit}
      validationSchema={object({
        email: string().email().required("Email is required"),
        password: string()
          .required("Please enter your password")
          .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
          ),
        confirmPassword: string()
          .required("Please confirm your password")
          .oneOf([ref("password"), null], "Passwords don't match."),
      })}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <Field
            placeholder="Enter Email"
            fullWidth
            name="email"
            as={StyledInput}
            type="text"
            error={Boolean(errors.email) && Boolean(touched.email)}
          />
          <Typography variant="caption" sx={{ my: 2 }} color="secondary">
            {Boolean(errors.email) && errors.email}
          </Typography>
          <Field
            placeholder="Enter Password"
            fullWidth
            name="password"
            as={StyledInput}
            type="password"
            error={Boolean(errors.password) && Boolean(touched.password)}
          />
          <Typography variant="caption" sx={{ my: 2 }} color="secondary">
            {Boolean(errors.password) && errors.password}
          </Typography>
          <Field
            placeholder="Confirm Password"
            fullWidth
            name="confirmPassword"
            as={StyledInput}
            type="password"
            error={
              Boolean(errors.confirmPassword) &&
              Boolean(touched.confirmPassword)
            }
          />
          <Typography variant="caption" sx={{ my: 2 }} color="secondary">
            {Boolean(errors.confirmPassword) && errors.confirmPassword}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CheckBoxControl
              theme={theme}
              items={[{ label: "Keep me logged in" }]}
              onChange={(e) => setFieldValue("keepSession", e.target.value)}
            />
          </div>
          <Button
            sx={{
              margin: "1rem 0",
              padding: "12px 60px",
              color: "white",
              textTransform: "none",
            }}
            variant="contained"
            color="secondary"
            type="submit"
            fullWidth
          >
            Sign Up
          </Button>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin handleGoogleLogin={handleGoogleSignup} />
          </Box>
          <div style={{ marginTop: "10px" }}>
            <Typography variant="caption" color="text.secondary">
              Already have an account ?{" "}
            </Typography>
            <Link href="/login">
              <Typography
                variant="caption"
                sx={{
                  fontWeight: "bold",
                  borderBottom: "2px solid red",
                  paddingBottom: "1px",
                }}
                color="text.primary"
              >
                Log In
              </Typography>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalDetail;
