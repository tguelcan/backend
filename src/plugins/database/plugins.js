import mongoosePaginate from 'mongoose-paginate-v2'
import { pagination } from '~/config'

/**
 * Bind mongoose plugins here
 * @return resolve promise mongoose
 * */
export default (mongoose) =>
    new Promise((resolve) => {
        /**
         * Mongoose Pagination
         * */
        mongoosePaginate.paginate.options = pagination
        mongoose.plugin(mongoosePaginate)

        /**
         * Throw 401 if not found document
         * */

        mongoose.plugin(
            (schema) =>
                (schema.query.throwIfEmpty = function (
                    reply,
                    message = 'Document not found'
                ) {
                    const originalExec = this.exec

                    this.exec = () => {
                        const applied = originalExec.apply(this)
                        return applied.then((doc) => {
                            if (!doc) {
                                reply.notFound(message)
                            }

                            return doc
                        })
                    }

                    return this
                })
        )

        /**
         * More mongoose plugins
         * ...
         * */

        resolve(mongoose)
    })
