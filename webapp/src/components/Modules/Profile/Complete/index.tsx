import React, { startTransition, useEffect } from "react";
import FormBuilder from "@/components/Blocks/FormBuilder";
import Container from "@mui/material/Container";
import { profileConfig } from "./profileForm";
import { FormLayout } from "@/components/Blocks/FormBuilder/layouts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import api from "@/components/services/Api";
import { createProfileAndLogin } from "@/redux/profile";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";

const ProfileForm = () => {
  const { status, user, profileStatus } = useAppSelector((state) => state.auth);
  const { status: isProfileLoading } = useAppSelector((state) => state.profile);
  const profileLoading = isProfileLoading === "pending"
  const dispatch = useAppDispatch();
  const router = useRouter();
  const submitHandler = (params) => {
    dispatch(createProfileAndLogin(params));
  };
  const saveAndExitHandler = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (status === "fulfilled" && profileStatus === "fulfilled") {
      startTransition(() => {
        router.push(`/home`);
      });
    }
  }, [status, profileStatus]);

  return (
    <Box
      sx={{
        padding: { md: "5rem 0", xs: "0" },
        width: "100%",
        height: "100vh",
      }}
    >
      <FormBuilder
        config={profileConfig}
        startingStep={0}
        fieldsContainer={FormLayout.FieldsContainer}
        navigationContainer={FormLayout.NavigationContainerRow}
        submitHandler={submitHandler}
        setExternalError={() => { }}
        onSuccessRedirectTo="/"
        loading={profileLoading}
      />
    </Box>
  );
};

export default ProfileForm;
