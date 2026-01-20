const { validationResult } = require("express-validator");
const dayjs = require("dayjs");
const Habit = require("../models/habit.model");
const Completion = require("../models/completion.model");

async function listHabits(req, res) {
  const habits = await Habit.find({ userId: req.user.id }).lean();
  const result = habits.map((h) => ({
    id: String(h._id),
    title: h.title,
    active: h.active,
    createdAt: h.createdAt,
  }));
  res.json(result);
}

async function createHabit(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: { code: "VALIDATION_ERROR", message: "Invalid input" } });
  }
  const habit = await Habit.create({
    userId: req.user.id,
    title: req.body.title,
  });
  res
    .status(201)
    .json({
      id: String(habit._id),
      title: habit.title,
      active: habit.active,
      createdAt: habit.createdAt,
    });
}

async function completeHabit(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: { code: "VALIDATION_ERROR", message: "Invalid input" } });
  }
  const habit = await Habit.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });
  if (!habit) {
    return res
      .status(404)
      .json({ error: { code: "NOT_FOUND", message: "Habit not found" } });
  }
  const dateStr = dayjs().format("YYYY-MM-DD");
  try {
    await Completion.updateOne(
      { habitId: habit._id, date: dateStr },
      { $setOnInsert: { habitId: habit._id, date: dateStr } },
      { upsert: true },
    );
  } catch (e) {
  res.status(500).json({ error: { code: "SERVER_ERROR", message: "Could not complete habit" } });
  }
  res.json({ habitId: String(habit._id), date: dateStr, completed: true });
}

async function habitStatus(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: { code: "VALIDATION_ERROR", message: "Invalid input" } });
  }
  const habit = await Habit.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });
  if (!habit) {
    return res
      .status(404)
      .json({ error: { code: "NOT_FOUND", message: "Habit not found" } });
  }
  const dateStr = req.query.date;
  res.json({ habitId: String(habit._id), date: dateStr, completed: true });
}

module.exports = { listHabits, createHabit, completeHabit, habitStatus };
