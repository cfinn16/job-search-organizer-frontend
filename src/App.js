import React from 'react';
import Main from './Main.js';
import Signup from './Signup.js'
import Login from './Login.js'
import JobListingsContainer from './JobListingsContainer.js'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, Link, BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {
  componentDidMount() {
    let currentUserId = (localStorage.getItem('user_id'))

    if (currentUserId) {
      this.props.persistUserId(currentUserId)
    }
  }

  handleLogOut = () => {
    localStorage.removeItem("user_id")
    this.props.logOut()
  }

  render(){
    console.log("In app", this.props.successfulLogIn)
    return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li><Link to='/jobs'>Browse Jobs</Link></li>
              {this.props.successfulLogIn ?
                <li><Link to='/main'>My Board</Link></li>
                :
              <li><Link to='/login'>Log In</Link></li>
            }
            </ul>
          </nav>
          {this.props.successfulLogIn &&
            <button onClick={this.handleLogOut} style={{position: "absolute", right: "0px"}}>Log Out</button>
        }
        </header>
        <div>
          <Switch>
            <Redirect exact path="/" to="/login" />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/main" component={Main} />
            <Route path="/jobs" component={JobListingsContainer} />
          </Switch>
        {this.props.successfulLogIn && <Redirect from="/login" to="/main" />}
        {this.props.successfulLogIn === false && <Redirect from="/main" to="/login" />}
        </div>
      </div>
    </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    successfulLogIn: state.logIn.successfulLogIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    persistUserId: (id) => dispatch({ type: 'SUCCESSFUL_LOGIN', id: id}),
    logOut: () => dispatch({type: 'LOG_OUT'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
