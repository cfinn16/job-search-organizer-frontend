import React from 'react'
import TaskContainer from './TaskContainer.js'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'

const Types = {
  JOB: 'job'
}

const jobSource = {
  beginDrag(props){
    console.log("I'm dragging")
    return{ jobId: props.data.id}
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Job extends React.Component {
  state = {
    showMore: false,
  }

  handleClick = () => {
    this.setState({showMore: !this.state.showMore})
    // console.log("this.props.data.id", this.props.data.id)
    // console.log("parseInt", parseInt(this.props.data.id))
    this.props.selectJob(this.props.data.id)
  }

  // handleOpenModal = () => {
  //   this.setState({showModal: true})
  // }

  handleDeleteJob = (e) => {
    fetch(`http://localhost:3001/api/v1/jobs/${parseInt(e.target.id)}`, {
      method: 'DELETE'
    })
    this.props.deleteJob(parseInt(e.target.id))
  }

  // const jobSource = {
  //   beginDrag(props){
  //     return{ jobId: props.selectedJobId}
  //   }
  // }
  //
  // function collect(connect, monitor) {
  //   return {
  //     connectDragSource: connect.dragSource(),
  //     isDragging: monitor.isDragging()
  //   }
  // }


  render(){
    const { connectDragSource } = this.props
    // console.log(this.props)
    return connectDragSource(
      <div>
        <div onClick={() => this.handleClick()}>
          <h2>{this.props.data.title}</h2>
          <h3>{this.props.data.company}</h3>
        </div>
        {this.state.showMore &&
          <>
          <h3>Years of Experience Needed: {this.props.data.years_experience}</h3>
          <h3>Salary: ${this.props.data.salary}</h3>
          <h3>Contact: {this.props.data.contact_email}</h3>
          <p>{this.props.data.description}</p>
          <TaskContainer> </TaskContainer>
          </>
        }
        <button id={this.props.data.id} onClick={(e) => this.handleDeleteJob(e)}>X</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs,
    selectedJobId: state.selectedJobId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteJob: (id) => dispatch({type: 'DELETE_JOB', id: id}),
    selectJob: (id) => dispatch({type: 'SELECT_JOB', id: id })
  }
}


export default compose(
  DragSource(Types.JOB, jobSource, collect),
  connect(mapStateToProps, mapDispatchToProps)
)(Job)
