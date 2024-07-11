const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');

router.get('/', albumController.getAlbums);
router.post('/', albumController.createAlbum);
router.put('/:id', albumController.updateAlbum);
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;
