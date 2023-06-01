const express = require('express');
const StoreRouter = express.Router();
const Controller = require('../controllers/Controller') 
const Middleware = require('../middlewares/MiddleWare');

StoreRouter.get(
    '/',
    Middleware.auth.authenticateToken,
    Middleware.auth.isAdmin,
    Controller.Store.showStore
)

StoreRouter.get(
    '/:id',
    Middleware.auth.authenticateToken,
    Middleware.validate.getStore,
    Controller.Store.getStore
    )

StoreRouter.post(
    '/',
    Middleware.auth.authenticateToken,
    Middleware.auth.isAdmin,
    Middleware.validate.createStore,
    Controller.Store.createStore
)

StoreRouter.delete(
    '/',
    Middleware.auth.authenticateToken,
    Middleware.auth.isAdmin,
    Controller.Store.destroyStore
)



module.exports = StoreRouter;