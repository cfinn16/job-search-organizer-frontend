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
      fetch(`http://localhost:3001/api/v1/jobs/${action.id}`, {
        method: 'DELETE'
      })
    default:
      return state
  }
}

// const showNewJobForm = (state = false, action) => {
//   switch(action.type) {
//     case 'HANDLE_NEW_FORM_CLICK':
//       return !state
//     default:
//       return state
//   }
// }

const currentUserId = (state = 1, action) => {
  return state
}

const reducer = combineReducers({
  jobs,
  // showNewJobForm,
  currentUserId
})


const store = createStore(reducer, applyMiddleware(thunk))
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
