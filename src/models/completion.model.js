const mongoose = require('mongoose');

const completionSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', index: true, required: true },
  date: { type: String, required: true },
  complete: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

completionSchema.index({ habitId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Completion', completionSchema);
