import axios from "axios";

import {
  GET_ERRORS,
  GET_VOLUNTEERS,
  GET_VOLUNTEERS_DEP,
  GET_VOLUNTEER_BY_ID,
  GET_VOLUNTEER_PROJECTS,
  GET_VOLUNTEER_COMMENTS,
  SORT_VOLUNTEERS_BY_YEAR,
  SORT_VOLUNTEERS_BY_DEP,
  SORT_VOLUNTEERS,
  SORT_VOLUNTEERS_WORST,
  SORT_VOLUNTEERS_WORST_BY_DEP,
  SORT_VOLUNTEERS_WORST_ALL,
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

export const addComment = (volunteer_id, date, comment, volunteer_name) => (
  dispatch
) => {
  let volunteerby_id = localStorage.getItem("user_id");
  axios
    .post("/api/comments/addComment", {
      volunteer_id,
      volunteerby_id,
      volunteer_name,
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

export const getBestVolunteers = (year) => (dispatch) => {
  axios
    .post("/api/members/getBest10Volunteers", { year: year })
    .then((res) => {
      dispatch({
        type: SORT_VOLUNTEERS,
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

export const getBestVolunteersDep = (year) => (dispatch) => {
  axios
    .post("/api/members/getBest10VolunteersbyDep", { year: year })
    .then((res) => {
      dispatch({
        type: SORT_VOLUNTEERS_BY_DEP,
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

export const getBestVolunteersYear = (year) => (dispatch) => {
  axios
    .post("/api/members/getBest10VolunteersbyYear", { year: year })
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

export const getWorstVolunteersYear = (year) => (dispatch) => {
  axios
    .post("/api/members/getWorst10Volunteers", { year: year })
    .then((res) => {
      dispatch({
        type: SORT_VOLUNTEERS_WORST,
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

export const getWorstVolunteersDep = (year) => (dispatch) => {
  axios
    .post("/api/members/getWorst10VolunteersDep", { year: year })
    .then((res) => {
      dispatch({
        type: SORT_VOLUNTEERS_WORST_BY_DEP,
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

export const getWorstVolunteersChart = (year) => (dispatch) => {
  axios
    .post("/api/members/getWorst10VolunteersDepChart", { year: year })
    .then((res) => {
      dispatch({
        type: SORT_VOLUNTEERS_WORST_ALL,
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
