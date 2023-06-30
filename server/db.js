const mongoose = require('mongoose')
require('dotenv').config()

module.exports = async () => {
    const db = process.env.DB || 'mydb'
    const username = process.env.DB_USER || 'root'
    const password = process.env.DB_PASS || 'password'
    const dbLocation = process.env.DB_URL || 'localhost:27017'
    

    // Construct the connection URL with credentials
    const connectionURL = process.env.DB_FULL || `mongodb://${username}:${password}@${dbLocation}/${db}`;

    try {
        await mongoose.connect(connectionURL, {
            authSource: "admin",
            user: "root",
            pass: "password",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the DB')
    } catch(error) {
        console.error('There was a error connecting to the ddb', error)
    }
}