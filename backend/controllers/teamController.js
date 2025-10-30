const teamService = require("../services/teamService");

exports.createTeam = async (req, res, next) => {
  try {
    const { team_name } = req.body;
    const userId = req.user.userId;
    const team = await teamService.createTeam(team_name, userId);
    res.status(201).json({
      status: "success",
      team_id: team.team_id,
      team_name: team.team_name,
      join_code: team.join_code,
      message: "Ekip başarıyla oluşturuldu.",
    });
  } catch (error) {
    next(error);
  }
};

exports.joinTeam = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { join_code } = req.body;
    const team = await teamService.joinTeam(userId, join_code);
    res.status(201).json({
      status: "success",
      message: `${team.team_name} ekibine başarıyla katıldınız.`,
      team_id: team.team_id,
    });
  } catch (error) {
    next(error);
  }
};
