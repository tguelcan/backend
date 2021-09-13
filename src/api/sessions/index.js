import { find, deleteOne, deleteAll } from "./controller";

export default async function (app) {
	app.route({
		url: "/",
		method: ["GET"],
		preValidation: [app.authenticate()],
		handler: find,
	});

	app.route({
		url: "/:_id",
		preValidation: [app.authenticate()],
		method: ["DELETE"],
		handler: deleteOne,
	});

	app.route({
		url: "/all",
		preValidation: [app.authenticate()],
		method: ["DELETE"],
		handler: deleteAll,
	});
}
