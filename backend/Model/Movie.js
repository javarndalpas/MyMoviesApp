import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 10
        },
        image:
        {
            type: String,
            required: false
        },
        addedBy:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
    ,
    {
        timestamps: true
    }
)


export const Movie = mongoose.model('movies', MovieSchema);

