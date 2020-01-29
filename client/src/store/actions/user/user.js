import axios from "axios";
import { toast } from "react-toastify";

import { GET_USER, LOGOUT_USER, LOGIN_USER } from "../../types";

export const getUser = () => async dispatch => {
  const res = await axios.get("/api/user");

  dispatch({ type: GET_USER, payload: res.data.user });
};

export const loginUser = (email, password) => async dispatch => {
  const res = await axios.post("/api/user/login", { email, password });

  console.log(LOGIN_USER, res.data);

  if (res.data.error) {
    return toast.error(res.data.error);
  }

  if (res.data.msg) {
    toast.success(res.data.msg);

    dispatch({ type: LOGIN_USER, payload: res.data.user });
  }
};

export const signupUser = (
  first_name,
  last_name,
  email,
  password,
  confirm
) => async () => {
  const res = await axios.post("/api/user/signup", {
    first_name,
    last_name,
    email,
    password,
    confirm
  });

  console.log(res.data);

  if (res.data.error) {
    toast.error(res.data.error);
  }

  if (res.data.msg) {
    toast.success(res.data.msg);
  }
};

export const logoutUser = () => async dispatch => {
  try {
    await axios.get("/api/user/logout");

    dispatch({ type: LOGOUT_USER });
  } catch (error) {
    console.error(error);
  }
};
