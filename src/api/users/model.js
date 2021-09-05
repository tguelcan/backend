import mongoose from "mongoose";

/**
 * Mongoose Schema
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
        service: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

Schema.statics.createFromService = async function ({
    service,
    id,
    email,
    displayName,
    picture,
    lang,
}) {
    const user = await this.findOne({
        $or: [{ [`services.${service}`]: id }, { email }],
    });

    if (user) {
        user.services[service] = id;
        // user.username = displayName
        // user.picture = picture
        // user.verified = true
        return user.save();
    }

    return await this.create({
        services: { [service]: id },
        email,
        displayName,
        picture,
    });
};

export default mongoose.model("User", Schema);
