const {express} = require("../server.imports")
const Controller = require("../controllers/Controller")
const UserRouter = express.Router();

//define user routes
UserRouter.get("/create", Controller.User.create)
UserRouter.get("/:id", Controller.User.findById)
UserRouter.get("/:id/full", Controller.User.findFullById)
UserRouter.get("/:id/store", Controller.User.findStoreById)


module.exports = UserRouter