import model from "./model";

const sessionStatics = (schema) => {
    schema.statics.deleteAllUserSessions = async function (user) {
        await model.deleteMany({ user });
    };

    schema.statics.truncateSessions = async function ({
        author,
        maxSessionCount,
    }) {
        const count = await model.countDocuments({ author });
        if (count > maxSessionCount) {
            const sessions = await model
                .find({ author })
                .sort({ lastActivity: 1 });
            await sessions[0].remove();
        }
    };
};

export default sessionStatics;
