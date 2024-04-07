import React from 'react';

export default function Controls({
  filterModeValue, handleFilterModeChange,
  sortingTypeValue, handleSortingTypeChange
}) {
  return (
    <div className="controls">
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
    </div>
  )
}
