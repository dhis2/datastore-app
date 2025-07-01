import { isEqual } from 'lodash-es'

export const getKeyToUpdate = ({ path }: { path: string | number[] }) => {
    return path && path.length > 0 ? path[path.length - 1] : null
}

export const findReferenceToParentValue = ({ mainObj, path }) => {
    let parentValue = mainObj
    if (path && path.length > 0) {
        for (let i = 0; i < path.length - 1; i++) {
            parentValue = parentValue[path[i]]
        }
    }
    return parentValue
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

const isNumericalKey = (key) => Number.isInteger(Number(key))
const isLabelKey = (key, label) => label.length && key === label

export const validateObject = ({ obj, label }) => {
    if (Array.isArray(obj)) {
        return obj
    } else {
        const values = Object.values(obj)
        const keys = Object.keys(obj)

        const hasNumericKeys = keys.every((key) => isNumericalKey(key))
        const onlyHasLabelKeys = keys.every((key) => isLabelKey(key, label))
        const hasNumericalAndLibraryLabelKeys = keys.every(
            (key) => isNumericalKey(key) || isLabelKey(key, label)
        )

        if (onlyHasLabelKeys) {
            return obj
        }
        if (hasNumericKeys) {
            return values
        }
        if (hasNumericalAndLibraryLabelKeys) {
            return values.map((value) => (value !== undefined ? value : null))
        }
    }
    return obj
}
