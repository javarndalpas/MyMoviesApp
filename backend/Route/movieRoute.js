import express from 'express';
import MovieController from '../Controller/MovieController.js';




const movieRoute = express.Router();

movieRoute.get("/search", MovieController.searchMovies);
movieRoute.post("/add", MovieController.addMovie); 
movieRoute.post("/rating", MovieController.rateMovie)
movieRoute.get("/getall", MovieController.fetchMovies); 
export default movieRoute;