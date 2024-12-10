import { combineReducers } from '@reduxjs/toolkit'
import generalSlice, {
  loadMoreAction,
  getTrending,
  updateLikeTrending,
  deletePostGeneral,
  followAuthorGeneral,
  addPostToWall
} from "./main"
import {
  updateFollow,
  updateLike,
  deletePost
} from "./actions";
import loadMoreSlice from './loadMore'

export {
  loadMoreAction,
  getTrending,
  updateFollow,
  updateLike,
  deletePost,
  updateLikeTrending,
  deletePostGeneral,
  followAuthorGeneral,
  addPostToWall
}

export default combineReducers({
  main: generalSlice,
  loadMore: loadMoreSlice,
})


