const {router} = require("./requires")
const Controller = require("./controller")

router.get('/', Controller.Pages.index );



module.exports = router;
