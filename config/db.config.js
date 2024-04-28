import mongoose from 'mongoose';

let isConnected = false;

const initializeDatabase = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('Already connected to the database');
        return;
    }

    try {
        const options = {
     
        };

        const connection = await mongoose.connect(process.env.MONGO_DB_URI, options);

        isConnected = true;

        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);
        process.exit(1);
    }
};

export default initializeDatabase;
