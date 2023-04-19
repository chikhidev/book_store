const {express} = require("../server.imports")
const Controller = require("../controllers/Controller")
const Middleware = require("../middlewares/MiddleWare")
const AuthRouter = express.Router();


AuthRouter.get("/", Controller.Auth)

module.exports = AuthRouter