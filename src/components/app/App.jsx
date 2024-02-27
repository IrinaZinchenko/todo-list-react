import React, { useState } from 'react';

export default function App() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasksList, setTasksList] = useState([]);

  const handleChangeName = (event) => {
    setTaskName(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setTaskDescription(event.target.value);
    console.log(event.target.value);
  };

  const addTask = () => {
    setTasksList([...tasksList, {name: taskName, description: taskDescription}]);
    console.log(tasksList);
  };

  const handleClick = (event) => {
    event.preventDefault();
    addTask(taskName);
    console.log(taskName);
  };

  return (
    <div className = "todo-app">
      <div className = "todo-container">
        <div className = "inputs-container">
          <label className = "form-label" htmlFor = "task-name-input">Task</label>
          <input className = "task-name-input form-control mb-2" type = "text" id = "task-name-input" onChange = {handleChangeName}/>
          <label className = "form-label" htmlFor = "task-description-input">Description</label>
          <input className = "task-description-input form-control mb-2" type = "text" id = "task-description-input" onChange = {handleChangeDescription}/>
        </div>
        <button className = "todo-btn btn btn-dark m-2" onClick = {handleClick}>Add Task</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
          </tr>
        </thead>
          <tbody>
            {tasksList.map((elem, index) => <tr key = {index}><td>{elem.name}</td><td>{elem.description}</td></tr>)}
          </tbody>
      </table>
    </div>
  );
}
