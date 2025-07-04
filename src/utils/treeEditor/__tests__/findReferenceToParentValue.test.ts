import { arrayKey, objectKey } from '../../__mocks__/treeEditorMocks'
import { findReferenceToParentValue } from '../treeEditorUtils'

describe('findReferenceToParentValue', () => {
    it('finds reference to parent value in an array', () => {
        expect(
            findReferenceToParentValue({
                mainObj: arrayKey,
                path: [1, 'id'],
            })
        ).toBe(arrayKey[1])

        expect(
            findReferenceToParentValue({
                mainObj: arrayKey,
                path: [1],
            })
        ).toBe(arrayKey)
    })

    it('finds reference to parent value in an object', () => {
        expect(
            findReferenceToParentValue({
                mainObj: objectKey,
                path: ['user', 'id'],
            })
        ).toBe(objectKey['user'])

        expect(
            findReferenceToParentValue({
                mainObj: objectKey,
                path: ['user'],
            })
        ).toBe(objectKey)

        expect(
            findReferenceToParentValue({
                mainObj: objectKey,
                path: ['mapViews'],
            })
        ).toBe(objectKey)

        expect(
            findReferenceToParentValue({
                mainObj: objectKey,
                path: ['mapViews', 0],
            })
        ).toBe(objectKey['mapViews'])
    })
})
