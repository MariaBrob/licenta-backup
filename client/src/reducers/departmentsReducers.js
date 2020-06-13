import { GET_DEPARTMENTS } from "../actions/types";

const initialState = {
  allDepartments: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
        ...state,
        allDepartments: action.payload,
      };
    default:
      return state;
  }
}
