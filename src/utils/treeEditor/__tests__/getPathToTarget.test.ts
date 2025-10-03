import {
    arrayKey,
    objectKey,
    objectWithNumericalKeys,
} from '../../__mocks__/treeEditorMocks'
import { getPathToTarget } from '../treeEditorUtils'

describe('getPathToTarget', () => {
    it('returns a path to the target value within the parent value', () => {
        expect(getPathToTarget({}, {})).toStrictEqual([])
        expect(getPathToTarget({}, [])).toStrictEqual(null)

        expect(getPathToTarget(arrayKey, arrayKey[1])).toStrictEqual(['1'])
        expect(getPathToTarget(arrayKey, [])).toStrictEqual([
            '0',
            'translations',
        ])

        expect(
            getPathToTarget(objectKey, objectKey['mapViews'][0])
        ).toStrictEqual(['mapViews', '0'])

        expect(
            getPathToTarget(arrayKey, objectWithNumericalKeys)
        ).toStrictEqual(null)
    })
})
