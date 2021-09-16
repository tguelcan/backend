import mongoose from 'mongoose'
const Schema = mongoose.Schema

/**
 * Mongoose Schema
 * DOC: https://mongoosejs.com/docs/guide.html
 * */
const postSchema = Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        versionKey: false,
    }
)

export default mongoose.model('Post', postSchema)
