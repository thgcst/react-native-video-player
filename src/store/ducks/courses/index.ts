import { Reducer } from 'redux';
import { CoursesState, CoursesTypes } from './types';

const INITIAL_STATE: CoursesState = {
  courses: [
    {
      id: 365848,
      courseId: 825,
      courseName: 'Negociação e Técnicas de Vendas',
      courseDescription: 'Certificação',
      courseLogo:
        'https://assets-pucrs-pub.pucrs.br/images/logo_curso/LOGO PUCRS - MONO BRANCO.png',
      percentage: 42,
      answered: true,
      typeCourse: 'extensao',
    },
    {
      id: 365836,
      courseId: 897,
      courseName: 'Produtividade, Gestão do Tempo e Propósito',
      courseDescription: 'Extensão',
      courseLogo:
        'https://assets-pucrs-pub.pucrs.br/images/logo_curso/LOGO PUCRS - MONO BRANCO.png',
      percentage: 20,
      answered: true,
      typeCourse: 'extensao',
    },
    {
      id: 365843,
      courseId: 976,
      courseName: 'Psicologia positiva, ciência do bem-estar e autorrealização',
      courseDescription: 'Turma Janeiro 2020',
      courseLogo:
        'https://assets-pucrs-pub.pucrs.br/images/logo_curso/LOGO PUCRS - MONO BRANCO.png',
      percentage: 95,
      answered: true,
      typeCourse: 'mba-pos',
    },
  ],
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
