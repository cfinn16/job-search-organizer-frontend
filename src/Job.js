import React from 'react'
import { connect } from 'react-redux'

class Job extends React.Component {
  state = {
    showMore: false,
  }



  handleClick = () => {
    this.setState({showMore: !this.state.showMore})
  }

  // handleOpenModal = () => {
  //   this.setState({showModal: true})
  // }

  render(){
    return (
      <div>
        <div onClick={() => this.handleClick()}>
          <h2>{this.props.data.title}</h2>
          <h3>{this.props.data.company}</h3>
          {this.state.showMore &&
            <>
            <h3>Years of Experience Needed: {this.props.data.years_experience}</h3>
            <h3>Salary: ${this.props.data.salary}</h3>
            <h3>Contact: {this.props.data.contact_email}</h3>
            <p>{this.props.data.description}</p>
            </>
          }
        </div>
        <button id={this.props.data.id} onClick={(e) => this.props.deleteJob(e)}>X</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {jobs: state.jobs}
}

const mapDispatchToProps = dispatch => {
  return {
    deleteJob: (e) => dispatch({type: 'DELETE_JOB', id: parseInt(e.target.id)})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Job)
