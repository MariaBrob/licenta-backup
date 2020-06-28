import axios from "axios";
import {
  GET_ERRORS,
  GET_PROJECTS,
  GET_PROJECT_ID,
  GET_PROJECT_TASKS,
  GET_PROJECT_TASK_ID,
} from "./types";

export const addProject = (data) => (dispatch) => {
  axios
    .post("/api/projects/addProject", data)
    .then((res) => {
      const projects = res.data;
      dispatch({
        type: GET_PROJECTS,
        payload: projects,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getProjects = () => (dispatch) => {
  axios
    .get("/api/projects/getProjects")
    .then((res) => {
      const projects = JSON.parse(JSON.stringify(res.data));

      dispatch({
        type: GET_PROJECTS,
        payload: projects,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getProjectByID = (data) => (dispatch) => {
  axios
    .get("/api/projects/getProjectByID/" + data)
    .then((res) => {
      dispatch({
        type: GET_PROJECT_ID,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const updateProject = (data) => (dispatch) => {
  axios
    .put("/api/projects/updateProject", data)
    .then((res) => {
      const projects = res.data;
      dispatch({
        type: GET_PROJECTS,
        payload: projects,
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

export const updateTeam = (id, data) => (dispatch) => {
  var keys = Object.keys(data);
  var idArray = [];
  keys.forEach((key) => {
    data[key].forEach((element) => {
      idArray.push(element._id);
    });
  });

  axios
    .post("/api/projects/updateProjectTeam", {
      id: id,
      board: data.Board,
      hr: data.HR,
      pr: data.PR,
      visual: data.Visual,
      fr: data.FR,
      team_id: idArray,
    })
    .then((res) => {
      const projects = res.data;
      dispatch({
        type: GET_PROJECTS,
        payload: projects,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const addTask = (
  project,
  taskTeam,
  allVolunteers,
  description,
  deadline,
  difficulty
) => (dispatch) => {
  axios
    .post("/api/projects/addTask", {
      project,
      taskTeam,
      allVolunteers,
      description,
      deadline,
      difficulty,
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const updateTask = (task) => (dispatch) => {
  axios
    .post("/api/projects/updateTask", {
      task,
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getProjectTasks = (id) => (dispatch) => {
  axios
    .get("/api/projects/getProjectTasks/" + id)
    .then((res) => {
      dispatch({
        type: GET_PROJECT_TASKS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const returnProjectTasks = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/projects/getProjectTasks/" + id)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

export const getProjectTaskByID = (id) => (dispatch) => {
  axios
    .get("/api/projects/getProjectTaskByID/" + id)
    .then((res) => {
      dispatch({
        type: GET_PROJECT_TASK_ID,
        payload: res.data[0],
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const finishProject = (id, status, date) => (dispatch) => {
  axios
    .post("/api/projects/finishProject", {
      project_id: id,
      status: status,
      date_finished: date,
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_PROJECT_ID,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const finishTask = (id, status, date) => (dispatch) => {
  axios
    .post("/api/projects/finishTask", {
      task_id: id,
      status: status,
      date_finished: date,
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_PROJECT_TASK_ID,
        payload: res.data[0],
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
