const mongoose = require('mongoose')

module.exports = async () => {
    const username = process.env.DATABASE_USER || 'root'
    const password = process.env.DATABASE_PASSWORD || 'password'
    const databaseName = 'mydb';

    // Construct the connection URL with credentials
    const connectionURL = process.env.DB || `mongodb://${username}:${password}@localhost:27017/${databaseName}`;

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