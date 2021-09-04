import fp from "fastify-plugin";
import mongoose from "mongoose";

/**
 * Create Mongoose connection
 * */
const connect = (url, options) =>
	new Promise((resolve, reject) => {
		mongoose.connect(url, options, (error) =>
			error ? reject(error) : resolve(mongoose)
		);
	});

/**
 * Define Database Plugin
 * */
const plugin = async (server, { uri, options }, next) => {
	const instance = await connect(uri, options);

	// Assign mongoose instance to fastify
	server
		.decorate("mongoose", instance)
		.addHook("onClose", () => instance.connection.close());
	next();
};

export default fp(plugin, {
	fastify: "3.x",
	name: "DB",
});
