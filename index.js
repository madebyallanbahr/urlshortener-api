const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/api");
const api = express();
dotenv.configDotenv();

api.use(express.urlencoded({ extended: true }));
api.use(express.json());

api.use("/", routes);

api.listen(process.env.API_PORT || 4000, () => {
  console.warn(`API is on port:${process.env.API_PORT}`);
});
