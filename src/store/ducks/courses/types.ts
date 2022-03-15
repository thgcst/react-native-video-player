/**
 * Action types
 */
export enum CoursesTypes {
  GET_COURSES_REQUEST = '@courses/GET_COURSES_REQUEST',
  GET_COURSES_SUCCESS = '@courses/GET_COURSES_SUCCESS',
  GET_COURSES_FAILURE = '@courses/GET_COURSES_FAILURE',
}

/**
 * Data types
 */
export interface Course {
  id: number;
  courseId: number;
  courseName: string;
  courseDescription: string;
  courseLogo: string;
  percentage: number;
  answered: boolean;
  typeCourse: string;
}

/**
 * State type
 */
export interface CoursesState {
  readonly courses: Course[] | Record<string, never>;
  readonly loading: boolean;
  readonly error: boolean;
}
