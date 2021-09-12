import model from "./model";

export const findMe = async ({ user }, reply) => await model.findOne(user);
