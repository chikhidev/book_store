const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const storageBooks = multer.diskStorage({
  destination: function (req, file, cb) {
    const absolutePath = path.join(__dirname, '../images/books');
    cb(null, absolutePath);
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + '-' + uniqueSuffix + extension;
    const imagePath = path.join(__dirname, '../images/books', filename);

    // Check if the image file already exists
    if (fs.existsSync(imagePath)) {
      return cb(new Error('Image file already exists'));
    }

    // Store the image path in req object
    req.imagePath = imagePath;

    cb(null, filename);
  },
});

const uploadImage = multer({
  storage: storageBooks,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
      cb(new Error('Only image files are allowed'));
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 MB
  },
}).single('image')

const uploadBookImage = async (req, res, next) => {
  uploadImage(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ success: false, data: { message: err.message } });
    }

    // Check if no file was uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, data: { message: 'No file uploaded' } });
    }

    try {
      const resizedImage = await sharp(req.file.buffer)
        .resize({ width: 300 })
        .jpeg({ quality: 70 })
        .toBuffer();

      // Save the resized image to the server
      fs.writeFile(req.imagePath, resizedImage, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, data: { message: 'Failed to upload image' } });
        }
        next();
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, data: { message: 'Failed to resize image' } });
    }
  });
};

module.exports = {
  uploadBookImage,
};
