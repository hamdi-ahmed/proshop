const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const users = require('./data/users')
const products = require('./data/products')
const User = require('./models/userModel')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {
    try {
        //delete data from DB , if it's exist
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        //Insert Data  to User Schema  from users.js file
        const createdUsers = await User.insertMany(users)

        //Create first One is Admin
        const adminUser = createdUsers[0]._id

        //return Product with Admin User who approved the request
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser }
        })

        //Insert data to Products 
        await Product.insertMany(sampleProducts)

        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}