import mongoose from 'mongoose'
import { jwt } from '~/config'

const Schema = mongoose.Schema

/**
 * Session Schema
 * DOC: https://mongoosejs.com/docs/guide.html
 * */
const sessionSchema = Schema(
    {
        jwtid: {
            type: String,
            required: true,
        },
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, expires: jwt.sign.expiresIn },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

/**
 * Model Statics
 * */
sessionSchema.plugin((schema) => {
    /**
	 * Delete all users
	 * */
    schema.statics.deleteAllUserSessions = async function (user) {
        await this.deleteMany({ user })
    }

    /**
	 * Create session and count max sessions of user
	 * */
    schema.statics.createAndtruncateSessions = async function ({
        jwtid,
        author,
        maxSessionCount,
    }) {
        /**
		 * Create session and store it
		 * */
        await this.create({
            jwtid,
            author,
        })
        const count = await this.countDocuments({ author })
        if (count > maxSessionCount) {
            const sessions = await this.find({ author }).sort({
                lastActivity: 1,
            })
            await sessions[0].remove()
        }
    }
})

export default mongoose.model('Session', sessionSchema)
