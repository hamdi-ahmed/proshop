const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    //Send token
    //console.log(req.headers.authorization)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //decode => JavaScript Object have {id, iat, expDate}
            //console.log(decoded)

            //Get All Data of the user except the password
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('not authorized, no token')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('not authorized, no token !!')
    }

})


module.exports = protect