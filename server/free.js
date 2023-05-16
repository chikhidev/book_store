import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
const Model = require('./models/Model')


dotenv.config();
connectDB();

const freshDB = async () => {
    try {
        // await Model.Order.deleteMany();
        await Model.Book.deleteMany();
        // await User.deleteMany();

        console.log('Data Imported'.magenta.inverse.bold)
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse.bold);
        process.exit(1);
    }
}


if (process.argv[2] === '-d') {
    freshDB();
} else {
    console.error('you didnt specify to fresh db')
}