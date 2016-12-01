import { expect } from 'chai';
import reducer from '../../webapp/js/reducers/windowReducer';

const fetchedState = { fetching: false, fetched: true, error: false };
const fetchingState = { fetching: true, fetched: false, error: false };
const errorState = { fetching: false, fetched: false, error: true };

describe('Sidebar Reducer', () => {
    it('Should handle CREATE_VALUE_PENDING', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'CREATE_VALUE_PENDING' });
        expect(newState).to.eql({
            loading: true,
            error: null,
        });
    });

    it('Should handle FETCH_HISTORY_PENDING', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'FETCH_HISTORY_PENDING' });
        expect(newState).to.eql({
            loading: true,
            error: null,
        });
    });

    it('Should handle FETCH_VALUE_PENDING', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'FETCH_VALUE_PENDING' });
        expect(newState).to.eql({
            loading: true,
            error: null,
        });
    });

    it('Should handle LOAD_VALUE', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'LOAD_VALUE' });
        expect(newState).to.eql({
            loading: true,
            error: null,
        });
    });

    it('Should handle FETCH_VALUE_FULFILLED', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'FETCH_VALUE_FULFILLED' });
        expect(newState).to.eql({
            loading: false,
        });
    });

    it('Should handle CREATE_VALUE_FULFILLED', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'CREATE_VALUE_FULFILLED' });
        expect(newState).to.eql({
            loading: false,
        });
    });

    it('Should handle CREATE_VALUE_FULFILLED', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'CREATE_VALUE_FULFILLED' });
        expect(newState).to.eql({
            loading: false,
        });
    });

    it('Should handle CREATE_VALUE_FULFILLED', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'CREATE_VALUE_FULFILLED' });
        expect(newState).to.eql({
            loading: false,
        });
    });

    it('Should handle SELECT_KEY', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'SELECT_KEY' });
        expect(newState).to.eql({
            loading: false,
        });
    });

    it('Should handle CREATE_VALUE_REJECTED', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'CREATE_VALUE_REJECTED' });
        expect(newState).to.eql({
            error: true,
            loading: false,
        });
    });

    it('Should handle FETCH_VALUE_REJECTED', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'FETCH_VALUE_REJECTED' });
        expect(newState).to.eql({
            error: true,
            loading: false,
        });
    });

    it('Should handle FETCH_HISTORY_FULFILLED', () => {
        const initialState = {};
        const action = {
            type: 'FETCH_HISTORY_FULFILLED',
            history: [],
            namespace: 'test',
            key: 'test',
        }
        const newState = reducer(initialState, action);
        expect(newState).to.eql({
            loading: false,
            history: [],
            namespace: 'test',
            key: 'test',
        });
    });

    it('Should handle FETCH_NAMESPACE_HISTORY_FULFILLED', () => {
        const initialState = {};
        const action = {
            type: 'FETCH_NAMESPACE_HISTORY_FULFILLED',
            history: [],
            namespace: 'test',
        }
        const newState = reducer(initialState, action);
        expect(newState).to.eql({
            loading: false,
            history: [],
            namespace: 'test',
            error: null,
        });
    });

    it('Should handle FETCH_NAMESPACE_HISTORY_REJECTED', () => {
        const initialState = {};
        const action = {
            type: 'FETCH_NAMESPACE_HISTORY_REJECTED',
            namespace: 'test',
        }
        const newState = reducer(initialState, action);
        expect(newState).to.eql({
            loading: false,
            namespace: 'test',
            error: true,
        });
    });

    it('Should handle FETCH_HISTORY_REJECTED', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'FETCH_HISTORY_REJECTED' });
        expect(newState).to.eql({
            ...errorState,
            loading: false,
        });
    });
});
