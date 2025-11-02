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

exports.getTasks = async (teamId, userId) => {
  const membership = await teamMembershipRepository.findMembershipByUserAndTeam(
    userId,
    teamId
  );
  if (!membership) {
    throw new Error(
      "Bu ekibin üyesi olmadığınız için görevleri görüntüleyemezsiniz."
    );
  }

  const { rows } = await db.query(
    "SELECT * FROM tasks WHERE team_id = $1 ORDER BY created_at DESC;",
    [teamId]
  );
  return rows;
};

exports.deleteTask = async (teamId, taskId, userId) => {
  const membership = await teamMembershipRepository.findMembershipByUserAndTeam(
    userId,
    teamId
  );
  if (!membership || membership.role !== "LEADER") {
    throw new Error("Bu görevi silme yetkiniz (LEADER rolü) bulunmamaktadır.");
  }

  const task = await taskRepository.findTaskById(taskId);
  if (!task || task.team_id !== parseInt(teamId)) {
    throw new Error("Görev bulunamadı veya bu ekibe ait değil.");
  }

  await taskRepository.deleteTask(taskId);
};

exports.updateTask = async (teamId, taskId, userId, updateData) => {
  const membership = await teamMembershipRepository.findMembershipByUserAndTeam(
    userId,
    teamId
  );
  if (!membership) {
    throw new Error(
      "Bu ekibe üye olmadığınız için görevleri güncelleyemezsiniz."
    );
  }

  const task = await taskRepository.findTaskById(taskId);
  if (!task || task.team_id !== parseInt(teamId)) {
    throw new Error("Görev bulunamadı veya bu ekibe ait değil.");
  }

  const isLeader = membership.role === "LEADER";
  const isAssignee = task.assignee_id === userId;

  if (!isLeader && !isAssignee) {
    throw new Error(
      "Bu görevi güncelleme yetkiniz yok. Yalnızca Liderler veya atanmış kişiler güncelleyebilir."
    );
  }

  const updatedTask = await taskRepository.updateTask(taskId, updateData);
  return updatedTask;
};
