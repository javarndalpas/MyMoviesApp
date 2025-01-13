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

const PORT = process.env.PORT || 8000;
app.use('/api',route)
app.use("/addmovie",movieRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

