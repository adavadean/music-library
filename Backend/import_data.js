const fs = require('fs');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Artist = require('../models/artist_model');
const Album = require('../models/album_model');

connectDB();

const importData = async () => {
  try {
    const rawData = fs.readFileSync('./data.json', 'utf-8');
    console.log('Raw Data:', rawData); 

    const data = JSON.parse(rawData);
    console.log('Parsed Data:', data); 

    await Artist.deleteMany();
    await Album.deleteMany();

    for (const artistData of data) {
      const artist = new Artist({ name: artistData.name });
      await artist.save();

      for (const albumData of artistData.albums) {
        const album = new Album({
          title: albumData.title,
          description: albumData.description,
          songs: albumData.songs,
          artist: artist._id,
        });
        await album.save();

        artist.albums.push(album._id);
      }
      await artist.save();
    }

    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error('Error:', err.message); 
    process.exit(1);
  }
};

importData();