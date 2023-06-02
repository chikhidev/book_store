const express = require('express');
const OfferRouter = express.Router();
const Controller = require('../controllers/Controller');
const MiddleWare = require('../middlewares/MiddleWare')

OfferRouter.get(
    '/',
    MiddleWare.auth.authenticateToken,
    MiddleWare.auth.isAdmin,
    Controller.Offer.getCurrentuserOffers
)

OfferRouter.get(
    '/top',
    Controller.Offer.getTopOffers
)

OfferRouter.post(
    '/',
    MiddleWare.auth.authenticateToken,
    MiddleWare.auth.isAdmin,
    MiddleWare.file.uploadOfferImage,
    MiddleWare.validate.createOffer,
    Controller.Offer.createOffer
)

module.exports = OfferRouter;