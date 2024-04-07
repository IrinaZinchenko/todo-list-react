import React, { useState, useEffect } from 'react';

export default function CreateForm({
  tasksList, setTasksList,
  taskId, setTaskId
}) {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [error, setError] = useState('');

  const handleChangeName = (event) => {
    setTaskName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleChangeDate = (event) => {
    setTaskDate(event.target.value);
  };

  const clearInputs = () => {
    setTaskName('');
    setTaskDescription('');
    setTaskDate('');
  };

  const handleAddTask = () => {
    if (taskName) {
      setTasksList([...tasksList, {id: Date.now(), name: taskName, description: taskDescription, date: taskDate, isChecked: false}]);
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
      newTasksList[taskObjectIndex] = {...newTasksList[taskObjectIndex], name: taskName, description: taskDescription, date: taskDate};

      setTasksList(newTasksList);
      setTaskId(null);
      clearInputs();
    }
  };

  const cancelEditing = () => {
    setTaskId(null);
    clearInputs();
  };

  useEffect(() => {
    if (taskId === null) return;

    const currentTask = tasksList.find((task) => task.id === taskId);

    setTaskName(currentTask.name);
    setTaskDescription(currentTask.description);
    setTaskDate(currentTask.date);
  }, [taskId]);

  return (
    <div className="todo-container">
        <div className="inputs-container">
          <label className="form-label" htmlFor="task-name-input">Task Name</label>
          <input className="form-control mb-2" type="text" id="task-name-input" onChange={handleChangeName} value={taskName}/>
          <label className="form-label" htmlFor="task-description-input">Task Description</label>
          <textarea rows={4} className="form-control mb-2" type="text" id="task-description-input" onChange={handleChangeDescription} value={taskDescription}/>
          <label className="form-label" htmlFor="task-date-input">Date</label>
          <input className="form-control mb-2" type="date" id="task-date-input" onChange={handleChangeDate} value={taskDate}/>
        </div>
        {taskId ?
          <>
            <button className="btn btn-dark m-2" onClick={handleSaveTask}>Save Task</button>
            <button className="btn btn-dark m-2" onClick={cancelEditing}>Cancel</button>
          </>
          :
          <button className="btn btn-dark m-2" onClick={handleAddTask}>Add Task</button>}
        {error ? <p style={{color: "red"}}>{error}</p> : null}
    </div>
  )
}
