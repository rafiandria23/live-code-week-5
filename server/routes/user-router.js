"use strict";

const express = require("express");
const userRouter = express.Router();

const UserController = require("../controllers/user-controller");

userRouter.post("/login", UserController.login);
userRouter.post("/register", UserController.register);

module.exports = userRouter;