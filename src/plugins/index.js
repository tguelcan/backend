import fastifyRateLimit from "fastify-rate-limit";
import fastifyPlugin from "fastify-plugin";
import fastifyOas from "fastify-oas";
import fastifySensible from "fastify-sensible";
import fastifyFormbody from "fastify-formbody";
import fastifyAutoload from "fastify-autoload";
import fastifyHelmet from "fastify-helmet";
import fastifyGuard from "fastify-guard";
import db from "~/plugins/database";
import helper from "~/plugins/helper";
import auth from "~/plugins/auth";
import qnamaker from "~/plugins/qnamaker";
import { database, rateLimiter, documentation, router } from "~/config";

/**
 * Define database plugin
 * @param {app} app instance
 * @param {options} app options
 * @param {next} next pass
 * */
const plugin = async (app, options, next) => {
    /**
     * App helper plugins
     * */
    await app.register(helper);

    /**
     * Helmet security plugin
     * DOC: https://github.com/fastify/fastify-helmet
     * */
    await app.register(fastifyHelmet);

    /**
     * Mongoose connection
     * */
    await app.register(db, database);

    /**
     * Auth Plugin
     * */
    await app.register(auth);

    /**
     * Guard Plugin
     * https://github.com/hsynlms/fastify-guard
     * */
    await app.register(fastifyGuard, {
        errorHandler: (result, req, reply) => {
            return reply.send("you are not allowed to call this route");
        },
    });

    /**
     * Exception handler
     * DOC: https://github.com/fastify/fastify-sensible
     * */
    await app.register(fastifySensible);

    /**
     * Accept content type parser for body
     * DOC: https://github.com/fastify/fastify-formbody
     * */
    await app.register(fastifyFormbody);

    /**
     * Rate limiter
     * DOC: https://github.com/fastify/fastify-rate-limit
     * */
    await app.register(fastifyRateLimit, rateLimiter);

    /**
     * qnamaker
     * DOC: https://github.com/fastify/fastify-autoload
     * */
    await app.register(qnamaker);

    /**
     * Swagger documentation
     * DOC: https://github.com/SkeLLLa/fastify-oas
     * */
    await app.register(fastifyOas, documentation);

    /**
     * Register Routes
     * DOC: https://github.com/fastify/fastify-autoload
     * */
    await app.register(fastifyAutoload, router);

    /**
     * Instance Ready
     * @param {done} hook function
     * */
    app.addHook("onReady", (done) => {
        // Print routes in development
        app.isDev && console.log(app.printRoutes());
        const err = null;
        done(err);
    });

    // Pass after load plugins
    next();
};

export default fastifyPlugin(plugin, {
    fastify: "3.x",
    name: "loader",
});
