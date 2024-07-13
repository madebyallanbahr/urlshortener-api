const express = require('express');
const dotenv = require('dotenv')
const api = express();
dotenv.configDotenv();

api.use(express.urlencoded({ extended: true }));
api.use(express.json());

// rotas

api.listen(process.env.API_PORT, ()  => {
    console.warn(`API is on port:${process.env.API_PORT}`)
})