import React from 'react'
import { connect } from 'react-redux'

class Job extends React.Component {
  // state = {
  //   showMore: false
  // }
  //
  // handleClick = () => {
  //   this.setState({showMore: !this.state.showMore})
  // }

  render(){
    return (
      <div onClick={() => this.props.showMore(this.props.data.id)}>
        <h2>{this.props.data.title}</h2>
        <h3>{this.props.data.company}</h3>
        {this.props.data.show_more &&
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

const mapStateToProps = (state) => {
  return {jobs: state.jobs}
}

const mapDispatchToProps = dispatch => {
  return {
    showMore: (id) => dispatch({ type: 'TOGGLE_SHOW_MORE', id: id})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Job)
