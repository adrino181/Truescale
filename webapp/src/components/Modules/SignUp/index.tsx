import { useState, useEffect } from "react";
import PersonalDetails from "./components/PersonalDetails";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { registerUser, setUser } from "@/redux/authSlice";
import { useAuth } from "@/components/Blocks/Contexts/AuthContext";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
const ProfileGenerator = dynamic(
  () => import("@/components/Organism/ProfileGenerator"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
const steps = [
  "username",
  "personal-interest",
  "background-detail",
  "personal-detail",
];

const stepImages = ["manremote.png", "metaverse.png", "yo.png", "hand.png"];

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { error, user } = useAppSelector(
    // @ts-ignore
    (state) => state.auth
  );
  const theme = useTheme();
  const router = useRouter();
  const { handleGoogleSignup } = useAuth();

  const handleSubmit = (value: any) => {
    dispatch(registerUser({ ...value }));
  };

  return (
    <Container maxWidth="md">
      <Grid
        container
        sx={{
          height: "100%",
          justifyContent: "space-between",
          padding: { xs: "1rem 0" },
        }}
      >
        <Grid item xs={12} sm={8} md={5} sx={{ padding: "1rem 0" }}>
          <Box
            sx={{
              maxWidth: "50px",
              display: "flex",
              alignItems: "center",
              margin: "0 0 10px 0",
            }}
          >
            <ProfileGenerator />
            <Typography variant="h4" sx={{ ml: 2 }}>
              Welcome,
            </Typography>
          </Box>
          <Typography variant="body2" color="textPrimary" my={1}>
            Lets start with creating profile
          </Typography>
          <PersonalDetails
            theme={theme}
            onSubmit={handleSubmit}
            handleGoogleSignup={handleGoogleSignup}
          />
          {error.hasError && (
            <Typography sx={{ textAlign: "center", mt: 2 }} color="error">
              {error.errorMessage}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
