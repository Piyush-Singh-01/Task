import TaskItem from "./TaskItem";

function TaskList({ tasks, onEdit, onDelete, onMarkComplete }) {
  // Show empty state if no tasks
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">📋</p>
        <p className="text-slate-500 font-medium">No tasks found</p>
        <p className="text-sm text-slate-500/70 mt-1">
          Create a new task or adjust your filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onMarkComplete={onMarkComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;
