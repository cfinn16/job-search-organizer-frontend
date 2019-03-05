import React from 'react'
import { connect } from 'react-redux'



class JobListing extends React.Component {
  state = {
    showMore: false
  }

  formatDescription = (jobDescription) => {
    return jobDescription.replace(/<[^>]*>/g, ' ')
  }

  handleSeeMore = () => {
    this.setState({showMore: !this.state.showMore})
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
      if (!postedJob.user_id && !postedJob.description) {
        alert("That job is already on your board")
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
      }
    })
  }

  render(){
    return (
      <div>
        <h2>{this.props.data.name}</h2>
        <h3>{this.props.data.company.name}</h3>
        <button onClick={() => this.handleSeeMore()}>See More</button>
        {this.state.showMore &&
          <div>
            {this.props.data.levels.length > 0 &&
              <h4>Experience Level: {this.props.data.levels[0].name}</h4>
            }
            <p dangerouslySetInnerHTML={{__html: this.props.data.contents}} />
            <button onClick={() => this.handleClick()}>Add to my job board</button>
          </div>
      }
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
