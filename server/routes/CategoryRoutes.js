// routes for handling book requests
const { express } = require('../server.imports');
const Controller = require('../controllers/Controller');
const MiddleWare = require('../middlewares/MiddleWare')

const CategoryRouter = express.Router();

/*
GET /categories - get a list of all categories
GET /categories/:id - get the details of a specific category by ID
POST /categories - create a new category
PUT /categories/:id - update an existing category by ID
*/


//getting categories by query: 
//"/category?name=manga"
CategoryRouter.get('/',Controller.Category.getAllCategories)

CategoryRouter.get('/name',Controller.Category.getCategoryWithBooksByName)

//get category by ID
//example : /category/{id}?page=2
CategoryRouter.get('/:id',Controller.Category.getCategoryById)

//make category:
CategoryRouter.post(
    '/',
    MiddleWare.auth.authenticateToken,
    MiddleWare.auth.isAdmin,
    MiddleWare.validate.createCategory,
    Controller.Category.makeCategory
)

//update category by id
//example: /category/{id}
CategoryRouter.put(
    '/:id',
    MiddleWare.auth.authenticateToken,
    MiddleWare.auth.isAdmin,
    MiddleWare.validate.createCategory,
    MiddleWare.validate.updateCategory,
    Controller.Category.updateCategoryById
)

module.exports = CategoryRouter