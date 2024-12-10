import React, {
  useEffect,
  useState,
} from "react";
import { Button, CircularProgress, Grid, Input, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import ActionBar, { ButtonActionItem } from "@/components/Blocks/ActionBar";

import { getIdFromUrl } from "@/utils/converter";
import Head from "next/head";
import UserCard from "./components/UserCard";
import EditorView from "./components/EditorView";
import dynamic from "next/dynamic";
import AuthScreen from "@/components/Modules/Auth";
import Modal from "@/components/Modal";
import Chip from "@mui/material/Chip";
import ScrollView from "@/components/Blocks/ScrollView";
import { useAnalytics } from "@/components/Blocks/Contexts/AnalyticsContext";
import { UsePostHook } from "./hooks";

const Comments = dynamic(() => import("@/components/Blocks/Comments"), {
  ssr: false,
});

const Tags = ({ data }: { data: [String] }) => {
  return (data || []).map((value) => (
    <Chip
      color="secondary"
      sx={{ mr: 2, my: 1 }}
      label={`#${value}`}
      key={value as string}
    />
  ));
};


export default function ViewPost({ props }) {
  const { status: userStatus } = useAppSelector((state) => state.auth);
  const { sendEvent, isTrackerLoaded } = useAnalytics();
  const [loginModal, setLoginModal] = useState(false);
  const { deletePostHandler, updateLikeHandler, getCommentsHandler, addCommentHandler } = UsePostHook();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { slug } = router.query;
  const id = slug?.[1];
  const hexId = getIdFromUrl(id || "");

  useEffect(() => {
    if (isTrackerLoaded) {
      // console.log("this is view post", props, window.umami);
      const trakcerId = props.trackerId;
      sendEvent({ website: trakcerId, name: "Page View" });
    }
    return () => {
      // dispatch(resetData({ param: "postDetails" }));
      // dispatch(resetData({ param: "comments" }));
    };
  }, [dispatch, hexId, isTrackerLoaded, userStatus]);

  useEffect(() => {
    if (userStatus === "rejected") {
      setLoginModal(true);
    }
  }, [userStatus]);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const tagsData: [String] = props?.tags || [];
  const keywordsMeta = tagsData.join(",");
  const imageUrl =
    props?.postData?.image ||
    "https://truescale-bucket.s3.ap-south-1.amazonaws.com/web-asset/Vector.png";
  const author =
    props?.postData?.author?.firstName ||
    props?.postData?.author?.handle ||
    "Truescale";
  // const commentsLength = comments?.length || 0;
  const showLoginModal = userStatus === "rejected";

  const handleLike = async (e) => {
    e.preventDefault();
    if (userStatus === "fulfilled") {
      updateLikeHandler(props._id);
    } else {
      setLoginModal(true);
    }
  };

  const handleAddComments = async (message) => {
    if (userStatus === "fulfilled") {
      addCommentHandler(hexId, message)
    } else {
      setLoginModal(true);
    }
  };

  const handleGetComments = async () => {
    if (Object.keys(props).length && hexId) {
      getCommentsHandler(hexId);
    }
  }

  const buttonAction = React.useMemo(() => {
    const isLoggedIn = userStatus === "fulfilled";
    const buttonActionData: ButtonActionItem[] = [
      {
        buttonSlug: "like",
        action: handleLike,
        label: props.likesCount || 0,
        active: props.isLiked,
      },
      {
        buttonSlug: "comment",
        label: props?.commentsCount || 0,
      },
      {
        buttonSlug: "view",
        label: props?.views || 0,
      },
      {
        buttonSlug: "comments",
        action: async () => setLoginModal(true),
        type: "rhs",
        label: props?.commentsCount || 0,
      }
    ];
    if (!isLoggedIn) {
      buttonActionData.push({
        buttonSlug: "login",
        action: async () => setLoginModal(true),
        label: "",
        type: "rhs",
      });
    }
    return buttonActionData;
  }, [userStatus]);

  return (
    <>
      <Head>
        <title>{props?.postData?.title}</title>
        <meta name="description" content={props?.postData?.subheading} />
        <meta name="keywords" content={keywordsMeta} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:image" content={imageUrl} />
        <meta name="author" content={author} />
      </Head>
      <ScrollView>
        <UserCard props={props} />
        <EditorView props={props} />
        <Box pt={3}>
          <ActionBar buttonAction={buttonAction} />
          <Tags data={tagsData} />
        </Box>
        <Comments handleGetComments={handleGetComments} handleAddComments={handleAddComments} comments={props.comments} />
      </ScrollView>
      <Modal
        maxWidth="md"
        fullWidth
        open={loginModal}
        styledProp={{
          background: theme.palette.primary.main,
        }}
        handleClose={() => setLoginModal(false)}
      >
        <AuthScreen />
      </Modal>
    </>
  );
}
