import { find, findOne, createOne, updateOne, deleteOne } from "./controller";
import rbac from "./rbac";

export default async function (app) {
	app.route({
		url: "/",
		method: ["GET"],
		preValidation: [app.authenticate(rbac, "find", "post")],
		handler: find,
	});

	app.route({
		url: "/",
		method: ["POST"],
		preValidation: [app.authenticate(rbac, "createOne", "post")],
		preHandler: [app.addAuthor()],
		handler: createOne,
		preSerialization: [
			app.populate(),
			app.pick(["_id", "content", "author"]),
		],
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
				required: ["content"],
			},
		},
	});

	app.route({
		url: "/:_id",
		method: ["GET"],
		preValidation: [app.authenticate(rbac, "findOne", "post")],
		handler: findOne,
		preSerialization: [
			app.throwIfEmpty(),
			app.populate(),
			app.pick(["_id", "content", "author"]),
		],
	});

	app.route({
		url: "/:_id",
		method: ["PUT"],
		preValidation: [app.authenticate(rbac, "updateOne", "post")],
		handler: updateOne,
		preSerialization: [
			app.populate(),
			app.pick(["_id", "content", "author"]),
		],
	});

	app.route({
		url: "/:_id",
		method: ["DELETE"],
		preValidation: [app.authenticate(rbac, "deleteOne", "post")],
		handler: deleteOne,
	});
}
/*
preSerialization: async (request, reply, payload, done) => {
			await payload.populate({
				path: "author",
				select: "displayName picture",
			});
			// return await app.flatPick(payload, ["_id", "author", "content"]);
			return payload;
		},
*/
