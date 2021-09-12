import { find, deleteOne } from "./controller";
import rbac from "./rbac";

export default async function (app) {
	app.route({
		url: "/",
		method: ["GET"],
		preValidation: [app.authenticate(rbac, "find", "session")],
		handler: find,
	});

	app.route({
		url: "/",
		method: ["DELETE"],
		handler: deleteOne,
	});
}
