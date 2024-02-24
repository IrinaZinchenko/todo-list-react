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
          <input className = "task-name-input" type = "text" onChange = {handleChangeName}/>
          <input className = "task-description-input" type = "text" onChange = {handleChangeDescription}/>
          </div>
          <button className = "todo-btn" onClick = {handleClick}>Add Task</button>
        </div>

        <table>
  <tr>
    <th>Task</th>
    <th>Description</th>
  </tr>
  {tasksList.map((elem, index) => <tr key={index}><td>{elem.name}</td><td>{elem.description}</td></tr>)}
</table>

        {/* <ul className = "tasks-list">{tasksList.map((elem, index) => <li key = {index}><div>{elem.name}</div><div>{elem.description}</div></li>)}
        </ul> */}
      </div>
    );
}
