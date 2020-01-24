import { LOGIN_USER, LOGOUT_USER } from "../types";

let initialState = {
  _id: null,
  first_name: null,
  email: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        _id: action.payload._id,
        first_name: action.payload.first_name,
        email: action.payload.email
      };

    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};
