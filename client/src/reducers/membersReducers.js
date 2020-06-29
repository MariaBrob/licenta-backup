import {
  GET_VOLUNTEERS,
  GET_VOLUNTEERS_DEP,
  GET_VOLUNTEER_BY_ID,
  GET_VOLUNTEER_PROJECTS,
  GET_VOLUNTEER_COMMENTS,
  SORT_VOLUNTEERS_BY_YEAR,
} from "../actions/types";

const initialState = {
  allVolunteers: [],
  selectedVolunteer: null,
  selectedVolunteerProjects: null,
  selectedVolunteerComments: null,
  sortedVolunteers: [],
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
    case GET_VOLUNTEER_BY_ID:
      return {
        ...state,
        selectedVolunteer: action.payload[0],
      };
    case GET_VOLUNTEER_PROJECTS:
      return {
        ...state,
        selectedVolunteerProjects: action.payload,
      };
    case GET_VOLUNTEER_COMMENTS:
      return {
        ...state,
        selectedVolunteerComments: action.payload,
      };
    case SORT_VOLUNTEERS_BY_YEAR:
      return {
        ...state,
        sortedVolunteers: action.payload,
      };
    default:
      return state;
  }
}
