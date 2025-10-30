const db = require("../db");
exports.create = async (client, membershipData) => {
  const { user_id, team_id, role } = membershipData;
  const { rows } = await client.query(
    `INSERT INTO team_memberships (user_id, team_id, "role") VALUES ($1, $2, $3) RETURNING *;`,
    [user_id, team_id, role]
  );
  return rows[0];
};

exports.findByUserIdAndTeamId = async (userId, teamId) => {
  const { rows } = await db.query(
    `
    SELECT * FROM team_memberships WHERE user_id = $1 AND team_id = $2
  `,
    [userId, teamId]
  );
  return rows[0];
};

exports.findMembershipByUserAndTeam = async (userId, teamId) => {
  const { rows } = await db.query(
    `SELECT user_id, team_id, role FROM team_memberships WHERE user_id = $1 AND team_id = $2`,
    [userId, teamId]
  );
  return rows[0];
};
