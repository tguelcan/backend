import fp from "fastify-plugin";

/**
 * Define Server Plugin
 * */
const plugin = async (fastify, { uri, options }, next) => {
	// Get node env
	const { NODE_ENV = "development" } = process.env;
	// Server Helper
	fastify.decorate("isDev", NODE_ENV === "development");
	fastify.decorate("isProd", NODE_ENV === "production");
	fastify.decorate("isTest", NODE_ENV === "test");
	next();
};

export default fp(plugin, {
	fastify: "3.x",
	name: "server",
});
