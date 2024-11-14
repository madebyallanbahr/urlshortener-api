import express from "express";
const router = express.Router();

import * as urlController from "../controllers/urlController.js";

router.use(express.json());

router.get("/:urlID", urlController.redirectURL);

router.post("/api/short", urlController.generateURL);

export const routes = router;
