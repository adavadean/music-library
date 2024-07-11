const Album = require('../models/album_model');
const Artist = require('../models/artist_model');

const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate('artist');
    res.json(albums);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
const createAlbum = async (req, res) => {
  const { title, description, songs, artist } = req.body;

  try {
    const newAlbum = new Album({ title, description, songs, artist });
    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(400).json({ message: 'Error creating album' });
  }
};

const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { title, description, songs, artist } = req.body;

  try {
    const album = await Album.findByIdAndUpdate(
      id,
      { title, description, songs, artist },
      { new: true }
    );
    res.json(album);
  } catch (err) {
    res.status(400).json({ message: 'Error updating album' });
  }
};

const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    await Album.findByIdAndDelete(id);
    res.json({ message: 'Album deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting album' });
  }
};
module.exports = {
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
