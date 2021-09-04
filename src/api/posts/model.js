import mongoose from "mongoose";

/**
 * Mongoose Schema
 * */
const Schema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("Post", Schema);
