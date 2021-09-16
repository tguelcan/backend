import fp from "fastify-plugin";
import pick from "./flatPick";

/**
 * Define Server Plugin
 * @param {server} server instance
 * @param {uri, options} server options
 * @param {next} next pass
 * */
const plugin = async (server, _, next) => {
    /**
     * ENV Decorators
     * */
    const { NODE_ENV = "development" } = process.env;
    server.decorate("isDev", NODE_ENV === "development");
    server.decorate("isProd", NODE_ENV === "production");
    server.decorate("isTest", NODE_ENV === "test");

    /**
     * Flat pick decorator
     * */
    server.decorate(
        "pick",
        (select) => async (request, reply, payload) => pick(payload, select)
    );

    /**
     * Throw if empty helper
     * */
    server.decorate(
        "throwIfEmpty",
        (status = 404) =>
            async (request, reply, payload) =>
                server.assert(payload, status)
    );

    next();
};

export default fp(plugin, {
    fastify: "3.x",
    name: "server",
});
