import { configDotenv } from "dotenv";
configDotenv();
import express from 'express'
import cors from 'cors'
import cor_options from "./config/cors.js";
import postRoutes from './routes/postRoutes.js'
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import  cookieParser from 'cookie-parser';

const port = process.env.PORT || 8080;

const app=express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(cor_options));



app.use('/api/posts', postRoutes);
app.use('/api/auth',authRoutes)
app.use('/api/events',eventRoutes);

connectDB().then(()=>{
app.listen(port,()=>{console.log("Servers up")});
}).catch((e)=>console.log(e))

