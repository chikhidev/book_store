//requires
const {express} = require("./server.imports");
const Controller = require("./controllers/Controller")
const Route = require("./routes/Route")
const connectDB = require("./database");

//define server app
const app = express()

//connect to the database:
connectDB()

//use router (routes manager)
app.get('/', Controller.Pages.index );
   //group routing for user
app.use('/user', Route.UserRouter );


//Server listening
app.listen(4000, ()=>
   console.log("Server started!")
);