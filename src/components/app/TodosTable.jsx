import React from 'react';

export default function TodosTable({
  tasksList, setTasksList,
  sortedTasks,
  setTaskId
}) {
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

  const editTask = (id) => {
    setTaskId(id);
  };

  const deleteTask = (id) => {
    setTasksList([...tasksList.filter((task) => task.id !== id)]);
  };

  return (
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
  )
}
