import { isLosslessNumber, isSafeNumber, parse, stringify } from 'lossless-json'

export function stringifyEditorValue(text) {
    return stringify(
        text,
        (_, value) => {
            if (typeof value === 'string') {
                return isSafeNumber(value) ? Number(value) : value
            }
            return value
        },
        4
    )
}

export function parseEditorValue(jsonText) {
    return parse(jsonText, (_, value) => {
        if (isLosslessNumber(value)) {
            const num = value?.valueOf()
            return typeof num === 'bigint' ? num.toString() : num
        }
        return value
    })
}
