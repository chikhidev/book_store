const {express} = require("./requires");
//define server app
const app = express()
//import Router
const Router = require('./routes');

//use router (routes manager)
app.use('/', Router);

//Server listening
app.listen(4000);