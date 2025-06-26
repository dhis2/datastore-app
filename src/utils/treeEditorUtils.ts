import { isEqual } from 'lodash-es'

export const findReferenceToValueToUpdate = ({ mainObj, path }) => {
    let selectedValue = mainObj
    const lastKey = path && path.length > 0 ? path[path.length - 1] : null

    if (path && path.length > 0) {
        for (let i = 0; i < path.length - 1; i++) {
            selectedValue = selectedValue[path[i]]
        }
    }

    return {
        selectedValue,
        lastKey,
    }
}

export const getPathToTarget = (parent, target, path = []) => {
    if (isEqual(parent, target)) {
        return path
    }
    if (parent && typeof parent === 'object') {
        for (const key of Object.keys(parent)) {
            const result = getPathToTarget(parent[key], target, [...path, key])

            if (result) {
                return result
            }
        }
    }
    return null
}

const getPatternMatchingKeys = ({
    obj,
    pattern,
}: {
    obj: object
    pattern: RegExp
}) => {
    const matches = []
    Object.keys(obj).forEach((key) => {
        if (key === 'key' || pattern.test(key)) {
            matches.push(key)
        }
    })
    return matches
}

const getNextIterator = ({
    arr,
    keyLength,
}: {
    arr: string[]
    keyLength: number
}) => {
    let iterator = 0

    try {
        const postfixArr = arr.map((value) => Number(value.slice(keyLength)))
        if (arr?.length) {
            iterator = Math.max(...postfixArr)
            return iterator + 1
        }
        return iterator
    } catch {
        return iterator
    }
}

export const retrieveNextKey = ({
    obj,
    defaultKey,
}: {
    obj: object
    defaultKey: string
}) => {
    // default pattern: key(n), e.g key1,.....,key(n)
    const pattern = new RegExp(defaultKey + '+\\d')
    const matches = getPatternMatchingKeys({ obj, pattern })

    const nextIterator = getNextIterator({
        arr: matches,
        keyLength: defaultKey.length,
    })

    return nextIterator ? `${defaultKey}${nextIterator}` : defaultKey
}
