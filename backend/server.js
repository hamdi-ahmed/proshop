//Set dependencies
const path = require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const mongoDBConnection = require('./config/db')
const productRoute = require('./routes/productRoute')
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')
const userRoute = require('./routes/userRoutes')
const orderRoute = require('./routes/orderRoutes')
const uploadsRoutes = require('./routes/uploadsRoute')

dotenv.config()
const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

//MongoDb Connection
mongoDBConnection()



//MiddleWare
app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/upload', uploadsRoutes)


//Send PayPal Client Id to this endpoint
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

//deploy
if (process.env.NODE_ENV === 'production') {
    //make this static folder
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('App is running ...')
    })
}

//make a folder static => which can be accessible for the browser
//const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

//Middleware (Error Handling)
app.use(notFound)
app.use(errorHandler)



//Setup Server
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is Running in ${process.env.NODE_ENV} on Port ${PORT}`.yellow.bold))