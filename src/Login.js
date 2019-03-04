import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';



const handleSubmit = (e, props) => {
  e.preventDefault()
  console.log("In handleSubmit", props)
    fetch('http://localhost:3001/api/v1/users/login', {
      method: 'POST',

      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        name: props.name,
        email: props.email,
        password: props.password
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      } else {
        console.log(response)
        props.successfulLogIn(response)
        localStorage.setItem("user_id", response)
      }
    })
}

const Login = (props) => {

  return(
    <div style={ { textAlign: 'center'} }>
      <h1>Welcome to Job Search Organizer</h1>
      <form onSubmit={(e) => handleSubmit(e, props)}>
        <label>
          Name:
          <input type="text" data-label="name" onChange={(e) => props.formInputChangeName(e.target.value)} value={props.name}></input>
        </label><br/>
        <label>
          Email:
          <input type="text" data-label="email" value={props.email} onChange={(e) => props.formInputChangeEmail(e.target.value)}></input>
        </label><br/>
        <label>
          Password:
          <input type="text" data-label="password" value={props.password} onChange={(e) => props.formInputChangePassword(e.target.value)}></input>
        </label><br/>
        <input type="submit" value="Log In"></input>
      </form>
      <p>New user? <Link to="/signup">Sign up here.</Link></p>
    </div>

  )

}

const mapStateToProps = state => {
  return {
    name: state.logIn.name,
    email: state.logIn.email,
    password: state.logIn.password
  }
}

const mapDispatchToProps = dispatch => {
  return {
    formInputChangeName: (name) => dispatch({ type: 'HANDLE_FORM_INPUT_CHANGE_NAME', value: name}),
    formInputChangeEmail: (email) => dispatch({ type: 'HANDLE_FORM_INPUT_CHANGE_EMAIL', value: email}),
    formInputChangePassword: (password) => dispatch({ type: 'HANDLE_FORM_INPUT_CHANGE_PASSWORD', value: password}),
    logInSubmit: () => dispatch({ type: 'LOG_IN_SUBMIT'}),
    successfulLogIn: (id) => dispatch({type: 'SUCCESSFUL_LOGIN', id: id})
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login)
