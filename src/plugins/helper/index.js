import fp from "fastify-plugin";
import pick from "./pick";

/**
 * Define Server Plugin
 * @param {server} server instance
 * @param {uri, options} server options
 * @param {next} next pass
 * */
const plugin = async (server, { uri, options }, next) => {
	/**
	 * ENV Decorators
	 * */
	const { NODE_ENV = "development" } = process.env;
	server.decorate("isDev", NODE_ENV === "development");
	server.decorate("isProd", NODE_ENV === "production");
	server.decorate("isTest", NODE_ENV === "test");

	/**
	 * Check if document is mine with app or server.isMine(doc, user)
	 * */
	server.decorateRequest("isMine", (doc, { _id }, statusCode) =>
		statusCode
			? server.assert(
					doc.author._id.equals(_id),
					statusCode,
					"Document not yours"
			  )
			: doc.author._id.equals(_id)
	);

	/**
	 * Flat pick decorator
	 * */
	server.decorate(
		"pick",
		(select) => async (request, reply, payload, done) =>
			pick(payload, select)
	);

	/**
	 * Throw if empty helper
	 * */
	server.decorate(
		"throwIfEmpty",
		(status = 404) =>
			async (request, reply, payload, done) =>
				server.assert(payload, status)
	);

	next();
};

export default fp(plugin, {
	fastify: "3.x",
	name: "server",
});
