const Artist = require('../models/artist_model');
const Album = require('../models/album_model');

exports.search = async (req, res) => {
  try {
    const { query } = req.query;
    const artists = await Artist.find({ name: { $regex: query, $options: 'i' } }).populate('albums');
    const albums = await Album.find({ title: { $regex: query, $options: 'i' } });
    res.json({ artists, albums });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
