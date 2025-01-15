import express from 'express';
import { loginValidation, signupValidation } from '../Middleware/AuthValidation.js'; 
import UserController from '../Controller/UserController.js'; 

const route = express.Router();

route.post("/signup", signupValidation, UserController.Signup); 
route.post("/login", loginValidation, UserController.Login);
route.post("/users/:id/watchlist",UserController.addToWatchlist)

export default route;
