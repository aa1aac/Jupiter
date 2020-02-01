import { combineReducers } from "redux";

import usersReducer from "./users";
import postReducer from "./post";
import messageReducer from "./message";

export default combineReducers({
  user: usersReducer,
  posts: postReducer,
  messages: messageReducer
});
