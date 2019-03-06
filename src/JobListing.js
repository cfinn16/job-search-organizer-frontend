import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Icon, Message } from 'semantic-ui-react'

class JobListing extends React.Component {
  state = {
    isAdded: false
  }

  formatDescription = (jobDescription) => {
    return jobDescription.replace(/<[^>]*>/g, ' ')
  }

  handleClick = () => {
    const formattedJob = this.formatDescription(this.props.data.contents)
    fetch(`http://localhost:3001/api/v1/jobs/from_listings`, {
      method: 'POST',

      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        title: this.props.data.name,
        company: this.props.data.company.name,
        description: formattedJob,
        user_id: this.props.currentUserId
      })
    })
    .then(res => res.json())
    .then(postedJob => {
      console.log(postedJob)
      if (postedJob.errors) {
        alert(postedJob.errors)
      } else if (!postedJob.user_id) {
        this.props.addJob(postedJob)
        fetch(`http://localhost:3001/api/v1/user_jobs`, {
          method: 'POST',

          headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"
          },
          body: JSON.stringify({
            user_id: this.props.currentUserId,
            job_id: postedJob.id,
            column: "Interested"
          })
        })
        .then(res => {
          this.setState({isAdded: true})
        })
      }
    })
  }

  render(){
    return (
      <div>
        <h2>{this.props.data.name}</h2>
        <h3>{this.props.data.company.name}</h3>
        <Modal trigger={<Button>See More</Button>} closeIcon>
          <Modal.Header>
            {this.props.data.name} - {this.props.data.company.name}
          </Modal.Header>
          <Modal.Content>
            {this.props.data.levels.length > 0 &&
              <h4>Experience Level: {this.props.data.levels[0].name}</h4>
            }
            <p dangerouslySetInnerHTML={{__html: this.props.data.contents}} />
          </Modal.Content>
          <Modal.Actions>
            {this.state.isAdded ?
            <Message>
              Added to your job board  <Icon name='check' />
            </Message>
            :
            <Button primary onClick={() => this.handleClick()}>
            Add to my job board <Icon name='plus' />
            </Button>
          }
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { currentUserId: state.logIn.currentUserId }
}

const mapDispatchToProps = dispatch => {
  return {
    addJob: (job) => dispatch({type: 'ADD_NEW_JOB', newJob: job})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobListing)
