import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import JobsContainer from './JobsContainer.js'

class App extends Component {
  state = {
    jobs: []
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/jobs')
      .then(res => res.json())
      .then(jobs => {
        this.setState({jobs})
      })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <h1 style={{textAlign: 'center'}}>
            My Job Board
          </h1>
          <JobsContainer jobs={this.state.jobs}/>
        </header>
      </div>
    );
  }
}

export default App;
