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







// <div style={{display: 'flex', flexDirection: 'row'}}>
//   <div style={{width: 200}}>
//     <h1>Interested</h1>
//     {this.props.jobs.filter(job => job.current_column === "Interested").map(job => {
  //       return <Job key={job.id} data={job}/>
  //     })}
  //   </div>
  //   <div style={{width: 200}}>
  //     <h1 style={{textAlign: 'center'}}>Applied</h1>
  //     {this.props.jobs.filter(job => job.current_column === "Applied").map(job => {
    //       return <Job key={job.id} data={job}/>
    //     })}
    //   </div>
    //   <div style={{width: 200}}>
    //     <h1 style={{textAlign: 'center'}}>Cultural Interview</h1>
    //     {this.props.jobs.filter(job => job.current_column === "Cultural Interview").map(job => {
      //       return <Job key={job.id} data={job}/>
      //     })}
      //   </div>
      //   <div style={{width: 200}}>
      //     <h1 style={{textAlign: 'center'}}>Technical Interview</h1>
      //     {this.props.jobs.filter(job => job.current_column === "Technical Interview").map(job => {
        //       return <Job key={job.id} data={job}/>
        //     })}
        //   </div>
        //   <div style={{width: 200}}>
        //     <h1 style={{textAlign: 'center'}}>Offer</h1>
        //     {this.props.jobs.filter(job => job.current_column === "Offer").map(job => {
          //       return <Job key={job.id} data={job}/>
          //     })}
          //   </div>
          //   <div style={{width: 200}}>
          //     <h1 style={{textAlign: 'center'}}>Rejected</h1>
          //     {this.props.jobs.filter(job => job.current_column === "Rejected").map(job => {
            //       return <Job key={job.id} data={job}/>
            //     })}
            //   </div>
            // </div>
