const Artist = require('../models/artist_model');
const Album = require('../models/album_model');

const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find().populate('albums');
    res.json(artists);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const createArtist = async (req, res) => {
  const { name } = req.body;

  try {
    const newArtist = new Artist({ name });
    await newArtist.save();
    res.status(201).json(newArtist);
  } catch (err) {
    res.status(400).json({ message: 'Error creating artist' });
  }
};

const updateArtist = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const artist = await Artist.findByIdAndUpdate(id, { name }, { new: true });
    res.json(artist);
  } catch (err) {
    res.status(400).json({ message: 'Error updating artist' });
  }
};

const deleteArtist = async (req, res) => {
  const { id } = req.params;

  try {
    await Artist.findByIdAndDelete(id);
    res.json({ message: 'Artist deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting artist' });
  }
};
module.exports = {
  getArtists,
  createArtist,
  updateArtist,
  deleteArtist,
};