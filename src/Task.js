import React from 'react'

const Task = (props) => {

  return (
    <div>
      <input id="checkid" type="checkbox"></input>
      <label for="checkid">{props.data.description}</label>
    </div>
  )
}

export default Task
