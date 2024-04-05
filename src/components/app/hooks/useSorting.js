import { useState } from 'react';

export default function useSorting(tasks, defaultSortingMode) {
  const [sortingTypeValue, setSortingTypeValue] = useState(defaultSortingMode);

  const handleSortingTypeChange = (mode) => {
    setSortingTypeValue(mode);
  };

  const sortingTasks = (mode) => {
    let sortedTasks = [];

    if (mode === 'by-date') {
      sortedTasks = tasks.toSorted((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB;
      });
    } else if (mode === 'by-status') {
      sortedTasks = tasks.toSorted((a, b) => {
        let statusA = Number(a.isChecked);
        let statusB = Number(b.isChecked);
        return statusA - statusB;
      });
    }

    return sortedTasks;
  };

  const sortedTasks = sortingTasks(sortingTypeValue);

  return {
    sortedTasks,
    sortingTypeValue,
    handleSortingTypeChange
  }
}
