import model from "./model";

export const find =
	(app) =>
	async ({ query }, reply) =>
		await model.paginate(
			{
				// Filter here
			},
			{
				...query,
				// select: 'content author',
				// populate: [{ path: 'author', select: 'username picture id' }]
			}
		);

export const findOne =
	(app) =>
	async ({ params: { _id } }, reply) => {
		const data = await model.findById({ _id });
		// Throw if not found
		app.assert(data, 404);
		// Return data
		return app.flatPick(data, ["_id", "content"]);
	};

export const createOne =
	(app) =>
	async ({ body }, reply) => {
		// Create object
		const data = await new model(body);
		// Save object
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
