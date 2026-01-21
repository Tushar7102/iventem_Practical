const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mydatabase';
        const mongo = await mongoose.connect(mongoUrl);
        if (mongo) {
            console.log('Database Connected Successfully')
        } else {
            console.log('Database Connection Failed')
        }
    } catch (error) {
        console.error('DB connection error:', error)
    }
}

module.exports = connectDb;