import { action } from 'typesafe-actions';
import { CoursesTypes, Course } from './types';

const signInRequest = () => action(CoursesTypes.GET_COURSES_REQUEST);

const signInSuccess = (courses: Course) =>
  action(CoursesTypes.GET_COURSES_SUCCESS, { courses });

const signInFailure = () => action(CoursesTypes.GET_COURSES_FAILURE);

export default {
  signInRequest,
  signInSuccess,
  signInFailure,
};
