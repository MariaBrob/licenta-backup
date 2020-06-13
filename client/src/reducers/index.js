import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import membersReducer from "./membersReducers";
import projectsReducers from "./projectsReducers";
import departmentsReducers from "./departmentsReducers";

export default combineReducers({
  auth: authReducer,
  volunteers: membersReducer,
  projects: projectsReducers,
  departments: departmentsReducers,
  errors: errorReducer,
});
