import mongoose from "mongoose";
const Schema = mongoose.Schema;

/**
 * Mongoose Schema
 * */
const MessageSchema = Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: { type: Schema.Types.ObjectId, ref: "User" },
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("Post", MessageSchema);
