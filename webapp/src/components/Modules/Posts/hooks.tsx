import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { startTransition } from "react";

import {
  asyncToolData,
  editPost,
  addPost,
  getPostDetails,
  editResetData as resetData,
  updateLike,
  updateLikeTrending,
  loadMoreAction,
  deletePost,
  getTrending,
  followAuthorGeneral,
  resetDataWrite,
  getComments,
  addCommentAction
} from "@/redux/posts"
import { updateFollow } from "@/redux/profile"
import { debounce } from "@/utils/debounce";

import { addComment } from "@/components/services/Api";

export const UsePostHook = () => {
  //const [loading, isLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { status, user, profileStatus } = useAppSelector((state) => state.auth);
  const { status: writeStatus } = useAppSelector((state) => state.post.write);
  const { status: loadMorePageStatus } = useAppSelector((state) => state.post.trending.general.loadMore);
  const debounceRef = useRef(debounce);
  const router = useRouter();

  const addPostHandler = (param) => {
    dispatch(addPost(param));
  };

  const editPostHandler = (param) => {
    dispatch(editPost(param))
  };

  const addArticleHandler = (param) => {
    dispatch(addPost(param));
  };

  const updateLikeHandler = (id: string, callback?: () => void) => {
    dispatch(updateLikeTrending({ id }));
    dispatch(updateLike({ id }));
    if (callback) {
      callback();
    }
  }

  const addCommentHandler = async (id: string, message: string) => {
    let result = await dispatch(addCommentAction({ id, message }));
    return result;
  }

  const followAuthorHandler = debounceRef.current((params: { follow: boolean, id: string }) => {
    dispatch(followAuthorGeneral(params));
    dispatch(updateFollow(params));
  }, 800);

  const bookmarkPostHandler = () => {

  }


  const saveToDraftHandler = () => {

  }


  const getCommentsHandler = async (id: string) => {
    const response = await dispatch(getComments({ id: id }));
    return response;
  }

  const deletePostHandler = async (id: string, callback: () => void) => {
    const response = await dispatch(deletePost({ id: id }));
    if (response.payload === "SUCESS") {
      callback();
    }
  };

  return {
    addPostHandler,
    editPostHandler,
    addArticleHandler,
    updateLikeHandler,
    addCommentHandler,
    followAuthorHandler,
    bookmarkPostHandler,
    deletePostHandler,
    writeStatus,
    getCommentsHandler,
  };
};
