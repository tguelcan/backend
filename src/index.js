import fastify from "fastify";
import plugins from "~/plugins";
import { instance, server, env } from "~/config";

/**
 * Define fastify instance
 * */
const app = fastify(instance);

/**
 * Backend core function
 * @export for test
 * */
export const serve = async () => {
    try {
        /**
         * Register Plugins
         * */
        await app.register(plugins);

        /**
         * Start Server and log informations
         * */
        app.isTest || (await app.listen(server.port));

        return app;
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

// Run server
if (env !== "test") {
    serve();
}
