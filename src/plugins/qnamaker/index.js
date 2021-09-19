import fp from "fastify-plugin";
import got from "got";

import { router, qna } from "~/config";

/**
 * Get router prefix
 * */
const {
    options: { prefix },
} = router;

/**
 * Define QnA Maker Plugin
 * @param {server} server instance
 * @param {uri, options} server options
 * @param {next} next pass
 * */
const plugin = async (app, _, next) => {
    // QNA Maker

    app.route({
        url: `${prefix}/qna`,
        method: ["POST"],
        handler: async ({ body }, reply) => {
            try {
                const { answers } = await got
                    .post(
                        `https://${qna.endpoint}.azurewebsites.net/qnamaker/knowledgebases/${qna.kbId}/generateAnswer`,
                        {
                            headers: {
                                Authorization: `EndpointKey ${qna.endpointKey}`,
                            },
                            json: body,
                        }
                    )
                    .json();

                return answers;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        schema: {},
    });

    next();
};

export default fp(plugin, {
    fastify: "3.x",
    name: "qnamaker",
});
