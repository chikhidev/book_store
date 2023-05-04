const multer = require('multer');

const storageBooks = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../images/books');
    },
    filename: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
  });

const uploadImage = multer({ storage: storageBooks }); 
  



//controllers
const uploadBookImage = (req, res, next) => {
    try{
        uploadImage.single('image')
        next()
    }
    catch(err){
        return res.json({
            success:false,
            data:{
              message:'Failed to upload image'
            }
        })
    }
    
}


  

  module.exports = {
    uploadBookImage
  }