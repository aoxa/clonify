const router = require("express").Router();
const Artist = require("../models/artist");

router.get("/", async (req, res) => {
  return res.json(await Artist.find());
});

router.post("/", async (req, res) => {
  const newArtist = new Artist({
    name: req.body.name,
    imageURL: req.body.image,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
  });

  try {
    const artist = await newArtist.save();
    return res.status(201).json({ success: true, artist });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

router.get("/:id", async (req, res) => {
  const artist = await Artist.findById(req.params.id);
  if (artist) {
    return res.json({ success: true, artist });
  }

  return res.status(404).json({ success: false });
});

router.put("/:id", async (req, res) => {
  const filter = {
    _id: req.params.id,
  };
  const options = {
    upsert: true,
    new: true,
  };

  const result = await Artist.findOneAndUpdate(
    filter,
    {
      name: req.body.name,
      imageURL: req.body.image,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
    },
    options
  );

  return res.status(200).json(result);
});

router.delete("/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const result = await Artist.deleteOne(filter);
  if (result) {
    return res.json({ success: true, result });
  }

  return res.status(404).json({ success: false });
});

module.exports = router;
