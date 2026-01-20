const express = require("express");
const auth = require("../middleware/auth.middleware");
const { listHabits, createHabit, completeHabit, habitStatus } = require("../controllers/habit.controller");

const router = express.Router();

router.use(auth);

router.get("/", listHabits);

router.post("/", createHabit);

router.post("/:id/complete", completeHabit);

router.get("/:id/status", habitStatus);

module.exports = router;
