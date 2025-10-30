const taskRepository = require("../repositories/taskRepository");
const teamMembershipRepository = require("../repositories/teamMembershipRepository");
const db = require("../db");

exports.createTask = async (teamId, taskData) => {
  const { creatorId, assignee_id } = taskData;
  const membership = await teamMembershipRepository.findMembershipByUserAndTeam(
    creatorId,
    teamId
  );
  if (!membership || membership.role !== "LEADER") {
    throw new Error(
      "Bu ekibe görev oluşturma yetkiniz (LEADER rolü) bulunmamaktadır."
    );
  }
  const assignee = assignee_id || null;

  const dataToSave = {
    team_id: teamId,
    creator_id: creatorId,
    assignee_id: assignee,
    task_name: taskData.task_name,
    task_details: taskData.task_details || null,
    task_status: "TODO",
  };
  const newTask = await taskRepository.createTask(dataToSave);
  return newTask;
};

exports.getTasks = async (teamId) => {
  const { rows } = await db.query(
    "SELECT * FROM tasks WHERE team_id = $1 ORDER BY created_at DESC;",
    [teamId]
  );
  return rows[0];
};
