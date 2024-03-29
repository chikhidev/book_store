const {express} = require("../server.imports")
const Controller = require("../controllers/Controller")
const Middleware = require('../middlewares/MiddleWare')
const AuthRouter = express.Router();


const InboxRouter = express.Router();

//get an inbox
InboxRouter.get(
    '/',
    Middleware.auth.authenticateToken,
    Controller.Inbox.getInbox
    )

// get message:     
InboxRouter.get(
    '/message/:id',
    Middleware.auth.authenticateToken,
    Controller.Inbox.getInboxMessage
)
// toggle read message: 
InboxRouter.put(
    '/message/:id',
    Middleware.auth.authenticateToken,
    Controller.Inbox.toggleMessageRead
)



module.exports = InboxRouter