import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

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
