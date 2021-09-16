import fp from 'fastify-plugin'
import sessionModel from '~/api/sessions/model'
/**
 * Define Server Plugin
 * @param {server} server instance
 * @param {uri, options} server options
 * @param {next} next pass
 * */
const plugin = async (server) => {
    /**
     * Check if user has the right role
     * */
    server.decorateRequest('can', ({ role }, roles, statusCode = 401) =>
        server.assert(
            roles.includes(role),
            statusCode,
            'You do not have the permission'
        )
    )

    /**
     * JWT Authentication helper
     * */
    server.decorate(
        'authenticate',
        (roles = ['user'], withSession = true) =>
            async (request, reply) => {
                try {
                    const { jwtid, role } = await request.jwtVerify()
                    /**
                     * Check if active session exist
                     * */
                    withSession &&
                        server.assert(
                            await sessionModel.exists({ jwtid }),
                            401,
                            'No session found'
                        )

                    /**
                     * Check if user have right roles over request decorator
                     * */
                    await request.can({ role }, roles)
                } catch (err) {
                    reply.send(err)
                }
            }
    )

    /**
     * Check if document is mine with app or server.isMine(doc, user)
     * */
    server.decorateRequest('isMine', ({ _id }, doc, statusCode) =>
        statusCode
            ? server.assert(
                doc.author._id.equals(_id),
                statusCode,
                'Document not yours'
            )
            : doc.author._id.equals(_id)
    )

    /**
     * Add author helper that add author to document on authenticated endpoint
     * */
    server.decorate(
        'addAuthor',
        (key = 'author') =>
            async (request) =>
                Object.assign(request.body, {
                    [key]: request.user._id,
                })
    )

    /**
     * Populate helper that populate specific fields
     * (default author population)
     * */
    server.decorate(
        'populate',
        (
            fields = {
                path: 'author',
                select: 'displayName picture',
            }
        ) =>
            async (request, reply, payload) => {
                try {
                    await payload.populate(fields)
                } catch (error) {
                    console.log(error)
                }
            }
    )
}

export default fp(plugin, {
    fastify: '3.x',
    name: 'authenticate',
})
