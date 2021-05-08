const express = require('express')
const router = express.Router()
const { orderItems, getOrder, updateOrderToPaid, getMyOrders, getAllOrders } = require('../controllers/orderController')
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')

router.route('/').post(protect, orderItems).get(protect, admin, getAllOrders)
router.route('/myOrders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrder)
router.route('/:id/pay').put(protect, updateOrderToPaid)


module.exports = router