import axios from "axios";

import { GET_ERRORS, GET_DEPARTMENTS } from "./types";

export const getDepartments = () => (dispatch) => {
  axios
    .get("/api/departments/getDepartments")
    .then((res) => {
      dispatch({
        type: GET_DEPARTMENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
