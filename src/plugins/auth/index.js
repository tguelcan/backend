// Auth Plugin
import fs from "fs";
import path from "path";
import fp from "fastify-plugin";
import session from "fastify-secure-session";
import auth from "./provider";

import config from "~/config";

/**
 * Get router prefix
 * */
const {
	router: {
		options: { prefix },
	},
} = config;

/**
 * Define Auth Plugin
 * */
const plugin = async (server, options, next) => {
	server.register(session, {
		key: fs.readFileSync(path.join(__dirname, "secret-key")),
	});
	// Route

	server.route({
		url: `${prefix}/auth/:provider`,
		method: ["GET"],
		handler: async ({ query: { accessToken }, params: { provider } }) => {
			console.log(provider);
			const data = await auth[provider](accessToken);

			console.log(data);

			return data;
		},
		schema: {
			query: {
				type: "object",
				properties: {
					accessToken: {
						type: "string",
					},
				},
				required: ["accessToken"],
			},
			params: {
				type: "object",
				properties: {
					provider: {
						type: "string",
						enum: ["microsoft", "google"],
					},
				},
				required: ["provider"],
			},
		},
	});

	// Pass next
	next();
};

export default fp(plugin, {
	fastify: "3.x",
	name: "auth",
});
