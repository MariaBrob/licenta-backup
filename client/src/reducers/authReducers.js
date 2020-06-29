import {
  SET_CURRENT_USER,
  USER_LOADING,
  SET_ALL_USERS,
  SET_EDIT_USERS,
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  allUsers: [],
  selectedUser: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case SET_EDIT_USERS:
      return {
        ...state,
        selectedUser: action.payload,
      };
    default:
      return state;
  }
}
