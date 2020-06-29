import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  SET_ALL_USERS,
  SET_EDIT_USERS,
} from "./types";

export const registerUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => {
      dispatch({
        type: SET_ALL_USERS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deleteUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/deleteUser", userData)
    .then((res) => {
      dispatch({
        type: SET_ALL_USERS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      const { token, user_id } = res.data;
      console.log(res.data);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);

      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getAllUsers = () => (dispatch) => {
  axios
    .get("/api/users/getAllUsers")
    .then((res) => {
      dispatch({
        type: SET_ALL_USERS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getUser = (id) => (dispatch) => {
  console.log(id);
  axios
    .get("/api/users/getUser/" + id)
    .then((res) => {
      dispatch({
        type: SET_EDIT_USERS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const updateUser = (user) => (dispatch) => {
  console.log(user);
  axios
    .post("/api/users/updateUser", user)
    .then((res) => {
      dispatch({
        type: SET_ALL_USERS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");

  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
