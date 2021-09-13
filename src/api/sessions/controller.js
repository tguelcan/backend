import model from "./model";

export const find = async ({ query, user, can }, reply) =>
	await model.paginate(
		{ author: user._id },
		{
			...query,
			populate: [{ path: "author", select: "displayName picture id" }],
		}
	);

export const deleteOne = async (
	{ body, user, isMine, params: { _id } },
	reply
) => {
	const doc = await model.findById({ _id });
	await isMine(user, doc, 401);
	await doc.deleteOne({ jwtid: doc.jwtid });
	reply.statusCode = 204;
};

export const deleteAll = async (
	{ body, user, isMine, params: { _id } },
	reply
) => {
	await model.deleteMany({ author: user._id });
	reply.statusCode = 204;
};
