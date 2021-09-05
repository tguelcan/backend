import model from "./model";

export const find = (app) => async (request, reply) => {
	return await model.find();
};
