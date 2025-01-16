import { User } from "../Model/User.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Movie } from "../Model/Movie.js";

const Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password);
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false })
        }
        const newUser = new User({ username, email, password })
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(201).json({
            message: "Signup successfully",
            success: true
        })
    } catch (err) {
        console.log("Error:", err)
        res.status(500)
            .json({
                message: "Internal Server Error",
                success: false
            })
    }
}
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ email });
        const errmsg = "Login failed Email or Password is wrong";
        if (!user) {
            return res.status(403)
                .json({ message: errmsg, success: false })
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual) {
            return res.status(403)
                .json({ message: errmsg, success: false })
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200).json({
            message: "Login successfully",
            success: true,
            jwtToken,
            email,
            username: user.username
        })
    } catch (err) {
        console.log("Error:", err)
        res.status(500)
            .json({
                message: "Internal Server Error",
                success: false
            })
    }
}

const addToWatchlist = async (req, res) => {
    try {
        const { id } = req.params;
        const { movieId } = req.body;

        if (!movieId) {
            return res.status(400).json({
                message: "Movie ID is required.",
                success: false,
            });
        }
        const movieExists = await Movie.findById(movieId);
        if (!movieExists) {
            return res.status(404).json({
                message: "Movie not found.",
                success: false,
            });
        }
        const user = await User.findByIdAndUpdate(
            id,
            { $addToSet: { watchlist: movieId } },
            { new: true }
        ).populate('watchlist');

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Movie added to watchlist successfully.",
            success: true,
            watchlist: user.watchlist,
        });
    } catch (error) {
        console.error("Error adding movie to watchlist:", error);
        res.status(500).json({
            message: "Server error while adding to watchlist.",
            success: false,
            error: error.message,
        });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user and populate the watchlist
        const user = await User.findById(userId).populate('watchlist');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Wishlist fetched successfully",
            watchlist: user.watchlist,
        });
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const UserController = {
    Signup,
    Login,
    addToWatchlist,
    getWishlist

};

export default UserController;
