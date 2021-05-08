const mongoose = require('mongoose')
const colors = require('colors')


const mongoDBConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.log(`Error: ${err.message}`.red.underline.bold)
        process.exit(1)
    }
}

module.exports = mongoDBConnection