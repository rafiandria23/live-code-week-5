"use strict";

const jwt = require("jsonwebtoken");
const { User } = require("../models");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.access_token;
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!user) {
      throw createError(400, "Invalid Token!");
    }
    else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};