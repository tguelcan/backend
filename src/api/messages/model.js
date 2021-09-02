import mongoose from "mongoose";

/**
 * Mongoose Schema
 * */
const messageSchema = new mongoose.Schema(
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

export default mongoose.model("Message", messageSchema);
