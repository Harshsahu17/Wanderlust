const cloudinary = require('cloudinary'); // ← full module, NOT .v2
const CloudinaryStorage = require('multer-storage-cloudinary');

// Configure on the root module
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // ← v3 internally accesses .v2 itself
  params: {
    folder: 'wanderlust_DEV',
    allowedFormats: ["png", "jpg", "jpeg"],
  },
});

module.exports = { 
  cloudinary: cloudinary.v2, // ← export .v2 for use elsewhere
  storage 
};