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
   origin: process.env.CLIENT
 }));

//use body-parser
app.use(bodyParser.json());

//group routing for user
app.use('/user', Route.UserRouter );
app.use('/auth', Route.AuthRouter );
app.use('/book', Route.BookRouter );


//Server listening
app.listen(4000, ()=>
   console.log("Server started!")
);