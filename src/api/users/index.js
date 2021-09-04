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
			await app.assert(acl.can("guest", "user", "read"), 401),
		handler: getAll(app),
	});
}
