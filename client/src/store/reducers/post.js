import { POST, GET_POST, LIKE_POST } from "../types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case POST:
      return [...state, action.payload];
    case GET_POST:
      return [...action.payload];
    case LIKE_POST:
      state.splice(
        action.payload.key,
        1,
        (state[action.payload.key] = action.payload.post)
      );
    // return [...state, (state[action.payload.key] = action.payload.post)];
    default:
      return [...state];
  }
};
