const {router} = require("./requires")
const Controller = require("./controller")

router.get('/', Controller.Pages.index );
router.get('/user', Controller.User.view );



module.exports = router;
