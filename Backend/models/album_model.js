const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  songs: [
    {
      title: String,
      length: String,
    },
  ],
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
});

module.exports = mongoose.model('Album', AlbumSchema);
