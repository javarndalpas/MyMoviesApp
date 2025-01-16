import joi from 'joi';
import jwt from 'jsonwebtoken';


export const signupValidation = (req, res, next) => {
    // console.log("enter")
    const schema = joi.object({
        username: joi.string().min(3).max(100).required(),
        email: joi.string().min(3).max(100).required(),
        password: joi.string().min(4).max(100).required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400)
            .json({ message: "Bad Request:", error })
    }
    next();
}

export const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().min(3).max(100).required(),
        password: joi.string().min(4).max(100).required()
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400)
            .json({ message: "Bad Request:", error })
    }
    next();
}

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};



