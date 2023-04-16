const {express} = require("../requires")
const Controller = require("../controller")
const UserRouter = express.Router();

UserRouter.get("/", Controller.User.view)
UserRouter.get("/create", Controller.User.create)
UserRouter.get("/delete", Controller.User.remove)

module.exports = UserRouter