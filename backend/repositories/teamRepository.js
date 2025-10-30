const db = require("../db");

exports.createTeam = async (client, teamData) => {
  const { team_name, join_code, created_by } = teamData;

  const { rows } = await client.query(
    "INSERT INTO teams (team_name, join_code, created_by) VALUES ($1, $2, $3) RETURNING *;",
    [team_name, join_code, created_by]
  );
  return rows[0];
};

exports.getTeamByJoinCode = async (join_code) => {
  const { rows } = await db.query("SELECT * FROM teams WHERE join_code = $1", [
    join_code,
  ]);
  return rows[0];
};
