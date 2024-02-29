import React, { useState } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasksList, setTasksList] = useState([]);
  const [error, setError] = useState('');

  const handleKeypress = (event) => {
    // it triggers by pressing the enter key
    if (event.keyCode === 13) {
    handleSaveTask();
    }
  };

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

  const handleSaveTask = () => {
    if (taskName) {
      setTasksList([...tasksList, {id: Date.now(), name: taskName, description: taskDescription, statusCompleted: false, isEditing: false}]);
      clearInputs();
      setError('');
    } else {
      setError('"Task Name" can not be empty');
    }
  };

  const deleteTask = (id) => {
    setTasksList([...tasksList.filter((task) => task.id !== id)]);
  };

  return (
    <div className="todo-app">
      <div className="todo-container">
        <div className="inputs-container">
          <label className="form-label" htmlFor="task-name-input">Task Name</label>
          <input className="task-name-input form-control mb-2" type="text" id="task-name-input" onChange={handleChangeName} onKeyDown={handleKeypress} value={taskName}/>
          <label className="form-label" htmlFor="task-description-input">Task Description</label>
          <input className="task-description-input form-control mb-2" type="text" id="task-description-input" onChange={handleChangeDescription} onKeyDown={handleKeypress} value={taskDescription}/>
        </div>
        <button className="todo-btn btn btn-dark m-2" onClick={handleSaveTask}>Save Task</button>
        {error ? <p style={{color: "red"}}>{error}</p> : null}
      </div>
      <table className="mt-2">
        <thead>
          <tr>
            <th align="center">Status</th>
            <th>Task Name</th>
            <th>Task Description</th>
            <th>Controls</th>
          </tr>
        </thead>
          <tbody>
            {tasksList.map((elem) => {
            return (
            <tr key={elem.id}>
              <td>
                <div className='status-container'>
                  <input type="checkbox" name="" id="" />
                </div>
              </td>
              <td>{elem.name}</td>
              <td>{elem.description}</td>
              <td>
                <div className='controls-container'>
                  <button type='button' className='btn'><i className="bi bi-pencil-square"></i></button>
                  <button type='button' className='btn'><i className="bi bi-x-square" onClick={() => deleteTask(elem.id)}></i></button>
                </div>
              </td>
            </tr>
            )})}
          </tbody>
      </table>
    </div>
  );
}
