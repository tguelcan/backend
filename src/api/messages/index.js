import { getAll, getOne, createOne } from "./controller";

export default async function (app, opts) {
	app.route({
		url: "/",
		method: ["GET"],
		/*
		schema: {
			body: {
				type: "object",
				description: "an object",
				examples: [
					{
						name: "Object Sample",
						summary: "an example",
						value: { a: "payload" },
					},
				],
				properties: {
					a: { type: "string", description: "your payload" },
				},
			},
		},
		*/
		handler: getAll(app),
	});

	app.route({
		url: "/",
		method: ["POST"],
		handler: createOne(app),
		schema: {
			body: {
				type: "object",
				description: "Message Object",
				examples: [
					{
						name: "Message Sample",
						summary: "Simple example",
						value: { content: "Good Morning!" },
					},
				],
				properties: {
					content: { type: "string", description: "your message" },
				},
			},
		},
	});

	app.route({
		url: "/:_id",
		method: ["GET"],
		handler: getOne(app),
	});

	app.route({
		url: "/test",
		method: ["GET"],
		handler: (request, reply) => {
			const test = "test";

			app.assert(test, 404);

			return "hello";
		},
	});
}
