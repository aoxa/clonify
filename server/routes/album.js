const router = require("express").Router();
const Album = require("../models/album");

router.get("/", async (req, res) => {
  const albums = await Album.find();
  return res.status(200).json({ success: true, albums });
});

router.get("/:id", async (req, res) => {
  const album = await Album.findById(req.params.id);
  if (album) {
    return res.status(201).json({ success: true, album });
  }
  return res.status(404).json({ success: false });
});

router.post("/", async (req, res) => {
  const newAlbum = new Album({
    name: req.body.name,
    imageURL: req.body.image,
  });

  try {
    const album = await newAlbum.save();
    return res.status(201).json({ success: true, album });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
});

router.put("/:id", async (req, res) => {
  const options = {
    upsert: true,
    new: true,
  };
  filter = {
    _id: req.params.id,
  };

  const album = await Album.findOneAndUpdate(
    filter,
    {
      name: req.body.name,
      imageURL: req.body.image,
    },
    options
  );

  return res.status(200).json({ success: true, album });
});

module.exports = router;
