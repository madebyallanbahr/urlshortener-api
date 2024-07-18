const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/api");
const cors = require("cors");

const api = express();
dotenv.configDotenv();

api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use(cors());

api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

api.use("/", routes);

api.listen(process.env.API_PORT || 4000, () => {
  console.warn(`API is on port:${process.env.API_PORT}`);
});
