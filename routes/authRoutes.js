const express = require('express')
const AuthController = require('../controllers/authController')
const protectRoute = require('../middlewares/authMiddleware')
const router = express.Router()



router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/logout', AuthController.logout)
router.get('/profile', protectRoute, AuthController.profile)

module.exports = router