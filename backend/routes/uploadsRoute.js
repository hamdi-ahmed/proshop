const path = require('path')
const express = require('express')
const multer = require('multer')
const router = express.Router()


const storage = multer.diskStorage({
    //where is Pic stored
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    //save pic by name and date and extensions
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})


function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extName = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (extName && mimetype) {
        return cb(null, true)
    } else {
        cb('Images Only !')
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
})

//Single image call image
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

module.exports = router