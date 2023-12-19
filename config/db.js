import mongoose from 'mongoose';
import colors from 'colors';
const  connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
           
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
         
    } 
}
export default connectDB;