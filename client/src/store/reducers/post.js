import { POST, GET_POST } from "../types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case POST:
      return [...state, action.payload];
    case GET_POST:
      return [...state, action.payload];
    default:
      return [...state];
  }
};
