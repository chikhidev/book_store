const {express} = require("../server.imports")
const Controller = require("../controllers/Controller")
const UserRouter = express.Router();

//define user routes
UserRouter.get("/", Controller.User.view)
UserRouter.get("/create", Controller.User.create)
UserRouter.get("/delete", Controller.User.remove)

module.exports = UserRouter