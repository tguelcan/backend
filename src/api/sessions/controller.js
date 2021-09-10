import model from "./model";

export const find = async ({ query, user }, reply) =>
	await model.find({ author: user._id });
export const deleteOne = async ({ params: { _id } }, reply) => "Delete one";
