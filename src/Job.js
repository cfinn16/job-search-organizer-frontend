import React from 'react'

class Job extends React.Component {
  state = {
    showMore: false
  }

  handleClick = () => {
    this.setState({showMore: !this.state.showMore})
  }

  render(){
    return (
      <div draggable="true" onClick={this.handleClick}>
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
    )
  }
}

export default Job
