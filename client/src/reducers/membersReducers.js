import { GET_VOLUNTEERS, GET_VOLUNTEERS_DEP } from "../actions/types";

const initialState = {
  allVolunteers: [],
  departments: {
    board: [],
    pr: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VOLUNTEERS:
      return {
        ...state,
        allVolunteers: action.payload,
      };
    case GET_VOLUNTEERS_DEP:
      return {
        ...state,
        departments: {
          ...state.departments,
          [action.dep]: action.payload,
        },
      };
    default:
      return state;
  }
}
