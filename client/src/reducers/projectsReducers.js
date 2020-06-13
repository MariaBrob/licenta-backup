import {
  GET_PROJECTS,
  GET_PROJECT_TASKS,
  GET_PROJECT_ID,
  GET_PROJECT_TASK_ID,
} from "../actions/types";

const initialState = {
  allProjects: [],
  selectedProject: null,
  selectedProjectTasks: null,
  selectedProjectTaskID: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS: {
      return {
        ...state,
        allProjects: action.payload,
      };
    }
    case GET_PROJECT_ID:
      return {
        ...state,
        selectedProject: action.payload,
      };
    case GET_PROJECT_TASKS:
      return {
        ...state,
        selectedProjectTasks: action.payload,
      };
    case GET_PROJECT_TASK_ID:
      return {
        ...state,
        selectedProjectTaskID: action.payload,
      };
    default:
      return state;
  }
}
