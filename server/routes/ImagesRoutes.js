// routes for handling book requests
const { express } = require('../server.imports');
const Middleware = require('../middlewares/Middleware');
const Controller = require('../controllers/Controller');

const ImagesRouter = express.Router();

ImagesRouter.get('/images/books/:id', Controller.Image.BookImage);

module.exports = ImagesRouter

