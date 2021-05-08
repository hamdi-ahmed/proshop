const express = require('express')
const router = express.Router()
const { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUserInfoFromAdmin } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)


router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUserInfoFromAdmin)


module.exports = router