import model from "./model";

export const getAll = async (request, reply) => {
	return await model.find();
};

export const getOne = (app) => async (request, reply) => {
	const id = request.params.id;
	const data = await model.findById({ _id: id });
	// Throw if not found
	app.assert(data, 404);
	return data;
};

export const deleteOne = (app) => async (request, reply) => {
	const id = request.params.id;
	const data = await model.findById({ _id: id });
	// Throw if not found
	app.assert(data, 404);
	await data.delete({ _id: id });
	res.statusCode = 204;
};
