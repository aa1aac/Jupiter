import axios from "axios";

import { GET_POST, POST } from "../../types";

export const post = text => async dispatch => {
  const newTexts = text.split("\n");

  const res = await axios.post("/api/posts/", { text: newTexts });

  console.log(POST, res.data);
};

export const getPost = () => async dispatch => {};
