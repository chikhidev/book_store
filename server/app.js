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
   origin: 'http://localhost:5173',
   optionsSuccessStatus: 200 || 204 // Some legacy browsers (e.g., IE 11) choke on 204
 }));

//use body-parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'images/books' directory
app.use('/images/books', express.static('images/books'));
app.use('/images/users', express.static('images/users'));
app.use('/images/offers', express.static('images/offers'));

//group routing for user
app.use('/auth', Route.AuthRouter );
app.use('/user', Route.UserRouter );
app.use('/book', Route.BookRouter );
app.use('/category', Route.CategoryRouter );
app.use('/order', Route.OrderRouter );
app.use('/images', Route.ImagesRouter );
app.use('/fav', Route.FavouriteRouter );
app.use('/inbox', Route.InboxesRouter );
app.use('/store', Route.StoreRouter );
app.use('/offer', Route.OfferRouter );

//Server listening
app.listen(process.env.PORT, ()=>
   console.log("Server started!")
);