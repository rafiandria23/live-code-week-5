"use strict";

const { User } = require("../models");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

class UserController {
  static login(req, res, next) {
    console.log(process.env.JWT_SECRET_KEY);
    const userData = {
      email: req.body.email,
      password: req.body.password
    };

    User.findOne({ where: { email: userData.email } })
      .then(user => {
        if (!user) {
          throw createError(404, "User Not Found!");
        }
        else {
          const payload = {
            name: user.name,
            email: user.email
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
          res.status(200).json({ access_token: token });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static register(req, res, next) {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    User.create(newUserData)
      .then(newUser => {
        const payload = {
          name: req.body.name,
          email: req.body.email
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
        res.status(201).json({ access_token: token });
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = UserController;