// Auth Plugin
import fs from "fs";
import path from "path";
import fp from "fastify-plugin";
import jwt from "jsonwebtoken";
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
	// Route
	server.route({
		url: `${prefix}/auth/:provider`,
		method: ["GET"],
		handler: async (
			{ query: { accessToken }, params: { provider } },
			reply
		) => {
			try {
				const data = await auth[provider](accessToken);
				const token = await jwt.sign(
					{ id: data.id, role: "guest" },
					"shhhhh"
				);
				return {
					token,
					data,
				};
			} catch (error) {
				reply.unauthorized(error.message);
			}
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
