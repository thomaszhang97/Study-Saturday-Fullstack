import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
// this is a default export so you can call it anything
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

// ACTION TYPES
// part of the action creator - which is what actually delivers the 'payload'
const ADD_STUDENT = 'ADD_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';
const SELECT_STUDENT = 'SELECT_STUDENT';
const SHOW_STUDENT = 'SHOW_STUDENT';

// ACTION CREATORS
// always returns an object
// payload is what the data u are acting upon is
const addStudent = student => {
  return {
    type: ADD_STUDENT,
    payload: student
  };
};

const getStudents = students => {
  return {
    type: GET_STUDENTS,
    payload: students
  };
};

const selectStudent = student => {
  return {
    type: SELECT_STUDENT,
    payload: student
  };
};

const showStudent = () => {
  return {
    type: SHOW_STUDENT
  };
};

const initialState = {
  students: [],
  selectedStudent: {},
  showStudent: false
};

// REDUCER
// spread state & setting the state in our store
const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return { ...state, students: action.payload };
    default:
      return state;
  }
};

// THUNK - do this right after making the case in the reducer
// dispatch sends the aciton to the reducer
// dispatch works because we want things to run one at a time

// DISPATCH IS JUST A METHOD REDUX GIVES US
//THUNK CREATOR
export const fetchStudentsThunk = () => {
  return async dispatch => {
    // this is where we want to do AXIOS stuff
    try {
      // THUNK
      const { data } = await axios.get('/student');
      dispatch(getStudents(data));  
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };
};


// After doing each reducer --> thunk, we need to modify our front end (main.js)

const middleWare = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(studentsReducer, middleWare);

export default store;
