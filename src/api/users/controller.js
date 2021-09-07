import model from "./model";

export const find = async (request, reply) => await model.find();
