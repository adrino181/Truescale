import { combineReducers } from '@reduxjs/toolkit'

import generalSlice, {
  loadMoreAction,
  getTrending,
  updateFollow,
  updateLike,
  deletePost,
  updateLikeTrending,
  deletePostGeneral,
  followAuthorGeneral,
  addPostToWall

} from "./general"

import guildSlice from "./guild"

import ventSlice from "./vent"

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
  general: generalSlice,
  guild: guildSlice,
  vent: ventSlice,
})


