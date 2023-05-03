// routes for handling book requests
const { express } = require('../server.imports');
const Middleware = require('../middlewares/Middleware');
const Controller = require('../controllers/Controller');

const BookRoute = express.Router();

// get all books
BookRoute.get('/', Controller.Book.getAllBooks);

// get a book by ID
BookRoute.get(
            '/:id',
            Controller.Book.getBookById
            );

// create a new book
BookRoute.post(
            '/create',
            Middleware.auth.authenticateToken,
            Middleware.auth.isAdmin,
            Middleware.validate.createBook,
            Controller.Book.createBook
            );

// update a book by ID
BookRoute.put(
            '/:id',
            Middleware.auth.authenticateToken,
            Middleware.auth.isAdmin,
            Controller.Book.updateBook
            );

// delete a book by ID
BookRoute.delete(
            '/:id',
            Middleware.auth.authenticateToken,
            Middleware.auth.isAdmin,
            Controller.Book.deleteBook
            );

module.exports = BookRoute;
