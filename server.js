import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";  
// Configuration of env
dotenv.config();
// Connect to database
connectDB();
// Rest object
const app = express();
// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
// Routes
app.use('/api/v1/auth', authRoutes);

// Rest API
app.get('/', (req, res) => {
  res.send('<h1>Welcome to PranGalaxy Website</h1>');
});

const port = process.env.PORT || 5000;  
// server Run
app.listen(port, () =>
  console.log(`Server running on ${process.env.msg} port ${port}`.bgCyan.white)
);
