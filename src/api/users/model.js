import mongoose from 'mongoose'

/**
 * Mongoose Schema
 * DOC: https://mongoosejs.com/docs/guide.html
 * */
const Schema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        services: {
            google: {
                type: String,
            },
            microsoft: {
                type: String,
            },
        },
        picture: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            default: 'user',
        },
    },
    {
        versionKey: false,
    }
)

/**
 * Mongoose Statics
 * DOC: https://mongoosejs.com/docs/guide.html#statics
 *  // user.username = displayName
 *  // user.picture = picture
 *  // user.verified = true
 * */
Schema.statics.createFromService = async function ({
    service,
    id,
    email,
    displayName,
    picture,
}) {
    const user = await this.findOne({
        $or: [{ [`services.${service}`]: id }, { email }],
    })
    if (user) {
        user.services[service] = id
        return user.save()
    }

    return this.create({
        services: { [service]: id },
        email,
        displayName,
        picture,
    })
}

export default mongoose.model('User', Schema)
