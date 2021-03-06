import model from './model'

export const find = async ({ query }) =>
    model.paginate(
        {},
        {
            ...query,
            // select: 'content author',
            populate: [{ path: 'author', select: 'displayName picture id' }],
        }
    )

export const findOne = async ({ params: { _id } }) => model.findById({ _id })

export const createOne = async ({ body }) => {
    // Create object
    const data = await new model(body)
    // Save object
    return data.save()
}

export const updateOne = async (
    { body, user, isMine, params: { _id } },
    reply
) => {
    const doc = await model.findById({ _id }).throwIfEmpty(reply)
    await isMine(user, doc, 401)
    return Object.assign(doc, body).save()
}

export const deleteOne = async ({ user, isMine, params: { _id } }, reply) => {
    const doc = await model.findById({ _id })
    await isMine(user, doc, 401)
    await doc.deleteOne({ _id: doc._id })
    reply.statusCode = 204
}
