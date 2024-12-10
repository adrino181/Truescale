import { Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import dynamic from "next/dynamic";
import PersonalInterest from "./PersonalInterest";
import PersonalDetail from "./PersonalDetails";
import BackgroundDetail from "./BackgroundDetails";
import UnknownuserIcon from "@/components/svg/UnknownuserIcon.svg";
import { initialSelectionData } from "./constant";
import UsernameForm from "./UsernameForm";

const ProfileGenerator = dynamic(
  () => import("@/components/Organism/ProfileGenerator"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
const initialFormData = {
  username: "",
  industry: "",
  email: "",
  password: "",
  background: "",
  confirmPassword: "",
};
export default function RegisterForm({
  theme,
  user,
  handleNext,
  activeStep,
  steps,
  handleGoogleSignup,
}) {
  return (
    <Box sx={{ maxWidth: "100%", margin: "auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <ProfileGenerator />
        {user.username ? (
          <Typography style={{ marginLeft: "5px" }} color="text.primary">
            @{user.username}
          </Typography>
        ) : (
          <Typography style={{ marginLeft: "5px" }} color="text.primary">
            e.g SaasGuy
          </Typography>
        )}
      </div>

      <>
        {steps[activeStep] === "username" ? (
          <UsernameForm onSubmit={handleNext} />
        ) : steps[activeStep] === "personal-interest" ? (
          <PersonalInterest theme={theme} onSubmit={handleNext} />
        ) : steps[activeStep] === "personal-detail" ? (
          <>
            <PersonalDetail
              onSubmit={handleNext}
              theme={theme}
              handleGoogleSignup={handleGoogleSignup}
            />
          </>
        ) : steps[activeStep] === "background-detail" ? (
          <BackgroundDetail
            initialSelectionData={initialSelectionData}
            onSubmit={handleNext}
            values={{ ...user }}
          />
        ) : (
          <></>
        )}
      </>
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
    </Box>
  );
}
