import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import JobsContainer from './JobsContainer.js'
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/jobs')
      .then(res => res.json())
      .then(fetchedJobs => {
        this.props.loadJobs(fetchedJobs)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 style={{textAlign: 'center'}}>
            My Job Board
          </h1>
          <JobsContainer jobs={this.props.jobs}/>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {jobs: state.jobs}
}

const mapDispatchToProps = dispatch => {
  return {
    loadJobs: (jobs) => dispatch({ type: 'LOAD_JOBS', jobs: jobs})
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
