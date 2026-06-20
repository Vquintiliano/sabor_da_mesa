const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authenticate = require('../../../shared/middleware/authenticate');

const router = express.Router();

// Auth routes (public)
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.post('/auth/refresh', authController.refreshToken);

// Profile route (protected)
router.get('/profile', authenticate, authController.getProfile);

// User routes (protected)
router.post('/', authenticate, userController.create);
router.get('/', authenticate, userController.getAll);
router.get('/:id', authenticate, userController.getById);
router.put('/:id', authenticate, userController.update);
router.delete('/:id', authenticate, userController.delete);

module.exports = router;
