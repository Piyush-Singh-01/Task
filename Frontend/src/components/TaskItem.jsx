import { FiEdit2, FiTrash2, FiCheckCircle, FiClock, FiCalendar } from "react-icons/fi";

function TaskItem({ task, onEdit, onDelete, onMarkComplete }) {
  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Check if task is overdue
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "Completed";

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md 
                    transition-all duration-300 animate-fade-in-up group">
      {/* Top Row - Title & Status Badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-semibold text-slate-800 leading-snug flex-1">
          {task.title}
        </h3>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap
            ${
              task.status === "Completed"
                ? "bg-emerald-100 text-emerald-500"
                : "bg-amber-100 text-amber-500"
            }`}
        >
          {task.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 mb-4 leading-relaxed line-clamp-2">
        {task.description}
      </p>

      {/* Date Info */}
      <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
        <span className="flex items-center gap-1">
          <FiClock size={13} />
          Created: {formatDate(task.createdAt)}
        </span>
        {task.dueDate && (
          <span
            className={`flex items-center gap-1 ${
              isOverdue ? "text-red-500 font-medium" : ""
            }`}
          >
            <FiCalendar size={13} />
            Due: {formatDate(task.dueDate)}
            {isOverdue && " (Overdue)"}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-200">
        {/* Mark Complete - only show if not already completed */}
        {task.status !== "Completed" && (
          <button
            onClick={() => onMarkComplete(task._id)}
            className="flex items-center gap-1.5 text-xs font-medium text-emerald-500 
                       bg-emerald-100/50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg 
                       transition-all duration-200 cursor-pointer active:scale-95"
            title="Mark as Complete"
          >
            <FiCheckCircle size={14} />
            Complete
          </button>
        )}

        {/* Edit */}
        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-1.5 text-xs font-medium text-indigo-500 
                     bg-indigo-500/5 hover:bg-indigo-500/10 px-3 py-1.5 rounded-lg 
                     transition-all duration-200 cursor-pointer active:scale-95"
          title="Edit Task"
        >
          <FiEdit2 size={14} />
          Edit
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(task._id)}
          className="flex items-center gap-1.5 text-xs font-medium text-red-500 
                     bg-red-100/50 hover:bg-red-100 px-3 py-1.5 rounded-lg 
                     transition-all duration-200 cursor-pointer active:scale-95 ml-auto"
          title="Delete Task"
        >
          <FiTrash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
