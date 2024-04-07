import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from 'react';
import useFilter from '../../hooks/useFilter';
import useSorting from '../../hooks/useSorting';

import CreateForm from './CreateForm';
import Controls from './Controls';
import TodosTable from './TodosTable';

const mock = [
  {id: 1, name: 'Buy groceries', description: 'Buy fruits, vegetables, and milk', date: '2024-03-20', isChecked: false},
  {id: 2, name: 'Finish report', description: 'Complete the annual sales report', date: '2024-03-27', isChecked: false},
  {id: 3, name: 'Pick up kids', description: 'Pick up kids from school at 3pm', date: '2024-03-20', isChecked: false},
];

export default function App() {
  const [tasksList, setTasksList] = useState([...mock]);
  const [taskId, setTaskId] = useState(null);

  const {filteredTasks, filterModeValue, handleFilterModeChange} = useFilter(tasksList, 'all');
  const {sortedTasks, sortingTypeValue, handleSortingTypeChange} = useSorting(filteredTasks, 'ascending');

  return (
    <div className="todo-app">
      <CreateForm {...{
        tasksList, setTasksList,
        taskId, setTaskId
      }}/>

      <Controls {...{
        filterModeValue, handleFilterModeChange,
        sortingTypeValue, handleSortingTypeChange
      }}/>

      <TodosTable {...{
        tasksList, setTasksList,
        sortedTasks,
        setTaskId
      }}/>
    </div>
  );
}
