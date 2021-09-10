import { find, deleteOne } from "./controller";
import rbac from "./rbac";

export default async function (app, opts) {
	app.route({
		url: "/",
		method: ["GET"],
		preValidation: [app.authenticate(rbac, "find", "session")],
		preSerialization: [app.pick(["_id", "jwtid"])],
		handler: find,
	});

	app.route({
		url: "/",
		method: ["DELETE"],
		handler: deleteOne,
	});
}
