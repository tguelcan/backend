import model from './model'

export const findMe = async ({ user }) => model.findOne(user)
