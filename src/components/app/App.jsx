import React, { useState } from 'react';

export default function App() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasksList, setTasksList] = useState([]);
  const [error, setError] = useState('');

  const handleChangeName = (event) => {
    setTaskName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setTaskDescription(event.target.value);
  };

  const clearInputs = () => {
    setTaskName('');
    setTaskDescription('');
  };

  const handleAddTask = () => {
    if (taskName) {
      setTasksList([...tasksList, {id: Date.now(), name: taskName, description: taskDescription}]);
      clearInputs();
      setError('');
    } else {
      setError('"Task Name" can not be empty');
    }
  };

  return (
    <div className="todo-app">
      <div className="todo-container">
        <div className="inputs-container">
          <label className="form-label" htmlFor="task-name-input">Task Name</label>
          <input className="task-name-input form-control mb-2" type="text" id="task-name-input" onChange={handleChangeName} value={taskName}/>
          <label className="form-label" htmlFor="task-description-input">Task Description</label>
          <input className="task-description-input form-control mb-2" type="text" id="task-description-input" onChange={handleChangeDescription} value={taskDescription}/>
        </div>
        <button className="todo-btn btn btn-dark m-2" onClick={handleAddTask}>Add Task</button>
        {error ? <p style={{color: "red"}}>{error}</p> : null}
      </div>
      <table className="mt-2">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Task Description</th>
          </tr>
        </thead>
          <tbody>
            {tasksList.map((elem) => <tr key={elem.id}><td>{elem.name}</td><td>{elem.description}</td></tr>)}
          </tbody>
      </table>
    </div>
  );
}
