import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Grid, Typography, useTheme, Box } from "@mui/material";
import { useRouter } from "next/router";
import HomePageLogin from "./HomePageLogin";
import { RootState } from "@/redux/store";
import UnknownuserIcon from "@/components/svg/UnknownuserIcon.svg";
import { useAuth } from "@/components/Blocks/Contexts/AuthContext";

export const LoginPage = () => {
  const theme = useTheme();
  const { error, user } = useSelector((state: RootState) => state.auth);
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        minHeight: '100vh'
      }}
    >
      <Container sx={{ padding: "2rem 0 0 0" }} maxWidth="md">
        <Grid
          container
          sx={{
            alignItems: "space-between",
            justifyContent: "space-between",
          }}
          maxWidth="md"
        >
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              margin: {
                xs: "2rem 0 0 0",
                md: "0",
              },
            }}
          >
            <Grid item xs={12} md={8}>
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
              <HomePageLogin />
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

export default LoginPage;
