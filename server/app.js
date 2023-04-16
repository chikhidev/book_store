const {express, mongoose} = require("./requires");
require('dotenv').config()
//define server app
const app = express()
//import Router
const Router = require('./routes');

const DBURL = `mongodb+srv://chikhidev:${process.env.DB_PASSWORD}@bookstore.wu4pfvh.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect( 
     DBURL ,
    { useNewUrlParser: true, useUnifiedTopology: true }
 )


//use router (routes manager)
app.use('/', Router);

//Server listening
app.listen(4000);