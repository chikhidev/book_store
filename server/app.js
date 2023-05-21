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
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'images/books' directory
app.use('/images/books', express.static('images/books'));

//group routing for user
app.use('/auth', Route.AuthRouter );
app.use('/user', Route.UserRouter );
app.use('/book', Route.BookRouter );
app.use('/category', Route.CategoryRouter );
app.use('/order', Route.OrderRouter );
app.use('/images', Route.ImagesRouter );

//Server listening
app.listen(process.env.PORT, ()=>
   console.log("Server started!")
);