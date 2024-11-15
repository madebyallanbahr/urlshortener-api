import express from "express";
import { routes } from "./routes/api.js";
import cors from "cors";

const api = express();

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

api.listen(4440, () => {
	console.warn(`API is Online!`);
});
