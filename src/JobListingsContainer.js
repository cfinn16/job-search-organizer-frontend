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

  handleCategorySelect = (e) => {
    this.setState({category: e.target.value}, () => console.log(this.state))
  }

  handleLocationSelect = (e) => {
    this.setState({location: e.target.value}, () => console.log(this.state))
  }

  componentDidMount(){
    fetch('https://www.themuse.com/api/public/jobs?page=1')
    .then(res => res.json())
    .then(response => {
      this.setState({searchedJobs: response.results})
    })
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
      <div>
        <h1 style={{textAlign: "center"}}>Find A Job!</h1>
        <Form onSubmit={(e) => this.updateSearch(e)}>
          <label>
            Select a category:
            <select value={this.state.category} onChange={(e) => this.handleCategorySelect(e)}>
              <option value="Account%20Management">Account Management</option>
              <option value="Business%20%26%20Strategy">Business & Strategy</option>
              <option value="Creative%20%26%20Design">Creative & Design</option>
              <option value="Customer%20Service">Customer Service</option>
              <option value="Data%20Science">Data Science</option>
              <option value="Editorial">Editorial</option>
              <option value="Education">Education</option>
              <option value="Engineering">Engineering</option>
              <option value="Finance">Finance</option>
              <option value="Fundraising%20%26%20Development">Fundraising & Development</option>
              <option value="Healthcare%20%26%20Medicine">Healthcare & Medicine</option>
              <option value="HR%20%26%20Recruiting">HR & Recruiting</option>
              <option value="Legal">Legal</option>
              <option value="Marketing%20%26%20PR">Marketing & PR</option>
              <option value="Operations">Operations</option>
              <option value="Project%20%26%20Product%20Management">Project & Product Management</option>
              <option value="Retail">Retail</option>
              <option value="Sales">Sales</option>
              <option value="Social%20Media%20%26%20Community">Social Media & Community</option>
            </select>
          </label>
          <label>
            Select a location:
            <select value={this.state.location} onChange={(e) => this.handleLocationSelect(e)}>
              <option value="New%20York%20City%2C%20NY">New York City, NY</option>
              <option value="San%20Francisco%2C%20CA">San Francisco, CA</option>
            </select>
          </label>
          <input type="submit" value="Search" />
        </Form>
        <div style={{padding: "25px 50px"}}>
          <Card.Group itemsPerRow={4}>
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
          <Button size="large" primary onClick={() => this.nextPage()} style={{position: "absolute", right: "0px"}}>More Results <Icon name="arrow right" /></Button>
        }
        {this.state.pageNum > 1 &&
          <Button size="large" secondary onClick={() => this.prevPage()} style={{position: "absolute", left: "0px"}}><Icon name="arrow left" /> Previous Results </Button>
        }
      </div>
    )
  }
}

export default JobListingsContainer
