import fastifyRateLimit from "fastify-rate-limit";
import fastifyPlugin from "fastify-plugin";
import fastifyOas from "fastify-oas";
import fastifySensible from "fastify-sensible";
import fastifyFormbody from "fastify-formbody";
import mongoose from "./db";
import config from "~/config";

/**
 * Get config values
 * */
const { database, rateLimiter, documentation, server } = config;

/**
 * Define database plugin
 * */
const plugin = async (app, options, next) => {
	/**
	 * Mongoose connection
	 * */
	await app.register(mongoose, database);

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
	 * Instance Ready
	 * */
	app.addHook("onReady", (done) => {
		console.log(app.printRoutes());
		console.log(`Listening at http://localhost:${server.port}`);
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
