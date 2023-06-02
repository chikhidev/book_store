const fs = require('fs')

const BookImage = (req, res) => {
    const { id } = req.params;
    const imageUrl = `/images/books/${id}`;

    if (!fs.existsSync(path.join(__dirname, '..', imageUrl))) {
        return res.status(404).json({
        success: false,
        data: {
            message: 'Image non trouvée'
        }
        });
    }


    res.sendFile(path.join(__dirname, '..', imageUrl));
}

const UserImage = (req, res) => {
    const { id } = req.params;
    const imageUrl = `/images/users/${id}`;

    if (!fs.existsSync(path.join(__dirname, '..', imageUrl))) {
        return res.status(404).json({
        success: false,
        data: {
            message: 'Image non trouvée'
        }
        });
    }


    res.sendFile(path.join(__dirname, '..', imageUrl));
}

const OfferImage = (req, res) => {
    const { id } = req.params;
    const imageUrl = `/images/offers/${id}`;

    if (!fs.existsSync(path.join(__dirname, '..', imageUrl))) {
        return res.status(404).json({
        success: false,
        data: {
            message: 'Image non trouvée'
        }
        });
    }


    res.sendFile(path.join(__dirname, '..', imageUrl));
}

module.exports = {
    BookImage, UserImage, OfferImage
}