const {express} = require("../server.imports")
const Controller = require("../controllers/Controller")
const UserRouter = express.Router();

//define user routes
UserRouter.get("/", Controller.User.findByEmail)
UserRouter.post("/create", Controller.User.createUser)
UserRouter.delete("/drop", Controller.User.dropUser)
UserRouter.get("/:id", Controller.User.findById)
UserRouter.get("/:id/full", Controller.User.findFullById)
UserRouter.get("/:id/store", Controller.User.findStoreById)


module.exports = UserRouter