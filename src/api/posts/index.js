import { find, findOne, createOne, updateOne, deleteOne } from './controller'

const returnPost = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        content: { type: 'string' },
        author: {
            _id: { type: 'string' },
            displayName: { type: 'string' },
            picture: { type: 'string' },
        },
    },
}

export default async function (app) {
    app.route({
        url: '/',
        method: ['GET'],
        preValidation: [app.authenticate(['user', 'admin'])],
        handler: find,
        schema: {
            description: 'Get all post objects',
            response: {
                200: {
                    rows: { type: 'array', items: returnPost },
                    totalDocs: { type: 'number' },
                    offset: { type: 'number' },
                    totalPages: { type: 'number' },
                    page: { type: 'number' },
                    prevPage: { type: 'number', nullable: true },
                    nextPage: { type: 'number', nullable: true },
                }
            }
        }
    })

    app.route({
        url: '/',
        method: ['POST'],
        preValidation: [app.authenticate()],
        preHandler: [app.addAuthor()],
        handler: createOne,
        preSerialization: [
            app.populate(),
            app.pick(['_id', 'content', 'author']),
        ],
        schema: {
            description: 'Post a new post object',
            body: {
                type: 'object',
                examples: [
                    {
                        name: 'Post Sample',
                        summary: 'Simple example',
                        value: { content: 'Good Morning!' },
                    },
                ],
                properties: {
                    content: { type: 'string', description: 'your post' },
                },
                required: ['content'],
            },
            response: {
                200: returnPost, /* Postman returns 200 but what about a 201 for example? Alt. = '2xx' or so */
            }
        },
    })

    app.route({
        url: '/:_id',
        method: ['GET'],
        preValidation: [app.authenticate()],
        handler: findOne,
        preSerialization: [
            app.throwIfEmpty(),
            app.populate(),
            app.pick(['_id', 'content', 'author']),
        ],
        schema: {
            description: 'Get one post object by id',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'post id' }
                }
            },
            response: {
                200: returnPost,
            }
        }
    })

    app.route({
        url: '/:_id',
        method: ['PUT'],
        preValidation: [app.authenticate()],
        handler: updateOne,
        preSerialization: [
            app.populate(),
            app.pick(['_id', 'content', 'author']),
        ],
    })

    app.route({
        url: '/:_id',
        method: ['DELETE'],
        preValidation: [app.authenticate()],
        handler: deleteOne,
    })
}
/*
preSerialization: async (request, reply, payload, done) => {
            await payload.populate({
                path: "author",
                select: "displayName picture",
            });
            // return await app.flatPick(payload, ["_id", "author", "content"]);
            return payload;
        },
*/
