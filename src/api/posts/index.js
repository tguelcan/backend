import { getAll, getOne, createOne } from "./controller";
import RBAC from "./rbac";

export default async function (app, opts) {
	// Initialize role based access control
	const acl = RBAC(app);

	app.route({
		url: "/",
		method: ["GET"],
		preHandler: async (request) =>
			// todo: request.user.role ?
			await app.assert(acl.can("guest", "post", "read"), 401),
		handler: getAll(app),
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
		handler: getOne(app),
	});
}
