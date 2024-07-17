const urlService = require("../services/Url");
const databaseService = require("../services/Database");
const { validationResult } = require("express-validator");

/**
 * @description Generate a URL Short
 */
exports.generateURL = (req, res, next) => {
  const url = new urlService();
  const db = new databaseService(
    "./db/database.json",
    "./db/backup/database.json"
  );

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.redirect("back");
  }

  db.init();

  url.setFullUrl(req.body.url);

  url.generateShortUrl();

  let data = url.returnUrl();

  db.insert(data);

  res.cookie("shortId", data.shortUrl, { maxAge: 12000 });

  return res.redirect("back");
};

exports.redirectURL = (req, res, next) => {
  const db = new databaseService(
    "./db/database.json",
    "./db/backup/database.json"
  );

  db.init();
  const urlId = req.params.urlID;

  const url = db.ifExistsReturn(urlId);

  if (!url) {
    return res.redirect("/api");
  }

  res.redirect(url);
};

exports.show = (req, res, next) => {
  res.render("index", {
    url: req.body.url,
    shortId: req.cookies.shortId,
    host: req.headers.host,
  });
};
