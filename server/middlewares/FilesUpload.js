const multer = require('multer');
const path = require('path');
const fs = require('fs');


//books ------------------------------------------------------
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

const uploaderBookImage = multer({
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
    uploaderBookImage.single('image')(req, res, function (err) {
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

//users -------------------------------------------------------
const storageUsers = multer.diskStorage({
  destination: function (req, file, cb) {
    const absolutePath = path.join(__dirname, '../images/users');
    cb(null, absolutePath);
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + '-' + uniqueSuffix + extension;
    const imagePath = path.join(__dirname, '../images/users', filename);

    // Check if the image file already exists
    if (fs.existsSync(imagePath)) {
      return cb(new Error('Image file already exists'));
    }

    cb(null, filename);

    // Store the image path in req object
    req.imagePath = imagePath;
    req.filename = filename;
  },
});

const uploaderUserImage = multer({
  storage: storageUsers,
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

const uploadUserImage = (req, res, next) => {
  try {
    uploaderUserImage.single('image')(req, res, function (err) {
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

//offers -------------------------------------------------------
const storageOffers = multer.diskStorage({
  destination: function (req, file, cb) {
    const absolutePath = path.join(__dirname, '../images/offers');
    cb(null, absolutePath);
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + '-' + uniqueSuffix + extension;
    const imagePath = path.join(__dirname, '../images/offers', filename);

    // Check if the image file already exists
    if (fs.existsSync(imagePath)) {
      return cb(new Error('Image file already exists'));
    }

    // Store the image path in req object
    req.imagePath = imagePath;
    req.filename = filename

    cb(null, filename);
    
  },
});

const uploaderOfferImage = multer({
  storage: storageOffers,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
      cb(null, false); // Reject the file
    } else {
      cb(null, true); // Accept the file
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 MB
  },
});

const uploadOfferImage = (req, res, next) => {
  

  try {

    uploaderOfferImage.single('image')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.json({
          success: false,
          data: {
            message: "Échec lors du téléchargement de l'image",
            err,
          },
        });
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.json({
          success: false,
          data: {
            message: "Échec du téléchargement de l'image, assurez-vous de sélectionner le fichier image (png, jpeg, jpg)",
            err,
          },
        });
      }

      // Create a copy of the req object without circular references
      const sanitizedReq = JSON.parse(JSON.stringify(req, getCircularReplacer()));

      // Everything went fine.
      next();
    });
  } catch (err) {
    return res.json({
      success: false,
      data: {
        message: "Impossible de télécharger l'image",
      },
    });
  }
};

// Helper function to handle circular references
function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}



module.exports = {
  uploadBookImage, uploadUserImage, uploadOfferImage
};
