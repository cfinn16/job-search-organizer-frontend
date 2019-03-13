import React from 'react'
import TaskContainer from './TaskContainer.js'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { Modal, Card, Button, Icon } from 'semantic-ui-react'

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
    showMore: false,
    showSalaryEditButton: false,
    showSalaryEditForm: false,
    newSalary: 0
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

  toggleShowSalaryEditButton = () => {
    this.setState({showSalaryEditButton: !this.state.showSalaryEditButton})
  }

  showSalaryEditForm = () => {
    this.setState({
      showSalaryEditForm: true,
      showSalaryEditButton: false
    })
  }

  updateSalary = (e) => {
    this.setState({newSalary: e.target.value})
  }

  submitNewSalary = (e) => {
    e.preventDefault()
    console.log("Submitting, new salary is:", this.state.newSalary)
    fetch(`http://localhost:3001/api/v1/jobs/${this.props.selectedJobId}`, {
      method: 'PATCH',

      headers: {
        'Accept': "application/json",
        'Content-Type': "application/json"
      },

      body: JSON.stringify({
        salary: parseInt(this.state.newSalary),
      })
    })
    .then(res => res.json())
    .then(updatedJob => {
      this.props.updateJob(updatedJob)
      this.setState({showSalaryEditForm: false})
    })
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
          <Modal.Content>
            <Modal.Header>
              <h1>{this.props.data.title}</h1>
              <h2>{this.props.data.company}</h2>
            </Modal.Header>
          </Modal.Content>
          <Modal.Content>
            <h3>Experience: {this.props.data.experience_level}</h3>
            <h3>{this.props.data.location}</h3>
            <h3 onMouseEnter={this.toggleShowSalaryEditButton} onMouseLeave={this.toggleShowSalaryEditButton}>
              {this.state.showSalaryEditForm ?
                <form onSubmit={(e) => this.submitNewSalary(e)}>
                  <label>
                    Salary: $
                    <input type="number" onChange={(e) => this.updateSalary(e)} value={this.state.newSalary} />
                  </label>
                </form>
                :
                <>Salary: ${this.props.data.salary}</>
              }
              {this.state.showSalaryEditButton &&
              <Icon onClick={this.showSalaryEditForm} name="pencil" style={{float: "right"}} />
              }
            </h3>
            <h4>Description: </h4>
            <p>{this.props.data.description}</p>
            <TaskContainer> </TaskContainer>
            <Button negative style={{
              position: "absolute", right: 0, bottom: 0, marginBottom: "5px"
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
    selectJob: (id) => dispatch({type: 'SELECT_JOB', id: id }),
    updateJob: (job) => dispatch({type: 'UPDATE_JOB', id: job.id, job: job})
  }
}

export default compose(
  DragSource(Types.JOB, jobSource, collect),
  connect(mapStateToProps, mapDispatchToProps)
)(Job)
