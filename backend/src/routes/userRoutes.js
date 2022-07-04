const express = require('express')
const { registerUser, loginUser, getMe, updateMe, deleteMe } = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/me').get(protect ,getMe)
// router.route('/me').put(updateMe).delete(deleteMe)

module.exports = router 