import model from "./model";

export const find = async ({ query }, reply) =>
	await model.paginate(
		{
			// Filter here
		},
		{
			...query,
			// select: 'content author',
			populate: [{ path: "author", select: "displayName picture id" }],
		}
	);

export const findOne = async ({ params: { _id } }, reply) => {
	const data = await model.findById({ _id });
	// Return data
	return data;
};

export const createOne = async ({ body }, reply) => {
	// Create object
	const data = await new model(body);
	// Save object
	return await data.save();
};

export const deleteOne = async ({ params: { _id } }, reply) => {
	const data = await model.findById({ _id });
	await data.delete({ _id: id });
	reply.statusCode = 204;
};
