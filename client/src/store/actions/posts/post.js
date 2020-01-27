import axios from "axios";

import { GET_POST, POST } from "../../types";

export const post = text => async dispatch => {
  const newTexts = text.split("\n");

  const res = await axios.post("/api/posts/", { text: newTexts });

  dispatch({ type: POST, payload: res.data.post });
};

export const getPost = () => async dispatch => {
  const res = await axios.get("/api/posts/");
  console.log(res.data.posts);
  dispatch({ type: GET_POST, payload: res.data.posts });
};
