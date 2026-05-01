const mongoose = require('mongoose');


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI) 
            console.log('Database connection successful')


    } catch (error) {
        console.error('database connection error:', error);

    }
}

module.exports = connectDB;