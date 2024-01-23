import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";  
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(express.static(path.join(__dirname,'./prangalaxy/build')));
// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);
app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'./prangalaxy/build/index.html'));
});
app.get('/', (req, res) => {
  res.send('<h1>Welcome to PranGalaxy Website</h1>');
});

const port = process.env.port || 5000;  
// server Run
app.listen(port, () =>
  console.log(`Server running on ${process.env.msg} port ${port}`.bgCyan.white)
);
