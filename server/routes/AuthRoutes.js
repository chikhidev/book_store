const {express} = require("../server.imports")
const Controller = require("../controllers/Controller")
const Middleware = {
    validate : require("../middlewares/Validation"),
    auth : require('../middlewares/Auth')
};
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

AuthRouter.post(
                "/change_password",
                Middleware.auth.authenticateToken,
                Middleware.validate.updatePassword,
                Controller.Auth.updatePassword
                )

AuthRouter.post(
                "/logout",
                Middleware.auth.authenticateToken,
                Controller.Auth.logout
                );

//drop user route
AuthRouter.delete(
                "/drop",
                Middleware.validate.validateEmailPass,
                Middleware.auth.authenticateToken,
                Controller.Auth.drop
                )




module.exports = AuthRouter