const express = require("express");
const { check, createUser, loginUser, forgotPassword } = require("../controllers/authRoute");
const Middleware = require("../middleware");
const authRoute = express.Router();

authRoute.get("/get", Middleware, check);
authRoute.post("/createUser", createUser);
authRoute.post("/loginUser", loginUser);
authRoute.post("/forgotPassword", forgotPassword);
module.exports = authRoute;
