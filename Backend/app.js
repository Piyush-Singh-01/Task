require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/tasks", taskRoutes);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});