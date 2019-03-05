import React from 'react';
import Main from './Main.js';
import Signup from './Signup.js'
import Login from './Login.js'
import JobListingsContainer from './JobListingsContainer.js'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, Link, BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {
  componentDidMount() {
    let token = (localStorage.getItem('jwt'))
    if (token) {
      fetch(`http://localhost:3001/api/v1/current_user`, {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(user => {
        this.props.persistUserId(user.id)
      })
    }
  }


  componentDidUpdate() {
    let token = (localStorage.getItem('jwt'))
    if (token) {
      fetch(`http://localhost:3001/api/v1/current_user`, {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(user => {
        this.props.persistUserId(user.id)
      })
    }
  }


  handleLogOut = () => {
    localStorage.removeItem("jwt")
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
              {this.props.currentUserId ?
                <li><Link to='/main'>My Board</Link></li>
                :
              <li><Link to='/login'>Log In</Link></li>
            }
            </ul>
          </nav>
          {this.props.currentUserId &&
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
    successfulLogIn: state.logIn.successfulLogIn,
    currentUserId: state.logIn.currentUserId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    persistUserId: (id) => dispatch({ type: 'PERSIST_USER_ID', id: id}),
    logOut: () => dispatch({type: 'LOG_OUT'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
