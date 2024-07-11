const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artist_controller');

router.get('/', artistController.getArtists);
router.post('/', artistController.createArtist);
router.put('/:id', artistController.updateArtist);
router.delete('/:id', artistController.deleteArtist);

module.exports = router;
