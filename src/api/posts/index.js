import { find, findOne, createOne } from "./controller";
import RBAC from "./rbac";

export default async function (app, opts) {
	// Initialize role based access control
	const acl = RBAC(app);

	app.route({
		url: "/",
		method: ["GET"],
		preValidation: [app.authenticate],
		preHandler: async ({ user: { role } }) =>
			await app.assert(acl.can(role, "post", "find"), 401),
		handler: find(app),
	});

	app.route({
		url: "/",
		method: ["POST"],
		handler: createOne(app),
		schema: {
			body: {
				type: "object",
				description: "Post Object",
				examples: [
					{
						name: "Post Sample",
						summary: "Simple example",
						value: { content: "Good Morning!" },
					},
				],
				properties: {
					content: { type: "string", description: "your post" },
				},
			},
		},
	});

	app.route({
		url: "/:_id",
		method: ["GET"],
		handler: findOne(app),
		preValidation: [app.authenticate],
		preHandler: async ({ user: { role } }) =>
			await app.assert(acl.can(role, "post", "findOne"), 401),
	});
}
