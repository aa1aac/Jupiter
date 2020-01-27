import axios from "axios";

import { GET_POST, POST, LIKE_POST } from "../../types";

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

export const likePost = (postId, key) => async dispatch => {
  const res = await axios.get(`/api/posts/${postId}/like`);

  dispatch({ type: LIKE_POST, payload: { post: res.data.post, key } });
};


