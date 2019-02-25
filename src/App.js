import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import JobsContainer from './JobsContainer.js'
import NewJobForm from './NewJobForm.js'
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount() {
    fetch(`http://localhost:3001/api/v1/users/${this.props.currentUserId}`)
      .then(res => res.json())
      .then(userData => {
        this.props.loadJobs(userData.jobs)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 style={{textAlign: 'center'}}>
            My Job Board
          </h1>
          <button onClick={() => this.props.handleNewFormClick()}>Add job listing </button>
          {this.props.showNewForm &&
            <NewJobForm />
          }
          <JobsContainer />
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.currentUserId,
    showNewForm: state.showNewJobForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadJobs: (jobs) => dispatch({ type: 'LOAD_JOBS', jobs: jobs }),
    handleNewFormClick: () => dispatch({ type: 'HANDLE_NEW_FORM_CLICK' })
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
