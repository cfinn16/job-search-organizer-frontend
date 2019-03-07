import React from 'react'
import HTML5Backend from "react-dnd-html5-backend";
import JobColumn from './JobColumn.js'
import { DragDropContext } from "react-dnd";
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'

class JobsContainer extends React.Component {

  render(){
    return (
      <div style={{overflow: "scroll", padding: "25px 50px"}}>
        <Container fluid>
          <table style={{width: "100%", borderSpacing: "15px"}}>
            <tbody>
            <tr style={{verticalAlign: "top"}}>
              <JobColumn id={1} label="Interested"></JobColumn>
              <JobColumn id={2} label="Applied"></JobColumn>
              <JobColumn id={3} label="Phone Screen"></JobColumn>
              <JobColumn id={4} label="Interview"></JobColumn>
              <JobColumn id={5} label="Offer"></JobColumn>
              <JobColumn id={6} label="Rejected"></JobColumn>
            </tr>
            </tbody>
          </table>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  }
}



JobsContainer = DragDropContext(HTML5Backend)(JobsContainer)
export default connect(mapStateToProps)(JobsContainer)
