import React from 'react';
import Main from './Main.js';
import Signup from './Signup.js'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {

  render(){
    console.log("In app", this.props.successfulLogIn)
    return (
    <Router>
      <div>
        <Switch>
          <Redirect exact path="/" to="/signup" />
          <Route path="/signup" component={Signup} />
          <Route exact path="/main" component={Main} />
        </Switch>
      {this.props.successfulLogIn && <Redirect from="/signup" to="/main" push />}
      </div>
    </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    successfulLogIn: state.logIn.successfulLogIn
  }
}

export default connect(mapStateToProps)(App)
