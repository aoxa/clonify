require("dotenv");
const express = require("express");
const app = express();
const connection = require("./db");
const cors = require("cors");
const userRoutes = require("./routes/user");
const artistRoutes = require("./routes/artist");
const albumRoutes = require("./routes/album");
const songRoutes = require("./routes/song");

const port = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/songs", songRoutes);

connection();

app.get("/", (req, res) => {
  return res.json({ message: "hello" });
});

app.listen(port, console.log(`Listening on ${port}`));
