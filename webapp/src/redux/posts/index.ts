import { combineReducers } from '@reduxjs/toolkit'
import writeSlice from "./write"
import trendingSlice from "./trending"
import personalSlice from "./personal"

export * from "./actions"

export default combineReducers({
  write: writeSlice,
  trending: trendingSlice,
  personal: personalSlice,
  // delete: deleteSlice,
  //  commentsSlice,
  //  editSlice,
  //  likeSlice,
  //  bookmarkSlice,
})
