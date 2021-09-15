import model from "./model";

export const find = async ({ query, can, user }, reply) =>
	model.paginate(
		{},
		{
			...query,
			// select: 'content author',
			populate: [{ path: "author", select: "displayName picture id" }],
		}
	);

export const findOne = async ({ params: { _id } }, reply, done) =>
	await model.findById({ _id });

export const createOne = async ({ body }, reply) => {
	// Create object
	const data = await new model(body);
	// Save object
	return await data.save();
};

export const updateOne = async (
	{ body, user, isMine, params: { _id } },
	reply
) => {
	const doc = await model.findById({ _id }).throwIfEmpty(reply);
	await isMine(user, doc, 401);
	return await Object.assign(doc, body).save();
};

export const deleteOne = async (
	{ body, user, isMine, params: { _id } },
	reply
) => {
	const doc = await model.findById({ _id });
	await isMine(user, doc, 401);
	await doc.deleteOne({ _id: doc._id });
	reply.statusCode = 204;
};
