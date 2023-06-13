require("dotenv");
const express = require("express");
const app = express();
const connection = require("./db");
const cors = require("cors");
const userRoutes = require("./routes/user");

const port = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use("/api/users", userRoutes);

connection();

app.get("/", (req, res) => {
  return res.json({ message: "hello" });
});

app.listen(port, console.log(`Listening on ${port}`));
