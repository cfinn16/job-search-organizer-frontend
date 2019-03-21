import React from 'react';
import Main from './Main.js';
import Signup from './Signup.js'
import Login from './Login.js'
import NewJobForm from './NewJobForm.js'
import JobListingsContainer from './JobListingsContainer.js'
import { connect } from 'react-redux'
import { Menu, Modal } from 'semantic-ui-react'
import { Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router'

class App extends React.Component {
  state={
    showNewJobForm: false
  }

  componentDidMount() {
    let token = (localStorage.getItem('jwt'))
    if (token) {
      fetch(`https://the-next-step-api.herokuapp.com/api/v1/current_user`, {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(user => {
        this.props.persistUserId(user.id)
        if (window.location.pathname === '/login' || window.location.pathname === '/signup' || window.location.pathname === '/') {
          this.props.history.push('/main')
        }
      })
    } else {
      this.props.history.push('/login')
    }
  }

  componentDidUpdate() {
    let token = (localStorage.getItem('jwt'))
    if (token) {
      fetch(`https://the-next-step-api.herokuapp.com/api/v1/current_user`, {
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

  handleNewJobFormClick = () => {
    this.setState({showNewJobForm: true})
  }

  closeModal = () => {
    this.setState({showNewJobForm: false})
  }

  handleLogOut = () => {
    localStorage.removeItem("jwt")
    this.props.logOut()
    this.props.history.push('/login')
  }

  render(){
    return (
      <div>
        <header style={{paddingBottom: "15px"}}>
          {this.props.successfulLogIn &&
          <Menu size="huge">
            {window.location.pathname !== "/jobs" &&
              <Menu.Item as={Link} to='/jobs'>Browse Jobs</Menu.Item>
            }
            {this.props.currentUserId ?
              window.location.pathname !== "/main" &&
              <Menu.Item as={Link} to='/main'>My Board</Menu.Item>
              :
              <Menu.Item as={Link} to='/login'>Log In</Menu.Item>
            }
            {window.location.pathname === "/main" &&
              <Menu.Item onClick={this.handleNewJobFormClick}>Add Job Listing</Menu.Item>
            }
            <Modal open={this.state.showNewJobForm} onClose={this.closeModal}>
              <Modal.Content>
                <NewJobForm close={this.closeModal}/>
              </Modal.Content>
            </Modal>

            {this.props.currentUserId &&
              <Menu.Item position='right' onClick={this.handleLogOut}>Log Out</Menu.Item>
            }
          </Menu>
        }
        </header>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/main" render={(props) => <Main/>}/>
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
    currentUserId: state.logIn.currentUserId,
    showModal: state.showNewJobForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    persistUserId: (id) => dispatch({ type: 'PERSIST_USER_ID', id: id}),
    logOut: () => dispatch({type: 'LOG_OUT'}),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
