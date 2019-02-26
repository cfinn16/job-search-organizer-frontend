import React from 'react'
import { connect } from 'react-redux'

const postNewJob = (newJob) => {
  console.log("newJob info", newJob)
  return function(dispatch) {

    fetch(`http://localhost:3001/api/v1/jobs`, {
      method: 'POST',

      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        title: newJob.title,
        company: newJob.company,
        years_experience: parseInt(newJob.years_experience),
        salary: parseInt(newJob.salary),
        contact_email: newJob.contact_email,
        description: newJob.description
      })
    })
    .then(res => res.json())
    .then(postedJob => {
      console.log(postedJob)
      dispatch({ type: 'ADD_NEW_JOB', newJob: postedJob})
      fetch(`http://localhost:3001/api/v1/user_jobs`, {
        method: 'POST',

        headers: {
          'Content-Type': "application/json",
          'Accept': "application/json"
        },
        body: JSON.stringify({
          user_id: 1,
          job_id: postedJob.id,
          column: "Interested"
        })
      })
    })
  }
}

class NewJobForm extends React.Component {
  state = {
    title: '',
    company: '',
    years_experience: '',
    salary: '',
    contact_email: '',
    description: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.dataset.label]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.postNewJob(this.state)
  }

  render(){
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            Title:
            <input type="text" data-label="title" onChange={(e) => this.handleChange(e)} value={this.state.title}></input>
          </label><br/>
          <label>
            Company:
            <input type="text" data-label="company" onChange={(e) => this.handleChange(e)} value={this.state.company}></input>
          </label><br/>
          <label>
            Years of Experience Required:
            <input type="number" data-label="years_experience" onChange={(e) => this.handleChange(e)} value={this.state.years_experience}></input>
          </label><br/>
          <label>
            Estimated salary:
            <input type="number" data-label="salary" onChange={(e) => this.handleChange(e)} value={this.state.salary}></input>
          </label><br/>
          <label>
            Contact email:
            <input type="text" data-label="contact_email" onChange={(e) => this.handleChange(e)} value={this.state.contact_email}></input>
          </label><br/>
          <label>
            Description:
            <input type="text" data-label="description" onChange={(e) => this.handleChange(e)} value={this.state.description}></input>
          </label><br/>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     postNewJob:
//     addJob: formData => dispatch({ type: 'ADD_NEW_JOB', newJob: formData})
//   }
// }

export default connect(null, {postNewJob})(NewJobForm)
