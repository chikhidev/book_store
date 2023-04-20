const {express} = require("../server.imports")
const Controller = require("../controllers/Controller")
const Middleware = require("../middlewares/MiddleWare")
const AuthRouter = express.Router();

//loging route
AuthRouter.post(
                "/login",
                Middleware.validate.validateEmailPass,
                Controller.Auth.login
                )

// register route
AuthRouter.post(
                "/register",
                Middleware.validate.validateUserNameEmailPass,
                Controller.Auth.register
                )

//drop user route
AuthRouter.delete(
                "/drop",
                Middleware.validate.validateEmailPass,
                Controller.Auth.drop
                )


module.exports = AuthRouter