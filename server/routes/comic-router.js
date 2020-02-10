"use strict";

const express = require("express");
const comicRouter = express.Router();

const ComicController = require("../controllers/comic-controller");

comicRouter.get("/", ComicController.showAllComics);
comicRouter.get("/:id", ComicController.findComic);
comicRouter.put("/:id", ComicController.updateComic);

module.exports = comicRouter;