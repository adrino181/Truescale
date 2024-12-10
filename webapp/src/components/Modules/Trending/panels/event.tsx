import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { Box } from "@mui/system";
// import {
//   updateLike,
//   updateLikeTrending,
//   deletePost,
//   savePost,
// } from "@/redux/postSlice";
import { getTrending, loadMoreAction, updateLike, updateLikeTrending, deletePost } from "@/redux/posts"
import PostCard from "@/components/Blocks/Cards/postCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ActionBar from "@/components/Blocks/ActionBar";
import { useAuth } from "@/components/Blocks/Contexts/AuthContext";
import PostCardSkeleton from "@/components/Organism/Skeleton/PostCard";
import { useRouter } from "next/router";
import ScrollView from "@/components/Blocks/ScrollView";
import Button from "@mui/material/Button";
import { throttle, debounce } from "../helper"
import Link from "next/link";
import FilterTag from "../components/filter";
import { TabFilters } from "../components/type";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import IconButton from "@mui/material/IconButton";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import Input from "@mui/material/Input"
import StyledInput from "@/components/Blocks/StyledInput";
import Avatar from "@mui/material/Avatar"
import PlusSmooth from "@/components/svg/PlusSmooth.svg"
const initialFilters: { type: TabFilters, pageCount: number } = {
  type: 'RECENT',
  pageCount: 0,
}
const GroupFeed = ({ handleModal }) => {
  const [filters, setFilters] = React.useState(initialFilters)
  const [toggleFilter, setToggleFilter] = React.useState(true);
  const dispatch = useAppDispatch();
  const { status, trending } = useAppSelector(
    (state) => state.post.trending.general.trending
  );
  const { status: loadMoreStatus } = useAppSelector(
    (state) => state.post.trending.general.loadMore
  );
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const throttleRef = useRef(throttle);
  const { user } = useAuth();

  const handleToggleFilter = () => {
    setToggleFilter(!toggleFilter);
  };

  useEffect(() => {
    if (status !== "fulfilled") {
      dispatch(getTrending({}));
    }
  }, [dispatch]);

  const onScrollEnd = React.useCallback((interactionCount: number) => {
    // console.log(interactionCount);
    setFilters(prev => ({ ...prev, pageCount: interactionCount }));
    dispatch(loadMoreAction({ filters: { ...filters, pageCount: interactionCount } }));
  }, [dispatch]);


  const handleLike = useCallback(
    (id) => {
      dispatch(updateLikeTrending({ id }));
      dispatch(updateLike({ id }));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id) => {
      dispatch(deletePost(id));
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (id) => {
      router.push(`/edit/${id}`);
    },
    [dispatch]
  );

  const handleShare = useCallback(
    (id) => {
      dispatch(sharePost({ id }));
    },
    [dispatch]
  );

  const handleSave = useCallback(
    (id) => {
      dispatch(savePost({ id }));
    },
    [dispatch]
  );

  const handleReport = useCallback(
    (id) => {
      dispatch(handleReport({ id }));
    },
    [dispatch]
  );

  const buttonAction = useMemo(() => {
    return (post) => [
      {
        buttonSlug: "like",
        action: () => {
          handleLike(post?._id);
        },
        label: post.likesCount,
        active: post?.isLiked || 0,
      },
      {
        buttonSlug: "comment",
        label: post?.commentsCount || 0,
      },
      {
        buttonSlug: "view",
        label: post?.views || 0,
      },
    ];
  }, [handleLike]);

  const getUserAction = useCallback((id) => {
    return [
      {
        buttonSlug: "share",
        action: () => handleShare(id),
        label: "Share",
        active: false,
      },
      {
        buttonSlug: "delete",
        label: "Delete",
        action: () => handleDelete(id),
      },
      {
        buttonSlug: "report",
        label: "Report",
        action: () => handleReport(id),
      },
      {
        buttonSlug: "edit",
        label: "Edit",
        action: () => handleEdit(id),
      },
      {
        buttonSlug: "save",
        label: "Save",
        action: () => handleSave(id),
      },
    ];
  }, []);
  return (
    <>
      <Box sx={{
        padding: 0,
        background: theme.palette.primary.main,
        position: 'relative'
      }}>
        {toggleFilter ? <FilterTag /> : <></>}
        <Box sx={{ display: "flex", justifyContent: "center", padding: 0, alignItems: 'center' }}>
          {/* <ToggleBtn handleClick={handleToggleFilter} isOpen={toggleFilter} /> */}
          <StyledInput
            placeholder="Start by posting something"
            color="secondary"
            fullWidth
            autoComplete="off"
            variant="outlined"
            inputProps={{
              startAdornment: <Avatar
                sx={{ width: 36, height: 36 }}
                src={user.profileImageUrl} />,
              style: { paddingLeft: '10px' }
            }}
            onClick={handleModal}
          />
          <div
            style={{
              background: theme.palette.secondary.main,
              textTransform: "none",
              marginRight: "10px",
              position: 'absolute',
              right: 0,
              borderRadius: "50%",
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              padding: '0px 0px 0px 1px',
            }}>
            <IconButton
              sx={{
                height: '2.2rem',
                width: '2.2rem',
                minHeight: '2.2rem',
                minWidth: '2.2rem',
              }}
              onClick={handleModal}
            >
              <PlusSmooth style={{ color: 'white', height: '2rem', width: '2rem' }} />
            </IconButton>
          </div>
          <div>

          </div>
          {/* <Button */}
          {/*   color="inherit" */}
          {/*   component={Link} */}
          {/*   prefetch={false} */}
          {/*   href="/new-article" */}
          {/*   variant="outlined" */}
          {/* > */}
          {/*   Add Post */}
          {/* </Button> */}
        </Box>
      </Box>
      <ScrollView
        onScrollEnd={onScrollEnd}
        scrollEndLoading={loadMoreStatus === "pending"}
        loader={<PostCardSkeleton count={2} />}
      >
        {
          trending && trending.length > 0 ? (
            trending.map((post, index) => (
              <div
                style={{
                  minWidth: 100,
                  background: theme.palette.tertiary.main,
                  margin: "1rem 0"
                }}
                key={post?._id}
              >
                <PostCard
                  post={{
                    ...post,
                    action: getUserAction(post?._id),
                    user,
                    format: "TWO_GRID_FORMAT",
                  }}
                />
                <ActionBar
                  button={["like", "comment", "view"]}
                  buttonAction={buttonAction(post)}
                />
              </div>
            ))
          ) : (
            <>
              <PostCardSkeleton count={4} />
            </>
          )

        }
      </ScrollView>
    </>
  )
};
const ToggleBtn = ({ handleClick, isOpen }) => {
  return (
    <IconButton
      color="secondary"
      onClick={handleClick}
      aria-label="toogle filter"
    >
      {isOpen ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
    </IconButton>
  );
};
export default GroupFeed;

