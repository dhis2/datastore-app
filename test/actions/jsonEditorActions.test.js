import { expect } from 'chai';
import * as actions from '../../webapp/js/actions/jsonEditorActions';
import * as types from '../../webapp/js/constants/jsonEditorTypes';

describe('JSON Editor actions', () => {
    it('', () => {
        const searchValue = 'testSearch';
        const expectedAction = {
            type: types.SEARCH_JSON,
            searchValue,
        };
        expect(actions.searchJSON(searchValue)).to.eql(expectedAction);
    });

    it('', () => {
        const expectedAction = {
            type: types.EXPAND_JSON,
        };
        expect(actions.jsonEditorExpand()).to.eql(expectedAction);
    });

    it('', () => {
        const expectedAction = {
            type: types.COLLAPSE_JSON,
        };
        expect(actions.jsonEditorCollapse()).to.eql(expectedAction);
    });

    it('', () => {
        const expectedAction = {
            type: types.COMPACT_JSON,
        };
        expect(actions.jsonEditorCompact()).to.eql(expectedAction);
    });

    it('', () => {
        const expectedAction = {
            type: types.FORMAT_JSON,
        };
        expect(actions.jsonEditorFormat()).to.eql(expectedAction);
    });

    it('', () => {
        const expectedAction = {
            type: types.UNDO_JSON,
        };
        expect(actions.jsonEditorUndo()).to.eql(expectedAction);
    });

    it('', () => {
        const expectedAction = {
            type: types.REDO_JSON,
        };
        expect(actions.jsonEditorRedo()).to.eql(expectedAction);
    });

    it('', () => {
        const mode = 'code';
        const expectedAction = {
            type: types.CHANGE_JSON_MODE,
            mode,
        };
        expect(actions.jsonEditorChangeMode(mode)).to.eql(expectedAction);
    });
});
