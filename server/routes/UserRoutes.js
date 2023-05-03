const {express} = require("../server.imports")
const Controller = require("../controllers/Controller")
const Middleware = require("../middlewares/MiddleWare")
const UserRouter = express.Router();

//define user routes
UserRouter.get("/", Controller.User.searchUsers) //this route for searching users takes `user?q=searchTerm` returns a users array
UserRouter.get("/:id", Controller.User.findById)
UserRouter.post(
            "/:id/make_admin", 
            Middleware.auth.authenticateToken,
            Middleware.auth.isAdmin,
            Controller.User.makeAdmin
            )
UserRouter.get("/:id/full", Controller.User.findFullById) //this route for tacking full information about user
UserRouter.get("/:id/store", Controller.User.findStoreById) //this route for showing store of a user
UserRouter.get(
                "/:id/card",
                Middleware.auth.authenticateToken,
                Controller.User.findCardByID
                ) //this route for showing user card it requires login
                
// UserRouter.get("/:id/saved", Controller.User.findCardByID) //this a private route it requires a password


module.exports = UserRouter