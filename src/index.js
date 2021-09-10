import fastify from "fastify";
import plugins from "~/plugins";
import { instance, server, env } from "~/config";

/**
 * Define fastify instance
 * load settings (instance) from config
 * */
const app = fastify(instance);

/**
 * Backend core function
 * Self executing function
 * */
(async () => {
    try {
        /**
         * Register Plugins
         * */
        await app.register(plugins);

        /**
         * Start Server and log informations
         * (if not in test env)
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
