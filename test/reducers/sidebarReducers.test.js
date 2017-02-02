import { expect } from 'chai';
import reducer from '../../webapp/js/reducers/jsonEditorReducer';

describe('JSON Editor Reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = { };
    });

    it('Should handle SEARCH_JSON without error', () => {
        const action = {
            type: 'SEARCH_JSON',
            searchValue: 'testSearch',
        };

        const expectedResult = {
            jsonSearchValue: 'testSearch',
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle COLLAPSE_JSON without error', () => {
        const action = {
            type: 'COLLAPSE_JSON',
        };

        const expectedResult = {
            expand: false,
            collapse: true,
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle EXPAND_JSON without error', () => {
        const action = {
            type: 'EXPAND_JSON',
        };

        const expectedResult = {
            expand: true,
            collapse: false,
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle COMPACT_JSON without error', () => {
        const action = {
            type: 'COMPACT_JSON',
        };

        const expectedResult = {
            compact: false,
            format: true,
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle FORMAT_JSON without error', () => {
        const action = {
            type: 'FORMAT_JSON',
        };

        const expectedResult = {
            compact: true,
            format: false,
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle REDO_JSON without error', () => {
        const action = {
            type: 'REDO_JSON',
        };

        const expectedResult = {
            redo: true,
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle UNDO_JSON without error', () => {
        const action = {
            type: 'UNDO_JSON',
        };

        const expectedResult = {
            undo: true,
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle CHANGE_JSON_MODE without error', () => {
        const action = {
            type: 'CHANGE_JSON_MODE',
            mode: 'code',
        };

        const expectedResult = {
            mode: 'code',
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle VALUE_CHANGE without error', () => {
        const action = {
            type: 'VALUE_CHANGE',
            mode: 'code',
        };

        const expectedResult = {
            undo: false,
            redo: false,
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });
});
