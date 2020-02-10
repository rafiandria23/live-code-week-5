"use strict";

const { Comic } = require("../models");
const createError = require("http-errors");

class ComicController {
  static showAllComics(req, res, next) {
    Comic.findAll()
      .then(comics => {
        res.status(200).send(comics);
      })
      .catch(err => {
        next(err);
      });
  }

  static findComic(req, res, next) {
    Comic.findOne({ where: { id: req.params.id } })
      .then(foundComic => {
        if (!foundComic) {
          throw createError(404, "Comic not found!");
        }
        else {
          res.status(200).json({ comic: foundComic });
        }
      })
      .catch(err => {
        next(err)
      });
  }

  static updateComic(req, res, next) {
    const comicId = req.params.id;
    const comicUpdateData = {
      title: req.body.title,
      author: req.body.author,
      imageUrl: req.body.imageUrl
    };

    Comic.update(comicUpdateData, { where: { id: comicId } })
      .then(updatedComic => {
        return Comic.findOne({ where: { id: comicId } });
      })
      .then(foundComic => {
        res.status(200).json({ comic: foundComic, message: "Success update comic!" });
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = ComicController;