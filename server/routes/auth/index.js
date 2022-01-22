const express = require('express');
const router = express.Router();

const AuthController = require('../../controllers/auth/authController');

router.get('/', AuthController.checkAuthenticated);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

module.exports = router;
