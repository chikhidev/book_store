// const {express} = require("../server.imports")
// const Controller = require("../controllers/Controller")
// const Middleware = require("../middlewares/MiddleWare")
// const OrderRoute = express.Router();

// // GET all orders
// OrderRoute.get("/", Middleware.authenticate, Controller.Order.getAllOrders);

// // GET a single order by ID
// OrderRoute.get("/:id", Middleware.authenticate, Controller.Order.getOrderById);

// // POST a new order
// OrderRoute.post("/", Middleware.authenticate, Controller.Order.createOrder);

// // UPDATE an existing order by ID
// OrderRoute.put("/:id", Middleware.authenticate, Controller.Order.updateOrderById);

// // DELETE an order by ID
// OrderRoute.delete("/:id", Middleware.authenticate, Controller.Order.deleteOrderById);


// module.exports = OrderRoute