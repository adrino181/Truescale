import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { getProfile } from "@/redux/profile";

import { getFollowers, getFollowings } from "@/redux/followSlice";
import { followingAccount } from "@/components/services/Api";

import {
  updateProfile,
  // getCoverage,
  updateProfileDetails,
} from "@/redux/profile";

const useProfile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const { followingStatus, followerStatus, followers, followings } =
    useAppSelector((state) => state.follow);
  const {
    imageUploadLoading,
    status,
    posts,
  } = useAppSelector((state) => state.profile);

  const profile = user;
  const profileLoading = status === "pending"
  useEffect(() => {
    if (profile?.userId) {
      dispatch(getFollowers(profile._id));
      dispatch(getFollowings(profile._id));
    }
  }, [dispatch, profile?.userId]);

  useEffect(() => {
    if (profile?._id && !posts) {
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

  const submitFile = async (imageData) => {
    try {
      if (!imageData) {
        throw new Error("Select a file first!");
      }

      const formData = new FormData();
      formData.append("file", imageData[0]);
      dispatch(updateProfile({ _id: profile._id, formData }));
      // handle success
    } catch (error) {
      // handle error
    }
  };

  const handleProfileEdit = (changedParmas, params) => {
    console.log("params of changes", changedParmas, params);
    // dispatch(
    //   updateProfileDetails({ _id: profile.userId._id, formData: changedParmas })
    // );
  };

  function hideFollow() {
    if (profile) {
      if (followings.length !== 0) {
        return (
          followings[0].followingId.includes(_id) || _id === profile.userId._id
        );
      }
    }
  }
  return {
    profile,
    status,
    handleFollow,
    handleProfileEdit,
    submitFile,
    hideFollow,
    imageUploadLoading,
    profileLoading,
    posts: []
  }
}


export default useProfile;
