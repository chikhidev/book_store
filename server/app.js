//requires
const {express} = require("./server.imports");
const Controller = require("./controllers/Controller")
const Route = require("./routes/Route")
const connectDB = require("./database");
const cors = require('cors');


// enable all CORS requests
//define server app
const app = express()

//connect to the database:
connectDB()

app.use(cors());

//group routing for user
app.use('/user', Route.UserRouter );

//Server listening
app.listen(4000, ()=>
   console.log("Server started!")
);