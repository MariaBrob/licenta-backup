import axios from "axios";

import { GET_ERRORS, GET_DEPARTMENTS } from "./types";

export const getDepartments = () => (dispatch) => {
  axios
    .get("/api/departments/getDepartments")
    .then((res) => {
      const volunteers = res.data;
      dispatch({
        type: GET_DEPARTMENTS,
        payload: volunteers,
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
