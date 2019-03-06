import React from 'react';
import Main from './Main.js';
import Signup from './Signup.js'
import Login from './Login.js'
import JobListingsContainer from './JobListingsContainer.js'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router'

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
    this.props.history.push('/login')
  }

  render(){
    return (
      <div>
        <header>
          {this.props.successfulLogIn &&
          <Menu>
              <Menu.Item as={Link} to='/jobs'>Browse Jobs</Menu.Item>
              {this.props.currentUserId ?
                <Menu.Item as={Link} to='/main'>My Board</Menu.Item>
                :
              <Menu.Item as={Link} to='/login'>Log In</Menu.Item>
            }
            {this.props.currentUserId &&
              <Menu.Item onClick={this.handleLogOut} style={{position: "absolute", right: "0px"}}>Log Out</Menu.Item>
            }
          </Menu>
        }
        </header>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/main" component={Main} />
            <Route path="/jobs" component={JobListingsContainer} />
          </Switch>
        </div>
      </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
