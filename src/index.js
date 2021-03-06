import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import 'semantic-ui/dist/semantic.min.css';

const jobs = (state = [], action) => {
  switch(action.type) {
    case 'LOAD_JOBS':
      return action.jobs
    case 'ADD_NEW_JOB':
      return [...state, action.newJob]
    case 'DELETE_JOB':
      return state.filter(job => job.id !== action.id)
    case 'UPDATE_JOB':
      return state.map(job => {
        if (job.id === action.id) {
          return action.job
        } else {
          return job
        }
      })
    case 'DRAG_JOB':
      return state.map(job => {
        if (job.id === action.jobId) {
          return {...job, current_column: action.column}
        } else {
          return job
        }
      })
    default:
      return state
  }
}

const tasks = (state = [], action) => {
  switch(action.type) {
    case 'LOAD_TASKS':
      return action.tasks
    case 'ADD_TASK':
      return [...state, action.postedTask]
    case 'TOGGLE_TASK':
      console.log(action)
      return state.map(task => {
        if (task.id === action.task.id) {
          return action.task
        } else {
          return task
        }
      })
    default:
      return state
  }
}


const selectedJobId = (state = 0, action) => {
  switch(action.type) {
    case 'SELECT_JOB':
      return action.id
    default:
      return state
  }
}

const logIn = (state = {
  currentUserId: null,
  successfulLogIn: false,
  name: '',
  email: '',
  password: ''
}, action) => {
  switch(action.type) {
    case 'HANDLE_FORM_INPUT_CHANGE_NAME':
      return {...state, name: action.value}
    case 'HANDLE_FORM_INPUT_CHANGE_EMAIL':
      return {...state, email: action.value}
    case 'HANDLE_FORM_INPUT_CHANGE_PASSWORD':
      return {...state, password: action.value}
    case 'LOG_IN_SUBMIT':
      console.log("in log in submit")
      return state
    case 'SUCCESSFUL_LOGIN':
      return {...state,
      successfulLogIn: true,
      name: '',
      email: '',
      password: ''
      }
    case 'SUCCESSFUL_SIGN_UP':
      return {...state,
        successfulLogIn: true,
        name: '',
        email: '',
        password: ''
      }
    case 'PERSIST_USER_ID':
      return {...state,
        successfulLogIn: true,
        currentUserId: action.id}
    case 'LOG_OUT':
      return {...state,
        currentUserId: null,
        successfulLogIn: false
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  jobs,
  tasks,
  selectedJobId,
  logIn
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store =
  createStore(
    reducer,
  composeEnhancer(applyMiddleware(thunk))
  )

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
