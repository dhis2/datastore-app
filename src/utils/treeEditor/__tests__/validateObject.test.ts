import {
    arrayKey,
    objectKey,
    objectWithNumericalAndLibraryLabelKeys,
    objectWithNumericalKeys,
} from '../../__mocks__/treeEditorMocks'
import { validateObject } from '../treeEditorUtils'

const LIBRARY_DEFAULT_KEY = 'AddKeyOrValue'

describe('validateObject', () => {
    it('returns valid object with string keys', () => {
        expect(
            validateObject({
                obj: objectKey,
                label: LIBRARY_DEFAULT_KEY,
            })
        ).toStrictEqual(objectKey)
    })

    it('returns valid array as is', () => {
        expect(
            validateObject({
                obj: arrayKey,
                label: LIBRARY_DEFAULT_KEY,
            })
        ).toStrictEqual(arrayKey)
    })

    it('transforms object with numerical keys into an array', () => {
        expect(
            validateObject({
                obj: objectWithNumericalKeys,
                label: LIBRARY_DEFAULT_KEY,
            })
        ).toStrictEqual(arrayKey)
    })

    it('retains object with only library label as is', () => {
        const object1 = {
            AddKeyOrValue: undefined,
        }
        const object2 = {
            AddKeyOrValue: {},
        }
        const object3 = {
            AddKeyOrValue: null,
        }
        expect(
            validateObject({
                obj: object1,
                label: LIBRARY_DEFAULT_KEY,
            })
        ).toStrictEqual(object1)

        expect(
            validateObject({
                obj: object2,
                label: LIBRARY_DEFAULT_KEY,
            })
        ).toStrictEqual(object2)

        expect(
            validateObject({
                obj: object3,
                label: LIBRARY_DEFAULT_KEY,
            })
        ).toStrictEqual(object3)
    })

    it('transforms object with numerical keys and default library label key into an array', () => {
        expect(
            validateObject({
                obj: objectWithNumericalAndLibraryLabelKeys,
                label: LIBRARY_DEFAULT_KEY,
            })
        ).toStrictEqual([...arrayKey, null])

        const object2 = {
            0: 'test',
            AddKeyOrValue: {},
        }
        const object3 = {
            0: 'test',
            AddKeyOrValue: null,
        }

        expect(
            validateObject({
                obj: object2,
                label: LIBRARY_DEFAULT_KEY,
            })
        ).toStrictEqual(['test', {}])

        expect(
            validateObject({
                obj: object3,
                label: LIBRARY_DEFAULT_KEY,
            })
        ).toStrictEqual(['test', null])
    })
})
