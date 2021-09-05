import fastifyRateLimit from "fastify-rate-limit";
import fastifyPlugin from "fastify-plugin";
import fastifyOas from "fastify-oas";
import fastifySensible from "fastify-sensible";
import fastifyFormbody from "fastify-formbody";
import fastifyHelmet from "fastify-helmet";
import database from "~/plugins/database";
import helper from "~/plugins/helper";
import rbac from "~/plugins/rbac";
import auth from "~/plugins/auth";
import config from "~/config";

/**
 * Define database plugin
 * */
const plugin = async (server, options, next) => {
	/**
	 * Server helper plugins
	 * */
	await server.register(helper);

	/**
	 * Helmet security plugin
	 * DOC: https://github.com/fastify/fastify-helmet
	 * */
	await server.register(fastifyHelmet);
	/**
	 * Mongoose connection
	 * */
	await server.register(database, config.database);

	/**
	 * RBAC Plugin
	 * DOC: https://github.com/SkeLLLa/fast-rbac#docs
	 * */
	await server.register(rbac);

	/**
	 * Auth Plugin
	 * */
	await server.register(auth);

	/**
	 * Exception handler
	 * DOC: https://github.com/fastify/fastify-sensible
	 * */
	await server.register(fastifySensible);

	/**
	 * Accept content type parser for body
	 * DOC: https://github.com/fastify/fastify-formbody
	 * */
	await server.register(fastifyFormbody);

	/**
	 * Rate limiter
	 * DOC: https://github.com/fastify/fastify-rate-limit
	 * */
	await server.register(fastifyRateLimit, config.rateLimiter);

	/**
	 * Swagger documentation
	 * DOC: https://github.com/SkeLLLa/fastify-oas
	 * */
	await server.register(fastifyOas, config.documentation);

	/**
	 * Instance Ready
	 * */
	server.addHook("onReady", (done) => {
		// Print routes in development
		server.isDev && console.log(server.printRoutes());
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
