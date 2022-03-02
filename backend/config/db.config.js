import mongoose from "mongoose"

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export default connectDb