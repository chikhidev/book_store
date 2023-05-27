const { express } = require('../server.imports');
const Controller = require('../controllers/Controller');
const MiddleWare = require('../middlewares/MiddleWare')

const FavouritesRouter = express.Router();

FavouritesRouter.get(
    '/',
    MiddleWare.auth.authenticateToken,
    Controller.Fav.getFavourites
    )

FavouritesRouter.get(
    '/:id',
    MiddleWare.auth.authenticateToken,
    Controller.Fav.isBookFav
)

FavouritesRouter.post(
    '/:id',
    MiddleWare.auth.authenticateToken,
    Controller.Fav.toggleFavourite
    )

module.exports = FavouritesRouter
