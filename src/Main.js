import React, { Component } from 'react';
import './App.css';
import JobsContainer from './JobsContainer.js'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

// Action Creator with Thunk
const fetchJobs = (userId) => {
  return function(dispatch) {

    fetch(`https://the-next-step-api.herokuapp.com/api/v1/users/${userId}`, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    })
    .then(r => r.json())
    .then(data => {
      dispatch({type: 'LOAD_JOBS', jobs: data.jobs})
      dispatch({type: 'LOAD_TASKS', tasks: data.tasks})
    })
  }
}

class Main extends Component {

  componentDidMount() {
    this.props.currentUserId &&
    this.props.fetchJobs(this.props.currentUserId)
  }

  componentDidUpdate() {
    this.props.currentUserId &&
    this.props.fetchJobs(this.props.currentUserId)
  }

  render() {
    return (
      <div>
        <div style={{fontSize: "1.75em"}}>
          <Header size='huge' textAlign='center' >
            My Job Board
          </Header>
        </div>
        <JobsContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.logIn.currentUserId
  }
}

export default connect(mapStateToProps, { fetchJobs})(Main)
