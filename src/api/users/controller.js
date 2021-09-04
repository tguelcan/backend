import model from "./model";

export const getAll = (app) => async (request, reply) => {
	return await model.find();
};
