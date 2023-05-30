// routes for handling book requests
const { express } = require('../server.imports');
const Middleware = require('../middlewares/MiddleWare');
const Controller = require('../controllers/Controller');

const ImagesRouter = express.Router();

ImagesRouter.get('/images/books/:id', Controller.Image.BookImage);
ImagesRouter.get('/images/book/:id', Controller.Image.UserImage);

module.exports = ImagesRouter