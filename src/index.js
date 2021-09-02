import fastify from "fastify";
import autoload from "fastify-autoload";
import plugins from "~/plugins";
import config from "~/config";

/**
 * Define fastify instance
 * */
const app = fastify(config.instance);

/**
 * Backend core function
 * */
const start = async () => {
    try {
        /**
         * Register Plugins
         * */
        await app.register(plugins);

        /**
         * Register Routes
         * */
        await app.register(autoload, config.router);

        /**
         * Start Server and log informations
         * */
        await app.listen(config.server.port);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

// Run server
start();
