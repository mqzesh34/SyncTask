const db = require("../db");

exports.createTask = async (taskData) => {
  const {
    team_id,
    creator_id,
    assignee_id,
    task_name,
    task_details,
    task_status,
  } = taskData;
  const { rows } = await db.query(
    `
    INSERT INTO tasks 
      (team_id, creator_id, assignee_id, task_name, task_details, task_status)
    VALUES 
      ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `,
    [team_id, creator_id, assignee_id, task_name, task_details, task_status]
  );
  return rows[0];
};

exports.findTaskById = async (taskId) => {
  const { rows } = await db.query("SELECT * FROM tasks WHERE task_id = $1", [
    taskId,
  ]);
  return rows[0];
};

exports.updateTask = async (taskId, updateData) => {
  const { task_status, assignee_id, task_details } = updateData;
  const { rows } = await db.query(
    "UPDATE tasks SET task_status = COALESCE($1, task_status),  task_details = COALESCE($2, task_details), assignee_id = COALESCE($3, assignee_id), updated_at = NOW() WHERE task_id = $4 RETURNING *",
    [task_status, task_details, assignee_id, taskId]
  );
  return rows[0];
};

exports.deleteTask = async (taskId) => {
  const { rows } = await db.query(
    "DELETE FROM tasks WHERE task_id = $1 RETURNING *",
    [taskId]
  );
  return rows[0];
};
