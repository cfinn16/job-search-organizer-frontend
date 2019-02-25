import React from 'react'
import Job from './Job.js'
import { connect } from 'react-redux'

const JobsContainer = (props) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{width: 200}}>
        <h1>Interested</h1>
        {props.jobs.map(job => {
          return <Job key={job.id} data={job}/>
        })}
      </div>
      <div style={{width: 200}}>
        <h1 style={{textAlign: 'center'}}>Applied</h1>
      </div>
      <div style={{width: 200}}>
        <h1 style={{textAlign: 'center'}}>Cultural Interview</h1>
      </div>
      <div style={{width: 200}}>
        <h1 style={{textAlign: 'center'}}>Technical Interview</h1>
      </div>
      <div style={{width: 200}}>
        <h1 style={{textAlign: 'center'}}>Offer</h1>
      </div>
      <div style={{width: 200}}>
        <h1 style={{textAlign: 'center'}}>Rejected</h1>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  }
}



export default connect(mapStateToProps)(JobsContainer)
