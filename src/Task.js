import React from 'react'
import { connect } from 'react-redux'
import { List, Checkbox } from 'semantic-ui-react'

class Task extends React.Component {

  handleCheck = () => {
    fetch(`http://localhost:3001/api/v1/tasks/${this.props.data.id}`, {
      method: 'PATCH',

      headers: {
        'Accept': "application/json",
        'Content-Type': "application/json"
      },

      body: JSON.stringify({
        is_completed: !this.props.data.is_completed,
      })
    })
    .then(res => res.json())
    .then(updatedTask => {
      this.props.toggleTask(this.props.selectedJobId, updatedTask)
    })
  }

  render(){
    return (
      <List.Item>
        <Checkbox checked={this.props.data.is_completed}
        onChange={this.handleCheck}
        id={this.props.data.id}
        label={this.props.data.description}
        style={{
          textDecoration: this.props.data.is_completed ? "line-through": "none"
        }} />
      </List.Item>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedJobId: state.selectedJobId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleTask: (jobId, task) => dispatch({type: 'TOGGLE_TASK', jobId: jobId, task: task})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
