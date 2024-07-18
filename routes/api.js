const { body, param } = require("express-validator");
const express = require("express");
const router = express.Router();

const urlController = require("../controllers/urlController");

router.use(express.json());

router.get("/:urlID", urlController.redirectURL);

router.post(
  "/api/short",
  body("url")
    .isString()
    .isURL()
    .withMessage("A url fornecida precisa ser uma URL válida!"),
  urlController.generateURL
);

module.exports = router;
