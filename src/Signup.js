import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const handleSubmit = (e, props) => {
  e.preventDefault()
  console.log("In Signup handleSubmit", props)
  fetch('https://the-next-step-api.herokuapp.com/api/v1/users', {
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
      console.log(response)
      localStorage.setItem("jwt", response.token)
      props.userCreated()
      props.history.push('/main')
  })
}

const URL = 'https://images.unsplash.com/photo-1448387473223-5c37445527e7'

const Signup = (props) => {

  return(
    <div>
      <Grid textAlign='center' verticalAlign='middle' style={{
        height: '100%',
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundImage: `url(${URL})`,
        backgroundSize: 'cover',
        margin: "auto"
    }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' textAlign='center' style={{backgroundColor: "white", paddingBottom: "10px" }}>
          <Image src='https://image.flaticon.com/icons/svg/1535/1535019.svg' />The Next Step
        </Header>
          <Form size='large' onSubmit={(e) => handleSubmit(e, props)}>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' data-label="name" onChange={(e) => props.formInputChangeName(e.target.value)} value={props.name}/>
              <Form.Input fluid icon='mail' iconPosition='left' placeholder='Email' data-label="email" onChange={(e) => props.formInputChangeEmail(e.target.value)} value={props.email}/>
              <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' data-label="password" type="password" onChange={(e) => props.formInputChangePassword(e.target.value)} value={props.password}/>
              <Button type="submit" color='teal' fluid size='large'>
                Sign up
              </Button>
            </Segment>
          </Form>
          <Message>
            Returning user? <Link to="/login">Log in here.</Link>
          </Message>
        </Grid.Column>
      </Grid>
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
    userCreated: () => dispatch({type: 'SUCCESSFUL_SIGN_UP'})
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Signup)
