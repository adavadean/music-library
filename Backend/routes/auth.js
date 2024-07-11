const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/auth_controller');

router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;
