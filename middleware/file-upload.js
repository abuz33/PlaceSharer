const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinary')

const storage = new CloudinaryStorage({
  cloudinary,
  use_filename: true,
  folder: 'images',
  allowed_formats: ['jpg', 'jpeg', 'png'],
})

const fileUpload = multer({ storage })

module.exports = fileUpload
