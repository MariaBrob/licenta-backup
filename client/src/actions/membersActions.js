import axios from "axios";

import {
  GET_ERRORS,
  GET_VOLUNTEERS,
  GET_VOLUNTEERS_DEP,
  GET_VOLUNTEER_BY_ID,
  GET_VOLUNTEER_PROJECTS,
  GET_VOLUNTEER_COMMENTS,
  SORT_VOLUNTEERS_BY_YEAR,
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
      console.log(res.data[0].points);
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

export const updateVolunteerPointsNewTask = (
  allVolunteersTask,
  year,
  difficulty
) => (dispatch) => {
  allVolunteersTask.forEach((element) => {
    axios
      .post("/api/members/updateVolunteerPointsNewTask", {
        volunteer_id: element,
        year: year,
        task_difficulty: difficulty,
      })
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
  });
};

export const updateVolunteerPointsFinishTask = (
  allVolunteersTask,
  year,
  typeFinished,
  difficulty
) => (dispatch) => {
  allVolunteersTask.forEach((element) => {
    console.log(element, year);
    axios
      .post("/api/members/updateVolunteerPointsFinishTask", {
        volunteer_id: element,
        year: year,
        type_finished: typeFinished,
        task_difficulty: difficulty,
      })
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
  });
};

export const updateVolunteerPointsFinishProject = (pm_id, mentor_id, year) => (
  dispatch
) => {
  axios
    .post("/api/members/updateVolunteerPointsFinishProject", {
      pm_id: pm_id,
      mentor_id: mentor_id,
      year: year,
    })
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

export const getBestVolunteers = () => (dispatch) => {
  axios
    .post("/api/members/getBest10VolunteersbyYear", { year: "2020" })
    .then((res) => {
      dispatch({
        type: SORT_VOLUNTEERS_BY_YEAR,
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
