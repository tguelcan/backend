import fp from "fastify-plugin";

/**
 * Define Server Plugin
 * */
const plugin = async (server, { uri, options }, next) => {
	// Get node env
	const { NODE_ENV = "development" } = process.env;
	// Server Helper
	server.decorate("isDev", NODE_ENV === "development");
	server.decorate("isProd", NODE_ENV === "production");
	server.decorate("isTest", NODE_ENV === "test");
	next();
};

export default fp(plugin, {
	fastify: "3.x",
	name: "server",
});
