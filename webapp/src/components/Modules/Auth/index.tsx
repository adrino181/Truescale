import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Grid, Typography, useTheme, Box } from "@mui/material";
import HomePageLogin from "./loginCard";
import { RootState } from "@/redux/store";
import UnknownuserIcon from "@/components/svg/UnknownuserIcon.svg";
import NoLayout from "@/components/Blocks/Layout/NoLayout";
import SignUpCard from "./signupCard";
import { useAuth } from "@/components/Blocks/Contexts/AuthContext";
import { useAppDispatch } from "@/redux/hooks";
import { registerUser, loginUser } from "@/redux/authSlice";

type AuthScreenProp = {
  hideHeading?: boolean;
};
export const AuthScreen = ({ hideHeading }: AuthScreenProp) => {
  const theme = useTheme();
  const { error, user } = useSelector((state: RootState) => state.auth);
  const [authMode, setAuthMode] = React.useState("login");
  const dispatch = useAppDispatch();
  const toggleAuthMode = () => {
    setAuthMode((prev) => (prev === "login" ? "signup" : "login"));
  };

  const { handleGoogleSignup, handleGoogleLogin } = useAuth();

  const handleSignup = (value: any) => {
    dispatch(registerUser({ ...value }));
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    // @ts-ignore: payload of thunk
    dispatch(loginUser(e));
  };

  return (
    <Box
      sx={{
        height: "100%",
        textAlign: "center",
      }}
    >
      {!hideHeading && (
        <>
          <Typography
            color="textPrimary"
            variant="h1"
            sx={{ fontWeight: "bold" }}
          >
            TRUE SCALE
          </Typography>
          <Typography
            color="textPrimary"
            variant="h6"
            sx={{ fontWeight: "bold" }}
          >
            Build Business And Network
          </Typography>
        </>
      )}
      <Container sx={{ padding: "2rem 0 0 0" }}>
        <Grid
          container
          sx={{
            alignItems: "space-between",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              margin: {
                xs: "2rem 0 0 0",
                md: "0",
              },
            }}
          >
            <Grid item xs={12} md={8} sx={{ minHeight: "200px" }}>
              {user?.handle ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <UnknownuserIcon />
                  <Typography
                    style={{ marginLeft: "5px" }}
                    color="text.primary"
                  >
                    {user?.handle}
                  </Typography>
                </div>
              ) : (
                <></>
              )}
              {authMode === "login" ? (
                <HomePageLogin
                  handleGoogleLogin={handleGoogleLogin}
                  handleSubmit={handleLogin}
                  handleFormToggle={toggleAuthMode}
                />
              ) : (
                <SignUpCard
                  theme={theme}
                  onSubmit={handleSignup}
                  handleGoogleSignup={handleGoogleSignup}
                  handleFormToggle={toggleAuthMode}
                />
              )}
              {error.hasError && (
                <Typography sx={{ textAlign: "center", mt: 2 }} color="error">
                  {error.errorMessage}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

AuthScreen.Layout = NoLayout;

export default AuthScreen;
