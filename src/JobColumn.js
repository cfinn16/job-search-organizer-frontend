import React from 'react'
import Job from './Job.js'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { store } from './index.js'
import { Grid } from 'semantic-ui-react'

const Types = {
  JOB: 'job'
}

const columnTarget = {
  drop(props, monitor) {
    const jobId = monitor.getItem().jobId
    store.dispatch({type: 'DRAG_JOB', jobId: jobId, column: props.label})
    fetch(`http://localhost:3001/api/v1/user_jobs/with_user/1/with_job/${jobId}`, {
      method: 'PATCH',

      headers: {
        'Accept': "application/json",
        'Content-Type': "application/json"
      },

      body: JSON.stringify({
        column: props.label,
      })
    })
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class JobColumn extends React.Component {

  render(){
    const { connectDropTarget, isOver } = this.props
    return connectDropTarget(
      <td style={{width: "16.66%", padding: "0px 15px", backgroundColor: isOver ? "blue" : "white"}}>
          <h1>{this.props.label}</h1>
          {this.props.jobs.filter(job => job.current_column === this.props.label).map(job => {
              return <Job key={job.id} data={job}/>
            })}
      </td>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     dragJob: (jobId, column) => dispatch({type: 'DRAG_JOB', jobId: jobId, column: column})
//   }
// }


export default compose(
  DropTarget(Types.JOB, columnTarget, collect),
  connect(mapStateToProps)
)(JobColumn)
