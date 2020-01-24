import axios from "axios";

import { GET_USER, LOGOUT_USER, LOGIN_USER } from "../../types";

export const getUser = () => async dispatch => {
  const res = axios.get("/api/user");

  console.log(GET_USER, res.data);
  dispatch({ type: GET_USER, payload: res.data.user });
};

export const loginUser = (email, password) => async dispatch => {
  const res = await axios.post("/api/user/login", { email, password });

  console.log(LOGIN_USER, res.data);

  dispatch({ type: LOGIN_USER, payload: res.data.user });

  //   todo message
};

export const signupUser = async (
  first_name,
  last_name,
  email,
  password,
  confirm
) => {
  const res = axios.post("/api/user/signup", {
    first_name,
    last_name,
    email,
    password,
    confirm
  });

  // todo message
};

export const logoutUser = () => {};
