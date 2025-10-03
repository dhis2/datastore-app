const getPatternMatchingKeys = ({
    obj,
    pattern,
}: {
    obj: object
    pattern: RegExp
}) => {
    const matches = []
    for (const key of Object.keys(obj)) {
        if (pattern.test(key)) {
            matches.push(key)
        }
    }
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

export const retrieveNextKey = ({ obj, key }: { obj: object; key: string }) => {
    // default pattern: key(n), e.g key1,.....,key(n)
    const pattern = new RegExp(`^${key}[0-9]*\\b$`, 'i')
    const matches = getPatternMatchingKeys({
        obj,
        pattern,
    })

    const nextIterator = getNextIterator({
        arr: matches,
        keyLength: key.length,
    })

    return nextIterator ? `${key}${nextIterator}` : key
}

export const findAndReplaceLibraryDefaultKeyAndValues = ({
    value,
    defaultLabel,
    newKeyName,
}) => {
    if (Array.isArray(value)) {
        const index = value.indexOf(defaultLabel)
        if (index >= 0) {
            value[index] = null
        }
    } else {
        const nextKeyName = retrieveNextKey({
            obj: value,
            key: newKeyName,
        })
        value[nextKeyName] = null
        delete value[defaultLabel]
    }
    return value
}
