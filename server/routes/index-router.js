"use strict";

const express = require("express");
const indexRouter = express.Router();

const userRouter = require("./user-router");
const comicRouter = require("./comic-router");
const authenticate = require("../middlewares/authenticate");

indexRouter.use("/", userRouter);

indexRouter.use(authenticate);

indexRouter.use("/comics", comicRouter);


module.exports = indexRouter;