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
