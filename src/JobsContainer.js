import React from 'react'
import HTML5Backend from "react-dnd-html5-backend";
import JobColumn from './JobColumn.js'
import { DragDropContext } from "react-dnd";
import { connect } from 'react-redux'

class JobsContainer extends React.Component {

  render(){
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <JobColumn id={1} label="Interested"></JobColumn>
        <JobColumn id={2} label="Applied"></JobColumn>
        <JobColumn id={3} label="Phone Screen"></JobColumn>
        <JobColumn id={4} label="On-Site Interview"></JobColumn>
        <JobColumn id={5} label="Offer"></JobColumn>
        <JobColumn id={6} label="Rejected"></JobColumn>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs,
    // selectedJobId: state.selectedJobId
  }
}



JobsContainer = DragDropContext(HTML5Backend)(JobsContainer)
export default connect(mapStateToProps)(JobsContainer)
