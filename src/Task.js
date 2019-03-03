import React from 'react'

class Task extends React.Component {
  state = {
    isCompleted: false
  }

  handleCheck = () => {
    this.setState({isCompleted: !this.state.isCompleted})
  }

  render(){
    return (
      <li>
        <label style={
          {textDecoration: this.state.isCompleted ? "line-through": "none",
          fontStyle: this.state.isCompleted ? "italic": "normal"
        }}>
        <input checked={this.state.isCompleted} onChange={this.handleCheck}id={this.props.data.id} type="checkbox"></input>
        {this.props.data.description}
        </label>
      </li>
    )
  }
}

export default Task
