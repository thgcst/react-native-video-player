import { Reducer } from 'redux';
import { CoursesState, CoursesTypes } from './types';

const INITIAL_STATE: CoursesState = {
  courses: [],
  error: false,
  loading: false,
};

const reducer: Reducer<CoursesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CoursesTypes.GET_COURSES_REQUEST:
      return { ...state, loading: true };
    case CoursesTypes.GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload.courses,
        loading: false,
        error: false,
      };
    case CoursesTypes.GET_COURSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
