import { expect } from 'chai';
import reducer from '../../webapp/js/reducers/sidebarReducer';

const fetchedState = { fetching: false, fetched: true, error: false };
const fetchingState = { fetching: true, fetched: false, error: false };
const errorState = { fetching: false, fetched: false, error: true };

describe('Sidebar Reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            searchValue: '',
            history: [],
            fetching: false,
            fetched: false,
            namespaces: { },
        };
    });

    it('Should handle SEARCH_VALUE_CHANGE', () => {
        const action = {
            type: 'SEARCH_VALUE_CHANGE',
            searchValue: 'test',
        };

        const expectedResult = {
            ...initialState,
            searchValue: 'test',
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle TOGGLE_NAMESPACE', () => {
        const action = {
            type: 'TOGGLE_NAMESPACE',
            namespace: 'test',
            override: true,
        };

        const expectedResult = {
            ...initialState,
            namespaces: {
                test: {
                    open: true,
                },
            },
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle FETCH_NAMESPACES_FULFILLED', () => {
        const action = {
            type: 'FETCH_NAMESPACES_FULFILLED',
            namespaces: ['test'],
        };

        const expectedResult = {
            ...initialState,
            ...fetchedState,
            namespaces: {
                test: {
                    keys: { },
                    name: 'test',
                    open: false,
                },
            },
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle FETCH_NAMESPACES_PENDING', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'FETCH_NAMESPACES_PENDING' });
        expect(newState).to.eql(fetchingState);
    });

    it('Should handle FETCH_NAMESPACES_REJECTED', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'FETCH_NAMESPACES_REJECTED' });
        expect(newState).to.eql(errorState);
    });
});
