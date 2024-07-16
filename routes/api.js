const { body } = require("express-validator");
const express = require("express");
const router = express.Router();

const urlController = require("../controllers/urlController");

router.use(express.json());

router.get("/api/", urlController.show);

router.get("/:urlID", urlController.redirectURL);

router.post(
  "/api/short",
  body("url").isString().isURL(),
  urlController.generateURL
);

module.exports = router;
