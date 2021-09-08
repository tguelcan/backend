import fastify from "fastify";
import plugins from "~/plugins";
import { instance, server, env } from "~/config";

/**
 * Define fastify instance
 * */
const app = fastify(instance);

/**
 * Backend core function
 * */
(async () => {
    try {
        /**
         * Register Plugins
         * */
        await app.register(plugins);

        /**
         * Start Server and log informations
         * */
        app.isTest || (await app.listen(server.port));
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
})();

/**
 * @export for test
 * */
export default app;
