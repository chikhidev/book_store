// routes for handling book requests
const { express } = require('../server.imports');
const Controller = require('../controllers/Controller');
const MiddleWare = require('../middlewares/MiddleWare')

const CategoryRouter = express.Router();

//getting categories by query: 
//"/category?name=manga"
CategoryRouter.get('/',Controller.Category.getAllCategories)

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

module.exports = CategoryRouter