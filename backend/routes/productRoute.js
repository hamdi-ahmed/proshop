const express = require('express')
const router = express.Router()
const { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopRatedProducts } = require('../controllers/productsController.js')
const admin = require('../middleware/adminMiddleware')
const protect = require('../middleware/authMiddleware')


//For get all products 
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)


router.route('/:id/reviews').post(protect, createProductReview)

router.get('/top', getTopRatedProducts)

//for get Single Product
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)


module.exports = router