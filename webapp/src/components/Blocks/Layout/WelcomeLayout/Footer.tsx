import React, { useState, useRef } from "react";
import { Grid, Typography, Divider, Box } from "@mui/material";
import StyledInput from "@/components/Blocks/StyledInput";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import SocialLink from "@/components/Blocks/SocialLink";
import api from "@/components/services/Api";
import LoadingButton from "@mui/lab/LoadingButton";

const Footer = () => {
  const theme = useTheme();
  const footerRef = useRef();
  const [email, setEmail] = useState();
  const [status, setStatus] = useState("");
  const [err, setErr] = useState();
  const addSubscriber = () => {
    setStatus("loading");
    if (footerRef?.current) {
      clearInterval(footerRef.current);
    }
    footerRef.current = setTimeout(() => {
      api
        .post("/subscribe", { email })
        .then((res) => {
          setStatus("success");
        })
        .catch((e) => {
          setStatus("error");
        });
    }, 1000);
  };

  return (
    <Box sx={{ background: theme.palette.primary.main }}>
      <Divider color={theme.palette.text.primary} />
      {/* <Grid
        container
        sx={{
          padding: "50px 10px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
          5-minute Business Newsletter
        </Typography>
        <Grid item xs={11} sm={6} sx={{ textAlign: "center" }}>
          <StyledInput
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
            fullWidth
            sx={{ mt: 3, mb: 3 }}
            type="email"
          />

          <LoadingButton
            sx={{
              padding: "12px 60px",
              color: "white",
            }}
            variant="contained"
            color="secondary"
            type="submit"
            onClick={addSubscriber}
            loading={status === "loading"}
            disabled={status === "success"}
          >
            Subscribe
          </LoadingButton>
        </Grid>
        <div style={{ marginTop: "4px" }}>
          {status === "success" ? (
            <Typography variant="caption" color="textPrimary">
              {"Successfully added to list"}
            </Typography>
          ) : (
            <></>
          )}
        </div>
        <SocialLink />
      </Grid> */}
      <p
        style={{
          textAlign: "center",
          margin: "0px",
          background: theme.palette.tertiary.main,
          color: "white",
        }}
      >
        <Link
          style={{
            textAlign: "center",
            margin: "0px",
            background: theme.palette.tertiary.main,
            color: "white",
          }}
          href="privacy-policy"
        >
          Privacy Policy
        </Link>
        {"  "}|{"  "}
        <Link
          style={{
            textAlign: "center",
            margin: "0px",
            background: theme.palette.tertiary.main,
            color: "white",
          }}
          href="terms-condition"
        >
          Terms Condition
        </Link>
        {"  "}|{"  "}
        <Link
          style={{
            textAlign: "center",
            margin: "0px",
            background: theme.palette.tertiary.main,
            color: "white",
          }}
          href="contact-us"
        >
          Contact Us
        </Link>
        {"  "}|{"  "}
        <Link
          style={{
            textAlign: "center",
            margin: "0px",
            background: theme.palette.tertiary.main,
            color: "white",
          }}
          href="cancellation-policy"
        >
          Cancellation & Refund
        </Link>
      </p>
      <p
        style={{
          textAlign: "center",
          margin: "0px",
          background: theme.palette.tertiary.main,
          color: theme.palette.text.primary,
        }}
      >
        Truescale © {new Date().getFullYear()}
      </p>
    </Box>
  );
};

export default Footer;
