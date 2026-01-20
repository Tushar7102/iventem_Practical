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
  const { title } = req.body || {};
  if (!title) {
    return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "Title is required" } });
  }
  const habit = await Habit.create({ userId: req.user.id, title: String(title) });
  res.status(201).json({ id: String(habit._id), title: habit.title, active: habit.active, createdAt: habit.createdAt });
}

async function completeHabit(req, res) {
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
  const exists = await Completion.findOne({ habitId: habit._id, date: dateStr }).lean();
  if (!exists) {
    await Completion.create({ habitId: habit._id, date: dateStr });
  }
  res.json({ habitId: String(habit._id), date: dateStr, completed: true });
}

async function habitStatus(req, res) {
  const habit = await Habit.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });
  if (!habit) {
    return res
      .status(404)
      .json({ error: { code: "NOT_FOUND", message: "Habit not found" } });
  }
  const dateStr = String(req.query.date || "").trim();
  if (!dateStr) {
    return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "Query date required" } });
  }
  const completion = await Completion.findOne({ habitId: habit._id, date: dateStr }).lean();
  const completed = !!completion;
  res.json({ habitId: String(habit._id), date: dateStr, completed });
}

module.exports = { listHabits, createHabit, completeHabit, habitStatus };
