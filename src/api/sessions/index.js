import { find, deleteOne, deleteAll } from "./controller";
import rbac from "./rbac";

export default async function (app) {
	app.route({
		url: "/",
		method: ["GET"],
		preValidation: [app.authenticate(rbac, "find", "session")],
		handler: find,
	});

	app.route({
		url: "/:_id",
		preValidation: [app.authenticate(rbac, "deleteOne", "session")],
		method: ["DELETE"],
		handler: deleteOne,
	});

	app.route({
		url: "/all",
		preValidation: [app.authenticate(rbac, "deleteAll", "session")],
		method: ["DELETE"],
		handler: deleteAll,
	});
}
