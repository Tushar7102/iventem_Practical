const express = require('express');
const authRoutes = require('./routes/auth.routes');
const habitRoutes = require('./routes/habit.routes');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/habits', habitRoutes);

module.exports = app;
