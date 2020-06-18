const cloudinary = require('cloudinary').v2

console.log(require('cloudinary').v2.uploader.upload_stream)

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
})
