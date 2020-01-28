export const fetchAllTasks = () => {
  return function(dispatch) {
    fetch(`https://the-next-step-api.herokuapp.com/api/v1/tasks`,  {
      method: 'GET',

      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      dispatch({type: 'LOAD_TASKS', tasks: data})
    })
  }
}
