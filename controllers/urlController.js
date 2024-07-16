const urlService = require("../services/Url");
const databaseService = require("../services/Database");
const { validationResult } = require("express-validator");

/**
 * @description Generate a URL Short
 */
exports.generateURL = (req, res, next) => {
  const url = new urlService(req.body.url);
  const db = new databaseService(
    "./db/database.json",
    "./db/backup/database.json"
  );

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.redirect("back");
  }

  db.init();

  url.generateShortUrl();

  let data = url.returnUrl();

  db.insert(data);

  res.redirect("back");
};

exports.redirectURL = (req, res, next) => {
  const url = req.params.urlID;
  res.json({ url });
};

exports.show = (req, res, next) => {
  res.render("index", { url: req.body.url });
};
