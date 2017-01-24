import { expect } from 'chai';
import reducer from '../../webapp/js/reducers/snackbarReducer';

const emptySnackbar = { snackbarMessage: { message: '' } };

describe('Snackbar Reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = { };
    });

    it('should handle SELECT_KEY', () => {
        const action = { type: 'SELECT_KEY' };
        const newState = reducer(initialState, action);
        expect(newState).to.eql(emptySnackbar);
    });

    it('Should handle UPDATE_VALUE_FULFILLED', () => {
        const action = {
            type: 'UPDATE_VALUE_FULFILLED',
        };

        const expectedResult = {
            message: 'Value saved.',
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle UPDATE_VALUE_REJECTED without error', () => {
        const action = {
            type: 'UPDATE_VALUE_REJECTED',
        };

        const expectedResult = {
            message: 'Failed to save.',
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle UPDATE_VALUE_REJECTED with error', () => {
        const action = {
            type: 'UPDATE_VALUE_REJECTED',
            error: 'test',
        };

        const expectedResult = {
            message: 'test',
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle FETCH_HISTORY_REJECTED', () => {
        const action = { type: 'FETCH_HISTORY_REJECTED' };

        const expectedResult = {
            message: 'Failed to get history.',
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle FETCH_KEYS_REJECTED', () => {
        const action = {
            type: 'FETCH_KEYS_REJECTED',
            error: 'test',
        };

        const expectedResult = {
            message: 'test',
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle DELETE_KEY_FULFILLED', () => {
        const action = { type: 'DELETE_KEY_FULFILLED' };

        const expectedResult = {
            message: 'Key deleted.',
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle DELETE_NAMESPACE_FULFILLED', () => {
        const action = { type: 'DELETE_NAMESPACE_FULFILLED' };

        const expectedResult = {
            message: 'Namespace deleted.',
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle CREATE_VALUE_REJECTED', () => {
        const action = { type: 'CREATE_VALUE_REJECTED' };

        const expectedResult = {
            message: 'Failed to create.',
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

});
