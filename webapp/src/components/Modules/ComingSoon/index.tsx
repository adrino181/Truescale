import theme from "@/styles/theme";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Timer from "@/components/Blocks/Timer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Image from "next/image";
import Button from "@mui/material/Button";
import CoffeeIcon from "@/components/svg/CoffeeIcon.svg";
import { styled } from "@mui/material";
import api from "@/components/services/Api";
import { useAuth } from "@/components/Blocks/Contexts/AuthContext";

const paymentLink = "https://buy.stripe.com/fZeg2U4PmeiW1dCeUU";
const CoffeeButton = styled(Button)(() => ({
  background: "#926606",
  marginTop: "10px",
  marginBottom: "20px",
  "&:hover": {
    background: "#926000",
  },
}));
const ComingSoon = () => {
  const theme = useTheme();
  const [users, setUser] = useState(0);
  const { setGlobalApiHeader } = useAuth();
  const fetchUsers = () => {
    setGlobalApiHeader();
    api
      .get("/auth/users")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((e) => {
        return;
      });
  };
  useEffect(() => {
    if (window) {
      fetchUsers();
    }
  }, []);
  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item md={8} xs={12} sx={{ mt: 4 }}>
          <Typography variant="h3" color="textPrimary">
            <span style={{ color: "#5B4FE9" }}>TrueScale</span> will be live
            soon...
          </Typography>
          <Typography
            sx={{ maxWidth: "70%", mt: 1 }}
            variant="subtitle1"
            color="textSecondary"
          >
            Enabling individuals, entrepreneurs and businesses to reach their
            full potential.
          </Typography>
          <Box sx={{ my: 5 }}>
            <Timer />
          </Box>
          {users ? (
            <Typography variant="h5" color="textPrimary" sx={{ mt: 6, mb: 4 }}>
              <span
                style={{
                  color: "#5B4FE9",
                  fontSize: "50px",
                  marginRight: "5px",
                }}
              >
                {users}
              </span>
              people have already reached here
            </Typography>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item md={4}>
          <CoffeeButton
            variant="contained"
            endIcon={<CoffeeIcon />}
            size="small"
            href={paymentLink}
          >
            <Typography
              sx={{
                background: "#000F2D",
                textTransform: "none",
                px: 4,
                py: 1,
              }}
            >
              Buy us a coffee
            </Typography>
          </CoffeeButton>
          <Box sx={{ display: { md: "block", xs: "none" } }}>
            <Image
              alt="welcome man"
              src="/assets/welcome_man.png"
              height="400"
              width="400"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ComingSoon;
