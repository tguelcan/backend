import mongoose from "mongoose";

/**
 * Mongoose Schema
 * */
const Schema = new mongoose.Schema(
    {
        service: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("User", Schema);
