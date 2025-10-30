const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware.protect, teamController.createTeam);
router.post("/join", authMiddleware.protect, teamController.joinTeam);

module.exports = router;
