const taskService = require("../services/taskService");

exports.createTask = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { task_name, task_details, assignee_id } = req.body;
    const creatorId = req.user.userId;

    const newTask = await taskService.createTask(teamId, {
      task_name,
      task_details,
      assignee_id,
      creatorId,
    });
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const userId = req.user.userId;

    const tasks = await taskService.getTasks(teamId, userId);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { teamId, taskId } = req.params;
    const userId = req.user.userId;

    await taskService.deleteTask(teamId, taskId, userId);
    res.status(200).json(null);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { teamId, taskId } = req.params;
    const userId = req.user.userId;
    const updateData = req.body;

    const updatedTask = await taskService.updateTask(
      teamId,
      taskId,
      userId,
      updateData
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};
