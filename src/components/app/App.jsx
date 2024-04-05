import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from 'react';
import useFilter from './hooks/useFilter';
import useSorting from './hooks/useSorting';

const mock = [
  {id: 1, name: 'Buy groceries', description: 'Buy fruits, vegetables, and milk', date: '2024-03-20', isChecked: false},
  {id: 2, name: 'Finish report', description: 'Complete the annual sales report', date: '2024-03-27', isChecked: false},
  {id: 3, name: 'Pick up kids', description: 'Pick up kids from school at 3pm', date: '2024-03-20', isChecked: false},
];

export default function App() {
  const [tasksList, setTasksList] = useState([...mock]);

  const {filteredTasks, filterModeValue, handleFilterModeChange} = useFilter(tasksList, 'all');
  const {sortedTasks, sortingTypeValue, handleSortingTypeChange} = useSorting(filteredTasks, 'ascending');

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskId, setTaskId] = useState();
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
      setTaskId();
      clearInputs();
    }
  };

  const editTask = (id) => {
    const currentTask = tasksList.find((task) => task.id === id);

    setTaskName(currentTask.name);
    setTaskDescription(currentTask.description);
    setTaskDate(currentTask.date);
    setTaskId(currentTask.id);
  };

  const cancelEditing = () => {
    setTaskId();
    clearInputs();
  };

  const deleteTask = (id) => {
    setTasksList([...tasksList.filter((task) => task.id !== id)]);
  };

  const changeCheckboxStatus = (id) => {
    const newTasksList = [...tasksList];
    const currentTask = newTasksList.find((task) => task.id === id);

    // проверка мутирования изначального массива
    // исправить мутирование массива на map

    currentTask.isChecked = !currentTask.isChecked;

    setTasksList(newTasksList);
  };

  const completeTask = (id) => {
    const currentTask = tasksList.find((task) => task.id === id);

    if (currentTask.isChecked === true) {
      return true;
    }
  };


  return (
    <div className="todo-app">
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

      <div className="filter-container">
        <label className="form-label" htmlFor="filter">Show tasks:</label>
        <select className="form-select" id="filter" value={filterModeValue} onChange={(event) => handleFilterModeChange(event.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In progress</option>
        </select>
      </div>

      <div className="sorting-container">
        <label className="form-label" htmlFor="sorting">Sort by date:</label>
        <select className="form-select" id="sorting" value={sortingTypeValue} onChange={(event) => handleSortingTypeChange(event.target.value)}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      <table className="mt-2">
        <thead>
          <tr>
            <th align="center">Status</th>
            <th>Task Name</th>
            <th>Task Description</th>
            <th>Date</th>
            <th>Controls</th>
          </tr>
        </thead>
          <tbody>
            {sortedTasks.map((elem) => {
            return (
            <tr key={elem.id}>
              <td>
                <div className='status-container'>
                  <input className="form-check-input" type="checkbox" checked={elem.isChecked} onChange={() => changeCheckboxStatus(elem.id)}/>
                </div>
              </td>
              <td className={completeTask(elem.id) ? "my-text-class" : null}>{elem.name}</td>
              <td className={completeTask(elem.id) ? "my-text-class" : null}>{elem.description}</td>
              <td className={completeTask(elem.id) ? "my-text-class" : null}>{elem.date}</td>
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
