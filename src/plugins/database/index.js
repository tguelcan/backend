import fp from "fastify-plugin";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { pagination } from "~/config";

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
		mongoosePaginate.paginate.options = pagination;
		mongoose.plugin(mongoosePaginate);
	});

/**
 * Define plugin
 * @param {app} app instance
 * @param {uri, options} mongodb options
 * @param {next} next function
 * */
const plugin = async (app, { uri, options }, next) => {
	const instance = await connect(uri, options);

	// Assign mongoose instance to fastify
	app.decorate("mongoose", instance).addHook("onClose", () =>
		instance.connection.close()
	);
	next();
};

export default fp(plugin, {
	fastify: "3.x",
	name: "DB",
});
