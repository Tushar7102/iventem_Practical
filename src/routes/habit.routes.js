const express = require("express");
const { body, param, query } = require("express-validator");
const auth = require("../middleware/auth.middleware");
const {
  listHabits,
  createHabit,
  completeHabit,
  habitStatus,
} = require("../controllers/habit.controller");

const router = express.Router();

router.use(auth);

router.get("/", listHabits);

router.post("/", body("title").isString().trim().notEmpty(), createHabit);

router.post("/:id/complete", param("id").isString().notEmpty(), completeHabit);

router.get(
  "/:id/status",
  param("id").isString().notEmpty(),
  habitStatus,
);

module.exports = router;
