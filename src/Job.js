import React from 'react'
import TaskContainer from './TaskContainer.js'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { Modal, Card, Button } from 'semantic-ui-react'

const Types = {
  JOB: 'job'
}

const jobSource = {
  beginDrag(props){
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
    showMore: false
  }

  handleClick = () => {
    this.props.selectJob(this.props.data.id)
  }

  handleDeleteJob = (e) => {
    fetch(`http://localhost:3001/api/v1/jobs/${parseInt(e.target.id)}`, {
      method: 'DELETE'
    })
    this.props.deleteJob(parseInt(e.target.id))
  }

  render(){
    const { connectDragSource } = this.props
    return connectDragSource(
      <div>
        <Modal trigger={
          <div style={{maxwidth: "350px", padding: "5px 15px"}}>
            <Card onClick={() => this.handleClick()}>
              <Card.Content textAlign='center'>
                <h2>{this.props.data.title}</h2>
                <h3>{this.props.data.company}</h3>
              </Card.Content>
              {this.state.showMore &&
              <footer style={{textAlign: "right"}}>Click to show more</footer>
              }
            </Card>
          </div>}>
          <Modal.Header>
            <h2>{this.props.data.title}</h2>
            <h3>{this.props.data.company}</h3>
          </Modal.Header>
          <Modal.Content>
            <h3>Years of Experience Needed: {this.props.data.years_experience}</h3>
            <h3>Salary: ${this.props.data.salary}</h3>
            <h3>Contact: {this.props.data.contact_email}</h3>
            <h4>Description: </h4>
            <p>{this.props.data.description}</p>
            <TaskContainer> </TaskContainer>
            <Button negative style={{
              position: "absolute", right: 0, bottom: 0
            }} id={this.props.data.id} onClick={(e) => this.handleDeleteJob(e)}>Remove from board</Button>
          </Modal.Content>
        </Modal>
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
