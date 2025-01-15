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
        watchlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'movies'
            }
        ]
    }
    ,
    {
        timestamps: true
    }
)


export const User = mongoose.model('users', UserSchema);

