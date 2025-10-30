const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const taskController = require("../controllers/taskController");

router.get("/:teamId/tasks", authMiddleware.protect, taskController.getTasks);

router.post(
  "/:teamId/tasks",
  authMiddleware.protect,
  taskController.createTask
);

router.patch(
  "/:teamId/tasks/:taskId",
  authMiddleware.protect,
  taskController.updateTask
);

router.delete(
  "/:teamId/tasks/:taskId",
  authMiddleware.protect,
  taskController.deleteTask
);

module.exports = router;
