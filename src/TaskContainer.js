import React from 'react'
import Task from './Task.js'
import { connect } from 'react-redux'



class TaskContainer extends React.Component {
  state = {
    showNewTaskForm: false,
    newTask: ''
  }

  handleNewTaskClick = () => {
    this.setState({showNewTaskForm: !this.state.showNewTaskForm})
  }

  handleChange = (e) => {
    this.setState({newTask: e.target.value})
  }


  postNewTask = (newTask, jobId) => {
    console.log("In postNewTask:", newTask, jobId)
    fetch(`http://localhost:3001/api/v1/tasks`, {
      method: 'POST',

      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        description: newTask,
        job_id: jobId
      })
    })
    .then(res => res.json())
    .then(postedTask => {
      this.props.newTask(postedTask, jobId)
    })
  }

  handleNewTaskSubmit = (e) => {
    e.preventDefault()
    console.log("props", this.props)
    console.log("state", this.state)
    this.postNewTask(this.state.newTask, this.props.selectedJobId)
    this.setState({
      showNewTaskForm: false,
      newTask: ''
    })
  }

  render() {
    return (
        <>
        <h2>To-Dos</h2>
        <ul style={{listStyle: "none"}}>
          {this.props.selectedJob.tasks.map(task => {
            return <Task key={task.id} data={task}></Task>
          })}
        </ul>
        <button onClick={() => this.handleNewTaskClick()}>{this.state.showNewTaskForm ? "-" : "+"}</button>
        {this.state.showNewTaskForm &&
          <form onSubmit={(e) => this.handleNewTaskSubmit(e)}>
            <label>Task:
              <input type="text" onChange={(e) => this.handleChange(e)} value={this.state.newTask}></input>
            </label>
            <input type="submit"></input>
          </form>
        }
        </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedJob: state.jobs.find(job => job.id === state.selectedJobId),
    selectedJobId: state.selectedJobId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newTask: (newTask, id) => dispatch({ type: 'ADD_TASK', postedTask: newTask, id: id})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer)
