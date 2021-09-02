import path from "path";
import fastify from "fastify";
import autoload from "fastify-autoload";
import plugins from "~/plugins";
import config from "~/config";

/**
 * Get Config
 * */
const { server, instance } = config;

/**
 * Define fastify instance
 * */
const app = fastify(instance);

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
        await app.register(autoload, {
            dir: path.join(__dirname, "api"),
            options: { prefix: "/api" },
        });

        /**
         * Start Server and log informations
         * */
        await app.listen(server.port);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

// Run server
start();
