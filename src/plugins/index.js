import fastifyRateLimit from "fastify-rate-limit";
import fastifyPlugin from "fastify-plugin";
import fastifyOas from "fastify-oas";
import fastifySensible from "fastify-sensible";
import fastifyFormbody from "fastify-formbody";
import fastifyAutoload from "fastify-autoload";
import fastifyHelmet from "fastify-helmet";
import db from "~/plugins/database";
import helper from "~/plugins/helper";
import rbac from "~/plugins/rbac";
import auth from "~/plugins/auth";
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
	 * RBAC Plugin
	 * DOC: https://github.com/SkeLLLa/fast-rbac#docs
	 * */
	await app.register(rbac);

	/**
	 * Auth Plugin
	 * */
	await app.register(auth);

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
