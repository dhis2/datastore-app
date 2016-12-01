import { expect } from 'chai';
import reducer from '../../webapp/js/reducers/sidebarReducer';

const fetchedState = { fetching: false, fetched: true, error: false };
const fetchingState = { fetching: true, fetched: false, error: false };
const errorState = { fetching: false, fetched: false, error: true };

describe('Sidebar Reducer', () => {
    it('Should handle FETCH_NAMESPACES_FULFILLED', () => {
        const initialState = {};
        const newState = reducer(initialState, { type: 'FETCH_NAMESPACES_FULFILLED' });
        expect(newState).to.eql(fetchedState);
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
