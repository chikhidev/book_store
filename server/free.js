const mongoose =  require('mongoose')
const dotenv =  require('dotenv')
const Model = require('./models/Model')
const connectDB = require("./database");


dotenv.config();


const freshDB = async (x) => {
    try {
        await connectDB();
        // await Model.Order.deleteMany();
        await x.deleteMany();
        // await User.deleteMany();

        console.log('Data droped')
        process.exit();

    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}


if (process.argv[2] === '-d') {

    switch(process.argv[3])
    {
        case 'users':
            freshDB(Model.userModel);
        case 'books':
            freshDB(Model.bookModel);
        case 'orders':
            freshDB(Model.orderModel);
        case 'categories':
            freshDB(Model.categoryModel);
        default:
            console.log('Please specify collection')


    }

    
} else {
    console.error('you didnt specify to fresh db')
}