const express = require('express');
const { body } = require('express-validator');
const { signup, login } = require('../controllers/auth.controller');

const router = express.Router();

router.post(
  '/signup',
  body('name').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 6 }),
  signup
);

router.post(
  '/login',
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 6 }),
  login
);

module.exports = router;
