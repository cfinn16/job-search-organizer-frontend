import React from 'react'
import Task from './Task.js'
import { connect } from 'react-redux'
import { Button, Icon, Form, List } from 'semantic-ui-react'


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


  postNewTask = (newTask, jobId, currentUserId) => {
    fetch(`https://the-next-step-api.herokuapp.com/api/v1/tasks`, {
      method: 'POST',

      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        description: newTask,
        job_id: jobId,
        user_id: currentUserId,
      })
    })
    .then(res => res.json())
    .then(postedTask => {
      this.props.newTask(postedTask, jobId)
    })
  }

  handleNewTaskSubmit = (e) => {
    e.preventDefault()
    this.postNewTask(this.state.newTask, this.props.selectedJobId, this.props.currentUserId)
    this.setState({
      showNewTaskForm: false,
      newTask: ''
    })
  }

  render() {
    return (
        <>
        <h2>To-Dos</h2>
        <List style={{listStyle: "none"}}>
          {this.props.tasks.filter(task => task.job_id === this.props.selectedJobId).map(task => {
            return <Task key={task.id} data={task}></Task>
          })}
        </List>
        <Button size="tiny" onClick={() => this.handleNewTaskClick()}>{this.state.showNewTaskForm ? <Icon name="minus" /> : <Icon name="plus"/>}</Button>
        {this.state.showNewTaskForm &&
          <div style={{width: "30%"}}>
            <Form onSubmit={(e) => this.handleNewTaskSubmit(e)}>
              <Form.Input label='Task'onChange={(e) => this.handleChange(e)} value={this.state.newTask}></Form.Input>
              <Form.Button type="submit" content="Add"></Form.Button>
            </Form>
          </div>
        }
        </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedJob: state.jobs.find(job => job.id === state.selectedJobId),
    selectedJobId: state.selectedJobId,
    currentUserId: state.logIn.currentUserId,
    tasks: state.tasks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newTask: (newTask) => dispatch({ type: 'ADD_TASK', postedTask: newTask})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer)
