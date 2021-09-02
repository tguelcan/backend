import model from "./model";

export const getAll = (app, acl) => async (request, reply) => {
	app.assert(await acl.can("guest", "message", "read"), 401);
	return await model.find();
};

export const getOne =
	(app) =>
	async ({ params: { _id } }, reply) => {
		const data = await model.findById({ _id });
		// Throw if not found
		app.assert(data, 404);
		return data;
	};

export const createOne =
	(app) =>
	async ({ body }, reply) => {
		const data = await new model(body);
		await data.save();
		return data;
	};

export const deleteOne =
	(app) =>
	async ({ params: { _id } }, reply) => {
		const data = await model.findById({ _id });
		// Throw if not found
		app.assert(data, 404);
		await data.delete({ _id: id });
		reply.statusCode = 204;
	};
