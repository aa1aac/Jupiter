import { GET_USER, LOGOUT_USER, LOGIN_USER } from "../types";

const initialState = {
  _id: null,
  email: null,
  first_name: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
    case LOGIN_USER:
      return {
        ...state,
        _id: action.payload._id,
        first_name: action.payload.first_name,
        email: action.payload.email
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};
