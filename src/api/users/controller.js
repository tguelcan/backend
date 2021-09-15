import model from "./model";

export const findMe = async ({ user }, reply) => model.findOne(user);
