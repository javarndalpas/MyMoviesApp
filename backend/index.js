import express from "express";
import './Model/db.js'
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./Route/userRoute.js";
dotenv.config();
import cors from 'cors';
import movieRoute from "./Route/movieRoute.js";
const app = express();
app.use(bodyParser.json())
app.use(express.json());

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

const PORT = process.env.PORT || 8000;
app.use('/api',route)
app.use("/movies",movieRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

