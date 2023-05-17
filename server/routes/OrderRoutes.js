const {express} = require("../server.imports")
const Controller = require("../controllers/Controller")
const Middleware = require("../middlewares/MiddleWare")
const OrderRoute = express.Router();

// GET all orders
OrderRoute.get(
    "/",
    Middleware.auth.authenticateToken,
    Middleware.validate.createOrder,
    Controller.Order.getOrders
    );

// GET a single order by ID
OrderRoute.get("/:id",  Middleware.auth.authenticateToken, Controller.Order.getOrder);

// POST a new order
OrderRoute.post("/",  Middleware.auth.authenticateToken, Controller.Order.createOrder);

// UPDATE an existing order by ID
OrderRoute.put("/:id",  Middleware.auth.authenticateToken, Controller.Order.updateOrder);

// DELETE an order by ID
OrderRoute.delete("/:id",  Middleware.auth.authenticateToken, Controller.Order.deleteOrder);


module.exports = OrderRoute