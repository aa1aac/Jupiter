import { combineReducers } from "redux";

import usersReducer from "./users";
import postReducer from "./post";


export default combineReducers({
  user: usersReducer,
  posts: postReducer,

});
