const router = require("express").Router();

const Song = require("../models/song");

router.get("/", async (req, res) => {
  const songs = await Song.find();
  return res.status(200).json(songs);
});

router.get("/:id", async (req, res) => {
  const song = await Song.findById(req.params.id);

  return res.status(200).json(song);
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

router.put("/:id", async (req, res) => {
  const options = {
    upsert: true,
    new: true,
  };
  const filter = {
    _id: req.params.id,
  };

  const song = await Song.findOneAndUpdate(
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
  return res.status(200).json(song);
});

router.delete("/:id", async (req, res) => {
  const result = await Song.deleteOne({ _id: req.params.id });

  return res.status(200).json({ success: true, result });
});

module.exports = router;
