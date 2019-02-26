import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware,} from 'redux'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const jobs = (state = [], action) => {
  switch(action.type) {
    case 'LOAD_JOBS':
      return action.jobs
    case 'ADD_NEW_JOB':
      return [...state, action.newJob]
    case 'DELETE_JOB':
      return state.filter(job => job.id !== action.id)
    case 'ADD_TASK':
      return state.map(job => {
        if (job.id === action.id) {
          return {...job, tasks: [...job.tasks, action.postedTask]}
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

const selectedJobId = (state = 0, action) => {
  switch(action.type) {
    case 'SELECT_JOB':
      return action.id
    default:
      return state
  }
}

const currentUserId = (state = 1, action) => {
  return state
}

const reducer = combineReducers({
  jobs,
  selectedJobId,
  currentUserId
})


export const store = createStore(reducer, applyMiddleware(thunk))
//
// const store = createStore(reducer, applyMiddleware(thunk) && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(() => {
  console.log('the new state is', store.getState())
  console.log('----------')
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
