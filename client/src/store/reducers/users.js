import { GET_USER, LOGOUT_USER } from "../types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return {...state,
        user: action.payload
      };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};
