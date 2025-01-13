import { User } from "../Model/User.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Signup = async (req, res) => {
    try {
        // console.log(req.body,"enter")
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
            usernmae: user.username
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

const UserController = {
    Signup,
    Login,
};

export default UserController;
