import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'movie'
            }
        ]
    }
    ,
    {
        timestamps: true
    }
)


export const User = mongoose.model('users', UserSchema);

