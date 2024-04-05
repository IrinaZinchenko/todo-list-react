import { useState } from 'react';

export default function useSorting(tasks, defaultSortingMode) {
  const [sortingTypeValue, setSortingTypeValue] = useState(defaultSortingMode);

  const handleSortingTypeChange = (mode) => {
    setSortingTypeValue(mode);
  };

  const sortingTasks = (mode) => {
    let sortedTasks = [];

    if (mode === 'ascending') {
      sortedTasks = tasks.toSorted((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB;
      });
    } else if (mode === 'descending') {
      sortedTasks = tasks.toSorted((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateB - dateA;
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
