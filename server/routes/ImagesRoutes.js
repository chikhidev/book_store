// routes for handling book requests
const { express } = require('../server.imports');
const Middleware = require('../middlewares/MiddleWare');
const Controller = require('../controllers/Controller');

const ImagesRouter = express.Router();

ImagesRouter.get('/books/:id', Controller.Image.BookImage);
ImagesRouter.get('/users/:id', Controller.Image.UserImage);
ImagesRouter.get('/offers/:id', Controller.Image.OfferImage);

module.exports = ImagesRouter