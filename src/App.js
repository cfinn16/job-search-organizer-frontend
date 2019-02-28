import React from 'react';
import Main from './Main.js';
import Signup from './Signup.js'
import { Route, Switch, Link, Redirect, BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {

  render(){
    return (
    <Router>
      <div>
        <Switch>
          <Route path="/signup" component={Signup}></Route>
          <Route exact path="/" component={Main}></Route>
        </Switch>
      </div>
    </Router>
    )
  }

}


export default App

// import React, { Component } from 'react';
// import './App.css';
// import JobsContainer from './JobsContainer.js'
// import NewJobForm from './NewJobForm.js'
// import { connect } from 'react-redux'
//
// // import { fetchJobs } from '../../actions'
// // Action Creator
// // const increment = (n) => {
// //   return {type: 'INCREMENT', number: n}
// // }
//
// // Action Creator with Thunk
// const fetchJobs = (userId) => {
//   return function(dispatch) {
//
//     fetch(`http://localhost:3001/api/v1/users/${userId}`)
//     .then(r => r.json())
//     .then(data => {
//
//       dispatch({type: 'LOAD_JOBS', jobs: data.jobs})
//     })
//   }
// }
//
//
// class App extends Component {
//   state = {
//     showNewJobForm: false
//   }
//
//   handleNewFormClick = () => {
//     this.setState({showNewJobForm: !this.state.showNewJobForm})
//   }
//
//
//   componentDidMount() {
//     this.props.fetchJobs(this.props.currentUserId)
//   }
//
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <h1 style={{textAlign: 'center'}}>
//             My Job Board
//           </h1>
//           <button onClick={() => this.handleNewFormClick()}>Add job listing </button>
//           {this.state.showNewJobForm &&
//             <NewJobForm />
//           }
//           <JobsContainer />
//         </header>
//       </div>
//     );
//   }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     currentUserId: state.currentUserId
//   }
// }
//
// // const mapDispatchToProps = dispatch => {
// //   return {
// //     fetchJobs: (userId) => dispatch({ type: 'LOAD_JOBS', jobs: jobs }),
// //     handleNewFormClick: () => dispatch({ type: 'HANDLE_NEW_FORM_CLICK' })
// //   }
// // }
//
//
//
// export default connect(mapStateToProps, { fetchJobs})(App)
