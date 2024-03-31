import { useState } from 'react';

export default function useFilter() {
  const [statusFilterValue, setStatusFilterValue] = useState('all');

  const handleStatusFilterChange = (event) => {
    setStatusFilterValue(event.target.value);
  };

  const filterTasks = (tasks) => {
    let filteredTasks = [];

    if (statusFilterValue === "completed") {
      filteredTasks = tasks.filter((task) => task.isChecked);
    } else if (statusFilterValue === "in-progress") {
      filteredTasks = tasks.filter((task) => !task.isChecked);
    } else {
      filteredTasks = tasks;
    }

    return filteredTasks;
  };

  return {
    statusFilterValue,
    handleStatusFilterChange,
    filterTasks
  }
}
