// Auth Plugin
import fs from "fs";
import path from "path";
import fp from "fastify-plugin";
import fastifyJwt from "fastify-jwt";
import auth from "./provider";
import User from "~/api/users/model";
import rbac from "./rbac";

import { router, jwt } from "~/config";

/**
 * Get router prefix
 * */
const {
	options: { prefix },
} = router;

/**
 * Define Auth Plugin
 * @param {app} app instance
 * @param {options} options of app instance
 * @param {next} pass next function
 * */
const plugin = async (app, options, next) => {
	app.register(rbac);
	app.register(fastifyJwt, { secret: jwt.secret, ...jwt.options });
	// Route
	app.route({
		url: `${prefix}/auth/:provider`,
		method: ["GET"],
		handler: async (
			{ query: { accessToken }, params: { provider } },
			reply
		) => {
			try {
				const providerUser = await auth[provider](accessToken);
				const { _id, role } = await User.createFromService(
					providerUser
				);
				const token = await app.jwt.sign({ _id, role });
				return {
					token,
					data: providerUser,
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
