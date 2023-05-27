const {router} = require("./requires")
const Controller = require("./controller")
const Route = require("./routes/Route")

router.get('/', Controller.Pages.index );

//route grouping of user
router.use('/user', Route.UserRouter );

module.exports = router;