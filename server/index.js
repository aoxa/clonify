require("dotenv");
const express = require("express");
const app = express();
const connection = require("./db");
const port = process.env.PORT || 5000;

connection();

app.listen(port, console.log(`Listening on ${port}`));
