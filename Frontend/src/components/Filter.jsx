function Filter({ filterStatus, onFilterChange, sortBy, onSortChange }) {
  const selectClass =
    "px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none " +
    "transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer";

  return (
    <div className="flex gap-3">
      {/* Filter by Status */}
      <select
        value={filterStatus}
        onChange={(e) => onFilterChange(e.target.value)}
        className={selectClass}
      >
        <option value="All">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Sort By */}
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className={selectClass}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  );
}

export default Filter;
