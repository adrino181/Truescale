import { useState } from "react";
import {
  Button,
  CircularProgress,
  Input,
  useTheme,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "next/link";
import StyledInput from "@/components/Blocks/StyledInput";
import dynamic from "next/dynamic";
import { useAuth } from "@/components/Blocks/Contexts/AuthContext";
import GoogleLogin from "@/components/Blocks/Scripts/GoogleLogin";
// const GoogleLogin = dynamic(import("@/components/Blocks/Scripts/GoogleLogin"), {
//   ssr: false,
// });

export default function HomePageLogin({
  handleGoogleLogin,
  handleSubmit,
  handleFormToggle,
}) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  //@ts-ignore
  const { status } = useSelector((state: RootState) => state.auth);
  const theme = useTheme();

  return (
    <>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        {/* <StyledInput
          onChange={(e) =>
            setLoginData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          type="email"
          required
          name="email"
          color="secondary"
          value={loginData.email || ""}
          placeholder="Username/Email"
          fullWidth
          autoComplete="off"
          variant="outlined"
        />
        <StyledInput
          type="password"
          color="primary"
          required
          placeholder="Password"
          value={loginData.password || ""}
          onChange={(e) =>
            setLoginData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          name="password"
          fullWidth
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: theme.palette.secondary.main,
                    },
                  }}
                />
              }
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: theme.typography.body2.fontSize,
                },
                color: theme.palette.text.primary,
              }}
              label="Keep me logged in"
            />
          </FormGroup>
          <Typography
            style={{
              textDecoration: "none",

              backgroundColor: "inherit",
            }}
            onClick={handleFormToggle}
          >
            <Typography
              variant="body2"
              sx={{ color: theme.palette.secondary.main }}
            >
              {`Forget Password!`}
            </Typography>
          </Typography>
        </div>

        <Button
          sx={{
            margin: "1.5rem 0",
            padding: "12px 60px",
            color: "white",
            textTransform: "none",
          }}
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth
        >
          {status === "loading" ? (
            <CircularProgress size={24} sx={{ color: "#FFF" }} />
          ) : (
            "Log In"
          )}
        </Button> */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin handleGoogleLogin={handleGoogleLogin} />
        </Box>

        <Typography
          onClick={handleFormToggle}
          style={{
            textDecoration: "none",
            backgroundColor: "inherit",
            color: theme.palette.text.primary,
            cursor: "pointer",
          }}
        >
          <Typography
            variant="body2"
            sx={{ marginTop: "20px", color: theme.palette.text.primary }}
          >
            {`Don't have an account ?`}{" "}
            <span
              style={{
                color: theme.palette.text.primary,
                borderBottom: "1px solid red",
              }}
            >
              {`Create now`}
            </span>
          </Typography>
        </Typography>
      </form>
    </>
  );
}
