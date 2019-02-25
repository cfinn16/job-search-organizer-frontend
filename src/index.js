import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'

const jobs = (state = [], action) => {
  switch(action.type) {
    case 'LOAD_JOBS':
      return action.jobs
    case 'TOGGLE_SHOW_MORE':
      return state.map((job) => {
        if (action.id === job.id) {
          return {...job, show_more: !job.show_more}
        } else {
          return job
        }
      })
    case 'ADD_NEW_JOB':
      return [...state, action.newJob]
      fetch(`http://localhost:3001/api/v1/jobs`, {
        method: 'POST',

        headers: {
          'Content-Type': "application/json",
          'Accept': "application/json"
        },
        body: JSON.stringify({
          title: action.newJob.title,
          company: action.newJob.company,
          years_experience: action.newJob.years_experience,
          salary: action.newJob.salary,
          contact_email: action.newJob.contact_email,
          description: action.newJob.description,
          show_more: false
        })
      })
    default:
      return state
  }
}

const showNewJobForm = (state = false, action) => {
  switch(action.type) {
    case 'HANDLE_NEW_FORM_CLICK':
      return !state
    default:
      return state
  }
}

const currentUserId = (state = 1, action) => {
  return state
}

const reducer = combineReducers({
  jobs,
  showNewJobForm,
  currentUserId
})


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

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



// const reducer = (state) = {
  //   jobs: [],
  //   currentUserId: 1,
  //   showNewJobForm: false
  //   }, action) => {
    //   console.log('the current state', state)
    //
    //   switch(action.type) {
      //     case 'LOAD_JOBS':
      //       return {...state, jobs: action.jobs}
      //     case 'HANDLE_NEW_FORM_CLICK':
      //       return {...state, showNewJobForm: true}
      //     case 'TOGGLE_SHOW_MORE':
      //       return {...state, jobs: state.jobs.map((job) => {
        //         if (action.id === job.id) {
          //           return {...job, show_more: !job.show_more}
          //         } else {
            //           return job
            //         }
            //       })
            //     }
            //     default:
            //       return state
            //   }
            // }
