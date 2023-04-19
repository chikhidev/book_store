const {express} = require("../server.imports")
const Controller = require("../controllers/Controller")
const Middleware = require("../middlewares/MiddleWare")
const UserRouter = express.Router();

//define user routes
UserRouter.get("/", Controller.User.findByEmail)

UserRouter.post("/create",Controller.User.createUser) //this a private route it requires a password

UserRouter.delete("/drop",Controller.User.dropUser) //this a private route it requires a password

UserRouter.get("/:id", Controller.User.findById)
UserRouter.get("/:id/full", Controller.User.findFullById)
UserRouter.get("/:id/store", Controller.User.findStoreById)
UserRouter.get("/:id/card", Controller.User.findCardByID)
UserRouter.get("/:id/saved", Controller.User.findCardByID) //this a private route it requires a password


module.exports = UserRouter