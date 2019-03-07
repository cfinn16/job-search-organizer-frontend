import React from 'react'
import { List, Checkbox } from 'semantic-ui-react'

class Task extends React.Component {
  state = {
    isCompleted: false
  }

  handleCheck = () => {
    this.setState({isCompleted: !this.state.isCompleted})
  }

  labelStyle = {
    textDecoration: this.state.isCompleted ? "line-through": "none",
    fontStyle: this.state.isCompleted ? "italic": "normal"
  }

  render(){
    return (
      <List.Item>
        <Checkbox checked={this.state.isCompleted} onChange={this.handleCheck} id={this.props.data.id} label={this.props.data.description} className={this.labelStyle} />
      </List.Item>
    )
  }
}

export default Task
