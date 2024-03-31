import { useState } from 'react';

export default function useSorting() {
  const [sortingTypeValue, setSortingTypeValue] = useState('by-date');

  const handleSortingTypeChange = (event) => {
    setSortingTypeValue(event.target.value);
  };

  const sortingTasks = (tasks) => {
    let sortedTasks = [];

    if (sortingTypeValue === 'by-date') {
      sortedTasks = tasks.toSorted((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB;
      });
    } else if (sortingTypeValue === 'by-status') {
      sortedTasks = tasks.toSorted((a, b) => {
        let statusA = Number(a.isChecked);
        let statusB = Number(b.isChecked);
        return statusA - statusB;
      });
    }

    return sortedTasks;
  };

  return {
    sortingTypeValue,
    handleSortingTypeChange,
    sortingTasks
  }
}
