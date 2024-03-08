import React, { useState } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskId, setTaskId] = useState();
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
      setTasksList([...tasksList, {id: Date.now(), name: taskName, description: taskDescription, isChecked: false}]);
      clearInputs();
      setError('');
    } else {
      setError('"Task Name" can not be empty');
    }
  };

  const handleSaveTask = () => {
    if (taskId) {
      const newTasksList = [...tasksList];
      const taskObjectIndex = newTasksList.findIndex((task) => task.id === taskId);
      newTasksList[taskObjectIndex] = {...newTasksList[taskObjectIndex], name: taskName, description: taskDescription};

      setTasksList(newTasksList);
      setTaskId();
      clearInputs();
    }
  };

  const editTask = (id) => {
    const currentTask = tasksList.find((task) => task.id === id);

    setTaskName(currentTask.name);
    setTaskDescription(currentTask.description);
    setTaskId(currentTask.id);
  };

  const cancelEditing = () => {
    setTaskId();
    clearInputs();
  };

  const deleteTask = (id) => {
    setTasksList([...tasksList.filter((task) => task.id !== id)]);
  };

  return (
    <div className="todo-app">
      <div className="todo-container">
        <div className="inputs-container">
          <label className="form-label" htmlFor="task-name-input">Task Name</label>
          <input className="task-name-input form-control mb-2" type="text" id="task-name-input" onChange={handleChangeName} value={taskName}/>
          <label className="form-label" htmlFor="task-description-input">Task Description</label>
          <textarea rows={4} className="task-description-input form-control mb-2" type="text" id="task-description-input" onChange={handleChangeDescription} value={taskDescription}/>
        </div>
        {taskId ?
          <>
            <button className="todo-btn btn btn-dark m-2" onClick={handleSaveTask}>Save Task</button>
            <button className="todo-btn btn btn-dark m-2" onClick={cancelEditing}>Cancel</button>
          </>
          :
          <button className="todo-btn btn btn-dark m-2" onClick={handleAddTask}>Add Task</button>}
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
                  <input class="form-check-input" type="checkbox" id={elem.id + "-checkbox"}/>
                </div>
              </td>
              <td>{elem.name}</td>
              <td>{elem.description}</td>
              <td>
                <div className='controls-container'>
                  <button type='button' className='btn'><i className="bi bi-pencil-square" onClick={() => editTask(elem.id)}></i></button>
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
