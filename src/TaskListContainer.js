import React from 'react'
import TaskListTask from './TaskListTask.js'
import { connect } from 'react-redux'
import { fetchAllTasks } from './helpers.js'

class TaskListContainer extends React.Component {
  state = {

  }

  componentDidMount() {
    this.props.fetchAllTasks()
  }



  render(){
    return(
      <div>
        <h4>Task List Container</h4>
        {this.props.tasks.map(task => {
          return (
            <TaskListTask data={task} key={task.id} />
          )
        })}

      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.logIn.currentUserId,
    tasks: state.tasks
  }
}

export default connect(mapStateToProps, {fetchAllTasks})(TaskListContainer)
