import React from 'react'
import JobListing from './JobListing.js'
import { connect } from 'react-redux'

class JobListingsContainer extends React.Component {
  state={
    searchedJobs: []
  }

  componentDidMount(){
    fetch('https://www.themuse.com/api/public/jobs?page=1')
    .then(res => res.json())
    .then(response => {
      this.setState({searchedJobs: response.results})
    })
  }
  render(){
    console.log(this.state.searchedJobs)
    return (
      <div>
        <h1 style={{textAlign: "center"}}>Find A Job!</h1>
        {this.state.searchedJobs.map(job => {
          return <JobListing key={job.id} data={job}></JobListing>
        })}
      </div>
    )
  }
}

export default JobListingsContainer
