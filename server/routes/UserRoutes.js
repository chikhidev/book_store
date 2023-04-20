const {express} = require("../server.imports")
const Controller = require("../controllers/Controller")
const Middleware = require("../middlewares/MiddleWare")
const UserRouter = express.Router();

//define user routes
UserRouter.get("/", Controller.User.findByEmail)
UserRouter.get("/:id", Controller.User.findById)
UserRouter.get("/:id/full", Controller.User.findFullById)
UserRouter.get("/:id/store", Controller.User.findStoreById)
UserRouter.get("/:id/card", Controller.User.findCardByID)
// UserRouter.get("/:id/saved", Controller.User.findCardByID) //this a private route it requires a password


module.exports = UserRouter