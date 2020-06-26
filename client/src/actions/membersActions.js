import axios from "axios";

import {
  GET_ERRORS,
  GET_VOLUNTEERS,
  GET_VOLUNTEERS_DEP,
  GET_VOLUNTEER_BY_ID,
  GET_VOLUNTEER_PROJECTS,
  GET_VOLUNTEER_COMMENTS,
} from "./types";

export const addVolunteer = (data) => (dispatch) => {
  axios.post("/api/members/addVolunteer", data).catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  );
};

export const updateVolunteer = (data) => (dispatch) => {
  console.log(data);
  axios
    .post("/api/members/updateVolunteer", data)
    .then((res) => {
      dispatch({
        type: GET_VOLUNTEERS,
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

export const deleteVolunteer = (data) => (dispatch) => {
  axios.post("/api/members/deleteVolunteer", { _id: data }).catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  );
};

export const getAllVolunteers = () => (dispatch) => {
  axios
    .get("/api/members/getVolunteers")
    .then((res) => {
      dispatch({
        type: GET_VOLUNTEERS,
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

export const getVolunteersByDep = () => (dispatch) => {
  axios
    .get("/api/members/getVolunteersByDepartment")
    .then((res) => {
      dispatch({
        type: GET_VOLUNTEERS_DEP,
        dep: "board",
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

export const getVolunteerByID = (id) => (dispatch) => {
  axios
    .get("/api/members/getVolunteerByID/" + id)
    .then((res) => {
      dispatch({
        type: GET_VOLUNTEER_BY_ID,
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

export const returnVolunteerByID = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/members/getVolunteerByID/" + id)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

export const addComment = (volunteer_id, date, comment) => (dispatch) => {
  let volunteerby_id = localStorage.getItem("user_id");
  axios
    .post("/api/comments/addComment", {
      volunteer_id,
      volunteerby_id,
      date,
      comment,
    })
    .then((res) => {
      dispatch({
        type: GET_VOLUNTEER_COMMENTS,
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

export const getComments = (volunteer_id) => (dispatch) => {
  axios
    .get("/api/comments/getComments/" + volunteer_id)
    .then((res) => {
      dispatch({
        type: GET_VOLUNTEER_COMMENTS,
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

export const getVolunteerProjects = (volunteer_id) => (dispatch) => {
  axios
    .get("/api/members/getVolunteerProjects/" + volunteer_id)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_VOLUNTEER_PROJECTS,
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
