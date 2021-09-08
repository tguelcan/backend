import fp from "fastify-plugin";
import mongoose from "mongoose";
import plugins from "./plugins";

/**
 * Create Mongoose connection
 * @param {uri} mongodb uri
 * @param {options} mongodb options
 * @return promise mongodb connection
 * */
const connect = (uri, options) =>
	new Promise((resolve, reject) => {
		mongoose.connect(uri, options, (error) =>
			error ? reject(error) : resolve(mongoose)
		);
	});

/**
 * Define plugin
 * @param {app} app instance
 * @param {uri, options} mongodb options
 * @param {next} next function
 * */
const plugin = async (app, { uri, options }, next) => {
	// Add mongodb plugins
	const mongooseInstance = await plugins(mongoose);
	// Assign mongoose instance to fastify
	await app.decorate("mongoose", mongooseInstance);
	// Connect if not test env
	if (!app.isTest) {
		await connect(uri, options);
	}

	next();
};

export default fp(plugin, {
	fastify: "3.x",
	name: "DB",
});
