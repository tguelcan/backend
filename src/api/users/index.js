import { findMe } from "./controller";
import rbac from "./rbac";

export default async function (app, opts) {
	app.route({
		url: "/me",
		method: ["GET"],
		preValidation: [app.authenticate(rbac, "findMe", "user")],
		preSerialization: [app.pick(["displayName", "email", "picture"])],
		handler: findMe,
	});
}
