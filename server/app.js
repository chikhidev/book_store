//requires
const {express, bodyParser, cors} = require("./server.imports");
require("dotenv").config()
const Route = require("./routes/Route")
const connectDB = require("./database");

//define server app
const app = express()
//connect to the database:
connectDB()

//allow app use only client url
app.use(cors({
   origin: 'http://localhost:5173'
 }));

//use body-parser
app.use(bodyParser.json());

//group routing for user
app.use('/user', Route.UserRouter );
app.use('/auth', Route.AuthRouter );


//Server listening
app.listen(4000, ()=>
   console.log("Server started!")
);