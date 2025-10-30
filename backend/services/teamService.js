const db = require("../db");
const teamRepository = require("../repositories/teamRepository");
const teamMembershipRepository = require("../repositories/teamMembershipRepository");
const crypto = require("crypto");

function generateJoinCode() {
  return crypto.randomBytes(4).toString("hex").toUpperCase();
}

exports.createTeam = async (team_name, userId) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const joinCode = generateJoinCode();

    const newTeam = await teamRepository.createTeam(client, {
      team_name,
      join_code: joinCode,
      created_by: userId,
    });

    await teamMembershipRepository.create(client, {
      user_id: userId,
      team_id: newTeam.team_id,
      role: "LEADER",
    });

    await client.query("COMMIT");
    return newTeam;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

exports.joinTeam = async (userId, join_code) => {
  const client = await db.connect();
  try {
    const team = await teamRepository.getTeamByJoinCode(join_code);
    if (!team) {
      throw new Error("Geçersiz katılma kodu.");
    }
    const membership = await teamMembershipRepository.findByUserIdAndTeamId(
      userId,
      team.team_id
    );
    if (membership) {
      throw new Error("Zaten bu takıma katıldınız.");
    }
    await teamMembershipRepository.create(client, {
      user_id: userId,
      team_id: team.team_id,
      role: "MEMBER",
    });
    return team;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};
