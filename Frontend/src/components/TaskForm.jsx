import { useState, useEffect } from "react";
import { FiSave, FiRotateCcw } from "react-icons/fi";

function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Populate form when editing a task
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "Pending",
        dueDate: editingTask.dueDate
          ? editingTask.dueDate.split("T")[0]
          : "",
      });
      setErrors({});
    }
  }, [editingTask]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 5) {
      newErrors.description = "Description must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Send data to parent
    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      dueDate: formData.dueDate || null,
    });

    // Reset form after successful submit
    resetForm();
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "Pending",
      dueDate: "",
    });
    setErrors({});
    if (editingTask) onCancelEdit();
  };

  // Reusable input class
  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-lg border text-sm transition-all duration-200 outline-none
    ${
      errors[field]
        ? "border-red-500 bg-red-100/50 focus:ring-2 focus:ring-red-500/30"
        : "border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
    }`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fade-in-up">
      {/* Form Header */}
      <h2 className="text-lg font-semibold text-slate-800 mb-5">
        {editingTask ? "✏️ Update Task" : " Create New Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-800 mb-1.5">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className={inputClass("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-800 mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your task"
            rows={3}
            className={`${inputClass("description")} resize-none`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        {/* Status & Due Date - side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1.5">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass("status")}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1.5">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={inputClass("dueDate")}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white 
                       px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 
                       hover:shadow-md cursor-pointer active:scale-95"
          >
            <FiSave size={16} />
            {editingTask ? "Update Task" : "Add Task"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="flex items-center gap-2 bg-slate-50 hover:bg-gray-200 text-slate-500 
                       px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 
                       cursor-pointer active:scale-95 border border-slate-200"
          >
            <FiRotateCcw size={16} />
            {editingTask ? "Cancel" : "Reset"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
