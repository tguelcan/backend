import { last, get, set, isArray, forEach } from 'lodash'

/**
 * flatPick uses the pick function
 * and distinguishes between array and object.
 * @param {object} json Object
 * @param {paths} selected keys
 * @return {object} filtered object
 * */
const pick = (object, paths) => {
    const item = {}

    paths.forEach((path) =>
        set(item, last(path.split('.')), get(object, path))
    )

    return item
}

const flatPick = (object, paths) => {
    if (isArray(object)) {
        forEach(object, (item, key) => {
            object[key] = pick(item, paths)
        })
    } else {
        object = pick(object, paths)
    }

    return object
}

export default flatPick
