import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/redux/profile";

import { getFollowers, getFollowings } from "@/redux/followSlice";
import { followAccount, followingAccount } from "@/components/services/Api";

import { updateProfile, getCoverage } from "@/redux/profileSlice";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PostCard from "@/components/Blocks/Cards/postCard";
import { useAuth } from "@/components/Blocks/Contexts/AuthContext";
import TabPane from "../Components/TabPane";

const Input = styled("input")({
  display: "none",
});

export default function Profile() {
  const theme = useTheme();

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [modalImage, setModalImage] = useState("");
  const { followingStatus, followerStatus, followers, followings } =
    useSelector((state) => state.follow);
  const { user } = useAuth();
  const {
    imageUploadLoading,
    status,
    profile: userProfile,
    posts,
  } = useSelector((state) => state.profile);

  const profile = user;

  useEffect(() => {
    //if user is logged in then set the profile from auth
    // else fetch the profile of user and set
  }, [userProfile]);
  const { profileImageUrl } = profile || {};
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (profile?.userId) {
      dispatch(getFollowers(profile._id));
      dispatch(getFollowings(profile._id));
    }
  }, [dispatch, profile?.userId]);

  useEffect(() => {
    if (profile?._id && posts.length === 0) {
      dispatch(getProfile());
      // dispatch(getCoverage(profile.userId._id));
    }
  }, [dispatch, profile?.userId]);

  const handleFollow = async () => {
    const responseFollow = await followAccount({
      userId: profile.userId._id,
      followerId: _id,
    });
    const responseFlwing = await followingAccount({
      followingId: profile.userId._id,
      userId: profile.userId._id,
    });
    if (responseFollow) {
      dispatch(getFollowers(_id));
    }
    if (responseFlwing) {
      dispatch(getFollowings(_id));
    }
  };

  function hideFollow() {
    if (profile?.userId) {
      if (followings.length !== 0) {
        return (
          followings[0].followingId.includes(_id) || _id === profile.userId._id
        );
      }
    }
  }

  if (!profile) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress size={20} color="secondary" />
      </Box>
    );
  }

  return (
    <Box>
      <Box textAlign="center">
        {status === "loading" && <CircularProgress size={20} color="primary" />}
      </Box>
      <Box height="90vh">
        <Grid container columns={16} direction="row">
          <Grid item md={16} xs={16}>
            <Box position="relative">
              <Box
                sx={{
                  position: "relative",
                  padding: "20px 10px",
                  display: "flex",
                }}
              >
                <Grid container sm={16} justifyContent="center">
                  <Grid item>
                    <Box sx={{ position: "relative" }}>
                      <Avatar
                        alt="Profile"
                        src={profileImageUrl}
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          [theme.breakpoints.up("sm")]: {
                            width: 100,
                            height: 100,
                          },
                        }}
                        variant="rounded"
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      sx={{
                        [theme.breakpoints.up("sm")]: {
                          padding: "0 0 0 20px",
                        },
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "500",
                            textTransform: "capitalize",
                          }}
                        >
                          {profile && profile?.handle}
                        </Typography>
                        {!hideFollow() && (
                          <Button
                            onClick={handleFollow}
                            size="small"
                            sx={{
                              borderRadius: theme.shape.borderRadius,
                              textTransform: "capitalize",
                              padding: "6px 20px",
                              background: "black",
                              "&:hover": {
                                background: "#333",
                              },
                            }}
                            variant="contained"
                          >
                            Listen
                          </Button>
                        )}
                      </div>

                      <Box display="flex">
                        <Typography color="textPrimary" marginRight="1rem">
                          <strong style={{ color: "white" }}>
                            {followerStatus === "success" &&
                              followers.length !== 0
                              ? followers[0].followerId.length
                              : 0}
                          </strong>{" "}
                          Listeners
                        </Typography>
                        <Typography color="textPrimary">
                          <strong style={{ color: "white" }}>
                            {followingStatus === "success" &&
                              followings.length !== 0
                              ? followings[0].followingId.length
                              : 0}
                          </strong>{" "}
                          Listening
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item md={16}>
            <Box>
              <TabPane
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                profile={profile}
                posts={posts}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
