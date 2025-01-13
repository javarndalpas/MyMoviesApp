import express from 'express';
import MovieController from '../Controller/MovieController.js';



const movieRoute = express.Router();

movieRoute.post("/", MovieController.addMovie); 
export default movieRoute;