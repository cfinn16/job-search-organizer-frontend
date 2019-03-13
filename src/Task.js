import React from 'react'
import { List, Checkbox } from 'semantic-ui-react'

class Task extends React.Component {
  state = {
    isCompleted: false
  }

  handleCheck = () => {
    this.setState({isCompleted: !this.state.isCompleted})
  }

  render(){
    return (
      <List.Item>
        <Checkbox checked={this.state.isCompleted}
        onChange={this.handleCheck}
        id={this.props.data.id}
        label={this.props.data.description}
        style={{
          textDecoration: this.state.isCompleted ? "line-through": "none"
        }} />
      </List.Item>
    )
  }
}

export default Task
