const fs = require('fs')

const BookImage = (req, res) => {
    const { id } = req.params;
    const imageUrl = `/images/books/${id}`; // Example URL for a PNG image


    // check if the file exists
    if (!fs.existsSync(path.join(__dirname, '..', imageUrl))) {
        return res.status(404).json({
        success: false,
        data: {
            message: 'Image not found'
        }
        });
    }


    res.sendFile(path.join(__dirname, '..', imageUrl));
}


module.exports = {
    BookImage
}