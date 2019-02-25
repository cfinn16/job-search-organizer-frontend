import React from 'react'
import { connect } from 'react-redux'

class NewJobForm extends React.Component {
  state = {
    title: '',
    company: '',
    years_experience: null,
    salary: null,
    contact_email: '',
    description: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.dataset.label]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addTodo(this.state)
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
            <input type="number" data-label="years" onChange={(e) => this.handleChange(e)} value={this.state.years}></input>
          </label><br/>
          <label>
            Estimated salary:
            <input type="number" data-label="salary" onChange={(e) => this.handleChange(e)} value={this.state.salary}></input>
          </label><br/>
          <label>
            Contact email:
            <input type="text" data-label="email" onChange={(e) => this.handleChange(e)} value={this.state.email}></input>
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

const mapDispatchToProps = dispatch => {
  return {
    addTodo: formData => dispatch({ type: 'ADD_NEW_JOB', newJob: formData})
  }
}

export default connect(null, mapDispatchToProps)(NewJobForm)
