import React from 'react'
import JobListing from './JobListing.js'
import { Card, Button, Icon, Form } from 'semantic-ui-react'

class JobListingsContainer extends React.Component {
  state={
    searchedJobs: [],
    category: "Engineering",
    location: "New%20York%20City%2C%20NY",
    pageNum: 1
  }

  handleCategorySelect = (e, data) => {
    this.setState({category: data.value})
  }

  handleLocationSelect = (e, data) => {
    this.setState({location: data.value})
  }

  updateSearch = (e) => {
    e.preventDefault()
    fetch(`https://www.themuse.com/api/public/jobs?category=${this.state.category}&location=${this.state.location}&page=${this.state.pageNum}`)
    .then(res => res.json())
    .then(response => {
      this.setState({searchedJobs: response.results})
    })
  }

  nextPage = () => {
    this.setState({pageNum: this.state.pageNum + 1}, () => {
      fetch(`https://www.themuse.com/api/public/jobs?category=${this.state.category}&location=${this.state.location}&page=${this.state.pageNum}`)
      .then(res => res.json())
      .then(response => {
        this.setState({searchedJobs: response.results})
      })
      window.scrollTo(0, 0)
    })
  }

  prevPage = () => {
    this.setState({pageNum: this.state.pageNum - 1}, () => {
      fetch(`https://www.themuse.com/api/public/jobs?category=${this.state.category}&location=${this.state.location}&page=${this.state.pageNum}`)
      .then(res => res.json())
      .then(response => {
        this.setState({searchedJobs: response.results})
      })
      window.scrollTo(0, 0)
    })
  }

  render(){
    console.log(this.state.searchedJobs)
    return (
      <div style={{backgroundColor: "#eeeeee", padding: "0 15px"}}>
        <h1 style={{textAlign: "center"}}>Find A Job!</h1>
        <div style={{paddingLeft: "50px"}}>
          <Form onSubmit={(e) => this.updateSearch(e)}>
            <Form.Group inline>
              <Form.Select label='Select a category:' value={this.state.category} onChange={(e, data) => this.handleCategorySelect(e, data)} options ={[
                {key: 'b&s', value: "Business%20%26%20Strategy", text: "Business & Strategy"},
                {key: 'c&d', value: "Creative%20%26%20Design", text: "Creative & Design"},
                {key: 'ds', value: "Data%20Science", text: "Data Science"},
                {key: 'edit', value: "Editorial", text: "Editorial"},
                {key: 'edu', value: "Education", text: "Education"},
                {key: 'eng', value: "Engineering", text: "Engineering"},
                {key: 'fin', value: "Finance", text: "Finance"},
                {key: 'health', value: "Healthcare%20%26%20Medicine", text: "Healthcare & Medicine"},
                {key: 'hr', value: "HR%20%26%20Recruiting", text: "HR & Recruiting"},
                {key: 'mark&pr', value: "Marketing%20%26%20PR", text: "Marketing & PR"},
                {key: 'projman', value: "Project%20%26%20Product%20Management", text: "Project & Product Management"},
                {key: 'sales', value: "Sales", text: "Sales"},
                {key: 'socmed', value: "Social%20Media%20%26%20Community", text: "Social Media & Community"},
              ]}>
              </Form.Select>
              <Form.Select label='Select a location:' value={this.state.location} onChange={(e, data) => this.handleLocationSelect(e, data)} options ={[
                {key: 'nyc', value: "New%20York%20City%2C%20NY", text: "New York City, NY"},
                {key: 'sf', value: "San%20Francisco%2C%20CA", text: "San Francisco, CA"},
                {key: 'la', value: "Los%20Angeles%2C%20CA", text: "Los Angeles, CA"}
              ]}>
              </Form.Select>
              <Form.Field control={Button}>Search</Form.Field>
            </Form.Group>
          </Form>
        </div>
        <div style={{padding: "25px 50px", borderColor: "#0033c7"}}>
          <Card.Group itemsPerRow={5}>
            {this.state.searchedJobs.map(job => {
              return(
                <Card key={job.id} raised>
                  <JobListing data={job}></JobListing>
                </Card>
              )
            })}
          </Card.Group>
        </div>
          {this.state.searchedJobs.length === 20 &&
              <Button size="large" primary onClick={() => this.nextPage()} style={{position: "absolute", right: "0px", marginRight: "50px"}}>More Results <Icon name="arrow right" /></Button>
          }
          {this.state.pageNum > 1 &&
              <Button size="large" secondary onClick={() => this.prevPage()} style={{position: "absolute", left: "0px", marginLeft: "50px"}}><Icon name="arrow left" /> Previous Results </Button>
          }
      </div>
    )
  }
}

export default JobListingsContainer
