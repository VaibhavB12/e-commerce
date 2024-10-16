const mongoose = require("mongoose");
require('dotenv').config();

module.exports = async () => {
    try {
        const connectionParams = {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        };

        const useDBAuth = process.env.USE_DB_AUTH === "true"; // Ensure it is a boolean comparison

        // Set authentication parameters if using DB auth
        if (useDBAuth) {
            if (!process.env.MONGO_USERNAME || !process.env.MONGO_PASSWORD) {
                throw new Error("MongoDB username or password is not defined in environment variables.");
            }
            connectionParams.user = process.env.MONGO_USERNAME;
            connectionParams.pass = process.env.MONGO_PASSWORD;
        }

        // Ensure connection string is defined
        if (!process.env.MONGO_CONN_STR) {
            throw new Error("MongoDB connection string is not defined in environment variables.");
        }

        await mongoose.connect(process.env.MONGO_CONN_STR, connectionParams);
        console.log("Connected to database.");
    } catch (error) {
        console.error("Could not connect to database:", error.message); // Improved error message
    }
};
