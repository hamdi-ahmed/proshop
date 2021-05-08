const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')


const getProducts = asyncHandler(async (req, res) => {
    //Pagination Function
    //Static Number => how many product do you want on one page
    const pageSize = 10
    // api/product/pageNumber=2 
    const page = Number(req.query.pageNumber) || 1

    //get the keyword from user 
    const keyword = req.query.keyword ? {
        name: {
            //using $regex => because if i write iph iphone will shows
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    //Find number of product and make the number of pages
    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    //when we a get a request we will get the page and number of pages
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})


const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product is deleted' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc    Create Product
//@route   POST /api/products/create
//@access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        'name': 'Sample Name',
        'price': 0,
        'user': req.user._id,
        'image': 'images/jp.png',
        'brand': 'Sample Brand',
        'category': 'Sample Category',
        'countInStock': 0,
        'numReviews': 0,
        'description': 'Sample Description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//@desc    Update Product
//@route   PUT /api/products/:id
//@access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product Already Review')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        //push the review to reviews model
        product.reviews.push(review)
        //update number of reviews field
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).json({ message: 'Review Added' })
    } else {
        res.status(404)
        throw new Error(`Product not found`)
    }
})

//@desc  Get top rated of products
//@route api/products/top
//@access public
const getTopRatedProducts = asyncHandler(async (req, res) => {
    //Get top three product are rated
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
})

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopRatedProducts
}


