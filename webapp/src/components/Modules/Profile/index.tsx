import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { CircularProgress, Grid, useTheme } from "@mui/material";

import ProfileCardUser from "./Components/ProfileCardUser";
import dynamic from "next/dynamic";
import useProfile from "./hooks";
const ProfileEdit = dynamic(import("./Edit"), {
  ssr: false,
});

const TabPane = dynamic(import("./Components/TabPane"), {
  ssr: false,
});
const Input = styled("input")({
  display: "none",
});

export default function Profile() {
  const theme = useTheme();
  const [editModal, setEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const {
    profile,
    status,
    handleFollow,
    handleProfileEdit,
    submitFile,
    hideFollow,
    imageUploadLoading,
    profileLoading
  } = useProfile();

  if (!profile) {
    return (
      <Box textAlign="center">
        <CircularProgress size={20} color="secondary" />
      </Box>
    );
  }
  return (
    <Box>
      <Box>
        <Grid container columns={16} direction="row" justifyContent="center">
          <Grid item md={16} xs={16}>
            <ProfileCardUser
              theme={theme}
              imageUploadLoading={imageUploadLoading}
              submitFile={submitFile}
              profile={profile}
              handleFollow={handleFollow}
              followerStatus={false}
              followingStatus={false}
              followings={[]}
              followers={[]}
              setEditModal={setEditModal}
              hideFollow={hideFollow}
            />
          </Grid>
          <Grid item xs={16} md={13}>
            <TabPane
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              profile={profile}
              posts={[]}
            />
          </Grid>
        </Grid>
      </Box>
      {editModal ? (
        <ProfileEdit
          open={editModal}
          handleClose={() => setEditModal(false)}
          configs={profile}
          submitHandler={handleProfileEdit}
          isLoading={status}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}
