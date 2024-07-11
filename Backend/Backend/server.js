const express = require('express');
const connectDB = require('./config/db.js');


const app = express();

connectDB();

app.use('/api/artists', require('./routes/artist'));
app.use('/api/albums', require('./routes/albums'));
app.use('/api/search', require('./routes/search'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
