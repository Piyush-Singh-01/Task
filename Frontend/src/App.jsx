import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import {getAllTasks, createTask, updateTask, deleteTask,} from "./services/api";

import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import Loader from "./components/Loader";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [deleteId, setDeleteId] = useState(null); // Track task pending deletion

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getAllTasks();
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };


  // Create or Update task
  const handleSubmit = async (taskData) => {
    try {
      if (editingTask) {
        // Update
        await updateTask(editingTask._id, taskData);
        toast.success("Task updated successfully!");
        setEditingTask(null);
      } else {
        // Create
        await createTask(taskData);
        toast.success("Task created successfully!");
      }
      fetchTasks(); 
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  // Show delete confirmation popup
  const handleDelete = (id) => {
    setDeleteId(id);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await deleteTask(deleteId);
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    } finally {
      setDeleteId(null);
    }
  };

  // Edit task - populate form
  const handleEdit = (task) => {
    setEditingTask(task);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Mark task as completed
  const handleMarkComplete = async (id) => {
    try {
      await updateTask(id, { status: "Completed" });
      toast.success("Task marked as completed!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(term) ||
          task.description.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (filterStatus !== "All") {
      result = result.filter((task) => task.status === filterStatus);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === "dueDate") {
        // Tasks without due date go last
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

    return result;
  }, [tasks, searchTerm, filterStatus, sortBy]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
              Total Tasks
            </p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{totalTasks}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
              Completed
            </p>
            <p className="text-2xl font-bold text-emerald-500 mt-1">
              {completedTasks}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
              Pending
            </p>
            <p className="text-2xl font-bold text-amber-500 mt-1">
              {pendingTasks}
            </p>
          </div>
        </div>

        {/* Task Form */}
        <div className="mb-6">
          <TaskForm
            onSubmit={handleSubmit}
            editingTask={editingTask}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        {/* Task List Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fade-in-up">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">📝 Task List</h2>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <Filter
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Tasks */}
          {loading ? (
            <Loader />
          ) : (
            <TaskList
              tasks={filteredTasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMarkComplete={handleMarkComplete}
            />
          )}
        </div>
      </main>

      {/* Delete Confirmation Popup */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-center rounded-xl shadow-lg p-6 w-full max-w-sm mx-4 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-slate-800 mb-2 ">Delete Task</h3>
            <p className="text-sm text-slate-500 mb-6">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-slate-500 bg-slate-100 
                           hover:bg-slate-200 rounded-lg transition-all duration-200 
                           cursor-pointer active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 
                           hover:bg-red-600 rounded-lg transition-all duration-200 
                           cursor-pointer active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
