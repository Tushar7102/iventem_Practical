const express = require("express");
const { get, post, put, deleteuser, getone } = require("../controllers/crud");
const Middleware = require("../middleware");
const route = express.Router();

route.get("/", Middleware, get);

route.get("/:id", Middleware, getone);

route.post("/post", Middleware, post);

route.put("/put/:id", Middleware, put);
route.delete("/delete/:id", Middleware, deleteuser);

module.exports = route;
