import { findMe } from './controller'

export default async function (app) {
    app.route({
        url: '/me',
        method: ['GET'],
        preValidation: [app.authenticate()],
        preSerialization: [app.pick(['displayName', 'email', 'picture'])],
        handler: findMe,
    })
}
