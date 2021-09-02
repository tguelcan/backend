import fastifyRateLimit from "fastify-rate-limit";
import fastifyPlugin from "fastify-plugin";
import fastifyOas from "fastify-oas";
import fastifySensible from "fastify-sensible";
import fastifyFormbody from "fastify-formbody";
import database from "~/plugins/database";
import helper from "~/plugins/helper";
import rbac from "~/plugins/rbac";
import config from "~/config";

/**
 * Define database plugin
 * */
const plugin = async (app, options, next) => {
	/**
	 * Server helper plugins
	 * */
	await app.register(helper);
	/**
	 * Mongoose connection
	 * */
	await app.register(database, config.database);

	/**
	 * RBAC Plugin
	 * DOC: https://github.com/SkeLLLa/fast-rbac#docs
	 * */
	await app.register(rbac);

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
	await app.register(fastifyRateLimit, config.rateLimiter);

	/**
	 * Swagger documentation
	 * DOC: https://github.com/SkeLLLa/fastify-oas
	 * */
	await app.register(fastifyOas, config.documentation);

	/**
	 * Instance Ready
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
