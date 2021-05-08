const Order = require('../models/orderModel')
const asyncHandler = require('express-async-handler')


//Get All Orders 
const orderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body
    const order = await Order.find({})
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('Your Cart is empty')
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
        const createOrder = await order.save()
        res.status(201).json(createOrder)
    }
})

//Get Single Order By Id
const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

//update order to paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true,
            order.paidAt = Date.now(),
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})


const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

//@desc GET all orders
//@route GET/api/orders
//@access private 
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})


module.exports = {
    orderItems,
    getOrder,
    updateOrderToPaid,
    getMyOrders,
    getAllOrders
}