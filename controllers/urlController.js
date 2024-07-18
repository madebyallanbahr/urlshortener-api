const urlService = require("../services/Url");
const databaseService = require("../services/Database");
const { validationResult } = require("express-validator");
const { configDotenv } = require("dotenv");
configDotenv();

const db = new databaseService(
  "./db/database.json",
  "./db/backup/database.json"
);

const url = new urlService();

db.init();

/**
 * @description Generate a URL Short
 */
exports.generateURL = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res
      .status(422)
      .json({ error: result.mapped().url.msg, status: 422 });
  }

  url.setFullUrl(req.body.url);

  url.generateShortUrl();

  url.generateUserId(
    req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
  );

  let data = url.returnData();

  db.insert(data);

  return res.json({ full: data.fullUrl, short: data.shortUrl });
};

/**
 * @description Redirect to the URL
 */
exports.redirectURL = (req, res, next) => {
  const urlId = req.params.urlID;
  const url = db.ifExistsReturn(urlId).then((val) => {
    this.redirect = val;
  });

  if (!this.redirect) {
    return res
      .status(422)
      .json({ error: "URL Encurtada não encontrada!", status: 422 });
  }

  res.redirect(this.redirect);
};
