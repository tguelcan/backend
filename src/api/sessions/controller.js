import model from "./model";

export const find = async ({ query, user }, reply) =>
	await model.paginate(
		{ author: user._id },
		{
			...query,
			populate: [{ path: "author", select: "displayName picture id" }],
		}
	);

export const deleteOne = async ({ params: { _id } }, reply) => "Delete one";
