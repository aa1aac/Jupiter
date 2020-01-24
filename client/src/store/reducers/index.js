import { combineReducers } from "redux";

import usersReducer from "./users";

export default combineReducers({
  user: usersReducer
});

console.log(combineReducers.user);
