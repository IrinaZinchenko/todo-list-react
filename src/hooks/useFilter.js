import { useState } from 'react';

export default function useFilter(tasks, defaultFilterMode) {
  const [filterModeValue, setFilterModeValue] = useState(defaultFilterMode);

  const handleFilterModeChange = (mode) => {
    setFilterModeValue(mode);
  };

  const filterTasks = (mode) => {
    let filteredTasks = [];

    if (mode === "completed") {
      filteredTasks = tasks.filter((task) => task.isChecked);
    } else if (mode === "in-progress") {
      filteredTasks = tasks.filter((task) => !task.isChecked);
    } else {
      filteredTasks = tasks;
    }

    return filteredTasks;
  };

  const filteredTasks = filterTasks(filterModeValue);

  return {
    filteredTasks,
    filterModeValue,
    handleFilterModeChange
  }
}
