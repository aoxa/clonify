const router = require("express").Router();

const Song = require("../models/song");

router.get("/", async (req, res) => {
  songs = await Song.find();
  return res.status(200).json(songs);
});

router.post("/", async (req, res) => {
  const newSong = new Song({
    name: req.body.name,
    imageURL: req.body.imageURL,
    songURL: req.body.songURL,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    genre: req.body.genre,
  });
  try {
    const song = await newSong.save();
    return res.status(201).json({ success: true, song });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

router.put("/:id", (req, res) => {
  const options = {
    upsert: true,
    new: true,
  };
  const filter = {
    _id: req.params.id,
  };

  const song = Song.findOneAndUpdate(
    filter,
    {
      name: req.body.name,
      imageURL: req.body.imageURL,
      songURL: req.body.songURL,
      album: req.body.album,
      artist: req.body.artist,
      language: req.body.language,
      genre: req.body.genre,
    },
    options
  );
});

module.exports = router;
