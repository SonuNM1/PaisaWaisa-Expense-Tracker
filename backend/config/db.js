const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`Database connected: ${conn.connection.host}-${conn.connection.name}`)

    } catch (error) {
        console.log('DB Connection error: ', error)
        process.exit(1)
    }
}

module.exports = connectDB