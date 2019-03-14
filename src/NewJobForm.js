import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'

const postNewJob = (newJob, userId) => {
  console.log("newJob info", newJob)
  return function(dispatch) {

    fetch(`https://the-next-step-api.herokuapp.com//api/v1/jobs`, {
      method: 'POST',

      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        title: newJob.title,
        company: newJob.company,
        location: newJob.location,
        experience_level: newJob.experience_level,
        salary: parseInt(newJob.salary),
        description: newJob.description
      })
    })
    .then(res => res.json())
    .then(postedJob => {
      console.log(postedJob)
      dispatch({ type: 'ADD_NEW_JOB', newJob: postedJob})
      fetch(`https://the-next-step-api.herokuapp.com//api/v1/user_jobs`, {
        method: 'POST',

        headers: {
          'Content-Type': "application/json",
          'Accept': "application/json"
        },
        body: JSON.stringify({
          user_id: userId,
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
    location: '',
    experience_level: '',
    salary: '',
    description: '',
  }

  handleChange = (e, data) => {
    this.setState({[data.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.postNewJob(this.state, this.props.currentUserId)
    this.setState({
      title: '',
      company: '',
      location: '',
      experience_level: '',
      salary: '',
      description: '',
    })
    this.props.close()
  }

  render(){
    return (
      <div style={{padding: "15px"}}>
        <h2 style={{textAlign: "center"}}>Enter New Job Info</h2>
        <div style={{padding: "30px"}}>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group inline widths='equal'>
              <Form.Input fluid label='Title' type='text' name="title" onChange={(e, data) => this.handleChange(e, data)} value={this.state.title} />
              <Form.Input fluid label='Company' type='text' name="company" onChange={(e, data) => this.handleChange(e, data)} value={this.state.company} />
            </Form.Group>
            <Form.Group inline widths='equal'>
              <Form.Input fluid label='Location' type='text' name="location" onChange={(e, data) => this.handleChange(e, data)} value={this.state.location} />
              <Form.Input fluid label='Experience Level' type='text' name="experience_level" onChange={(e, data) => this.handleChange(e, data)} value={this.state.experience_level} />
              <Form.Input fluid label='Estimated Salary' type='number' name="salary" onChange={(e, data) => this.handleChange(e, data)} value={this.state.salary} />
            </Form.Group>
            <Form.TextArea label="Description" name="description" onChange={(e, data) => this.handleChange(e, data)} value={this.state.description} />
            <Form.Button>Submit</Form.Button>
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.logIn.currentUserId
  }
}

export default connect(mapStateToProps, {postNewJob})(NewJobForm)
