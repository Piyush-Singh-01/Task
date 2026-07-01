const express = require("express");
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

// Task CRUD routes
router.get("/", getAllTasks);          // GET    /api/tasks
router.get("/:id", getTaskById);      // GET    /api/tasks/:id
router.post("/", createTask);         // POST   /api/tasks
router.put("/:id", updateTask);       // PUT    /api/tasks/:id
router.delete("/:id", deleteTask);    // DELETE /api/tasks/:id

module.exports = router;
