import React, { useState } from 'react';

export default function App() {
  const [task, setTask] = useState("");
  const [tasksList, setTasksList] = useState([]);

  const handleChange = (event) => {
    setTask(event.target.value);
    console.log(event.target.value);
  };

  const addTask = (task) => {
    setTasksList([...tasksList, task]);
    console.log(tasksList);
  };

  const handleClick = (event) => {
    event.preventDefault();
    addTask(task);
    console.log(task);
  };

    return (
      <div className = "todo-app">
        <div className = "todo-container">
          <input className = "todo-input" type = "text" onChange = {handleChange}/>
          <button className = "todo-btn" onClick = {handleClick}>Add Task</button>
        </div>
        <div>{tasksList.map((elem, index) => <div key = {index}>{elem}</div>)}</div>
      </div>
    );
}
