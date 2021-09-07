import { find } from "./controller";
import rbac from "./rbac";

export default async function (app, opts) {
	app.route({
		url: "/",
		method: ["GET"],
		preValidation: [app.authenticate(rbac, "find", "user")],
		handler: find,
	});
}
