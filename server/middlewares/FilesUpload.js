const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

    cb(null, filename);

    // Store the image path in req object
    req.imagePath = imagePath;
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
    width: 200,
    height: 300
  },
});

const uploadBookImage = (req, res, next) => {
  try {
    uploadImage.single('image')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.json({
          success: false,
          data: {
            message: 'Failed while uploading image',
            err,
          },
        });
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.json({
          success: false,
          data: {
            message: 'failed to upload image, make sure you select image file (png, jpeg, jpg)',
            err,
          },
        });
      }
      // Everything went fine.
      next();
    });
  } catch (err) {
    return res.json({
      success: false,
      data: {
        message: 'Unable to upload image',
      },
    });
  }
};

module.exports = {
  uploadBookImage,
};
