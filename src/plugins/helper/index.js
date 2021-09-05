import fp from "fastify-plugin";
import { last, get, set, isArray, forEach } from "lodash";

/**
 * flatPick uses the pick function
 * and distinguishes between array and object.
 * @param {object} json Object
 * @param {paths} selected keys
 * @return {object} filtered object
 * */
const pick = (object, paths) => {
	const item = {};

	paths.forEach((path) =>
		set(item, last(path.split(".")), get(object, path))
	);

	return item;
};

export const flatPick = (object, paths) => {
	if (isArray(object)) {
		forEach(object, (item, key) => {
			object[key] = pick(item, paths);
		});
	} else {
		object = pick(object, paths);
	}

	return object;
};

/**
 * Define Server Plugin
 * @param {server} server instance
 * @param {uri, options} server options
 * @param {next} next pass
 * */
const plugin = async (server, { uri, options }, next) => {
	// Get node env
	const { NODE_ENV = "development" } = process.env;
	// Server env
	server.decorate("isDev", NODE_ENV === "development");
	server.decorate("isProd", NODE_ENV === "production");
	server.decorate("isTest", NODE_ENV === "test");
	// Flat pick
	server.decorate("flatPick", flatPick);
	// Check if document is mine with app or server.isMine(doc, user)
	server.decorate("isMine", (doc, { _id }) => doc._id.equals(_id));
	// JWT Authentication helper
	server.decorate("authenticate", async function (request, reply) {
		try {
			await request.jwtVerify();
		} catch (err) {
			reply.send(err);
		}
	});
	next();
};

export default fp(plugin, {
	fastify: "3.x",
	name: "server",
});
