import {
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
} from "../actions/types";

const initialState = {
  allVolunteers: [],
  selectedVolunteer: null,
  selectedVolunteerProjects: null,
  selectedVolunteerComments: null,
  sortedVolunteers: [],
  sortedVolunteersYear: [],
  sortedVolunteersDep: [],
  sortedVolunteersWorstYear: [],
  sortedVolunteersWorstDep: [],
  sortedVolunteersWorstAll: [],
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
        sortedVolunteersYear: action.payload,
      };
    case SORT_VOLUNTEERS_BY_DEP:
      return {
        ...state,
        sortedVolunteersDep: action.payload,
      };
    case SORT_VOLUNTEERS:
      return {
        ...state,
        sortedVolunteers: action.payload,
      };
    case SORT_VOLUNTEERS_WORST:
      return {
        ...state,
        sortedVolunteersWorstYear: action.payload,
      };
    case SORT_VOLUNTEERS_WORST_BY_DEP:
      return {
        ...state,
        sortedVolunteersWorstDep: action.payload,
      };
    case SORT_VOLUNTEERS_WORST_ALL:
      return {
        ...state,
        sortedVolunteersWorstAll: action.payload,
      };
    default:
      return state;
  }
}
