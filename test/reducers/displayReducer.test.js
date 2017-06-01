import { expect } from 'chai';
import reducer from '../../webapp/js/reducers/displayReducer';

const fetchedState = { fetching: false, fetched: true, error: false };
const fetchingState = { fetching: true, fetched: false, error: false };
const errorState = { fetching: false, fetched: false, error: true };

describe('Display Reducer', () => {
      let initialState;

      beforeEach(() => {
            initialState = { };
      });

      it('Should handle CREATE_VALUE_PENDING', () => {
          const action = {
              type: 'CREATE_VALUE_PENDING',
          };
          const newState = reducer(initialState, action);
          expect(newState).to.eql(initialState);
      });

      it('Should handle FETCH_NAMESPACES_PENDING', () => {
          const action = {
              type: 'FETCH_NAMESPACES_PENDING',
          };
          const newState = reducer(initialState, action);
          expect(newState).to.eql(fetchingState);
      });

      it('Should handle FETCH_HISTORY_PENDING', () => {
          const action = {
              type: 'FETCH_HISTORY_PENDING',
          };
          const newState = reducer(initialState, action);
          expect(newState).to.eql(fetchingState);
      });

      it('Should handle FETCH_VALUE_PENDING', () => {
          const action = {
              type: 'FETCH_VALUE_PENDING',
          };
          const newState = reducer(initialState, action);
          expect(newState).to.eql(fetchingState);
      });

      it('Should handle LOAD_VALUE', () => {
          const action = {
              type: 'LOAD_VALUE',
          };
          const newState = reducer(initialState, action);
          expect(newState).to.eql(fetchingState);
      });

      it('Should handle CREATE_VALUE_REJECTED', () => {
          const action = {
              type: 'CREATE_VALUE_REJECTED',
          };
          const newState = reducer(initialState, action);
          expect(newState).to.eql(initialState);
      });

      it('Should handle FETCH_NAMESPACES_REJECTED', () => {
          const action = {
              type: 'FETCH_NAMESPACES_REJECTED',
          };
          const newState = reducer(initialState, action);
          expect(newState).to.eql(errorState);
      });

      it('Should handle FETCH_HISTORY_REJECTED', () => {
          const action = {
              type: 'FETCH_HISTORY_REJECTED',
          };
          const newState = reducer(initialState, action);
          expect(newState).to.eql(errorState);
      });

      it('Should handle FETCH_VALUE_REJECTED', () => {
          const action = {
              type: 'FETCH_VALUE_REJECTED',
          };
          const newState = reducer(initialState, action);
          expect(newState).to.eql(errorState);
      });

      it('Should handle CREATE_VALUE_FULFILLED', () => {
          const action = {
              type: 'CREATE_VALUE_FULFILLED',
          };
          const newState = reducer(initialState, action);
          expect(newState).to.eql(initialState);
      });

      it('Should handle FETCH_VALUE_FULFILLED', () => {
          const action = {
              type: 'FETCH_VALUE_FULFILLED',
          };
          const newState = reducer(initialState, action);
          expect(newState).to.eql(fetchedState);
      });

      it('Should handle FETCH_NAMESPACES_FULFILLED', () => {
          const action = {
              type: 'FETCH_NAMESPACES_FULFILLED',
          };
          const newState = reducer(initialState, action);
          expect(newState).to.eql(fetchedState);
      });

      it('Should handle FETCH_HISTORY_FULFILLED', () => {
          const action = {
              type: 'FETCH_HISTORY_FULFILLED',
              history: [],
              namespace: 'test',
              key: 'test',
          };

          const expectedResult = {
              ...fetchedState,
              history: [],
              namespace: 'test',
              key: 'test',
          };

          const newState = reducer(initialState, action);
          expect(newState).to.eql(expectedResult);
      });

      it('Should handle FETCH_NAMESPACE_HISTORY_FULFILLED', () => {
          const action = {
              type: 'FETCH_NAMESPACE_HISTORY_FULFILLED',
              history: [],
              namespace: 'test',
          };

          const expectedResult = {
              ...fetchedState,
              history: [],
              namespace: 'test',
          };

          const newState = reducer(initialState, action);
          expect(newState).to.eql(expectedResult);
      });

      it('Should handle FETCH_NAMESPACE_HISTORY_REJECTED', () => {
          const action = {
              type: 'FETCH_NAMESPACE_HISTORY_REJECTED',
              namespace: 'test',
          };

          const expectedResult = {
              ...errorState,
              namespace: 'test',
          };

          const newState = reducer(initialState, action);
          expect(newState).to.eql(expectedResult);
      });

      it('Should handle SELECT_KEY', () => {
          const action = {
              type: 'SELECT_KEY',
              namespace: 'test',
              key: 'test',
              value: 'test',
          };

          const expectedResult = {
              ...fetchedState,
              namespace: 'test',
              key: 'test',
              value: 'test',
              editedValue: 'test',
          };

          const newState = reducer(initialState, action);
          expect(newState).to.eql(expectedResult);
      });

      it('Should handle UPDATE_VALUE_FULFILLED', () => {
          const action = {
              type: 'UPDATE_VALUE_FULFILLED',
              value: 'test',
          };

          const expectedResult = {
              ...fetchedState,
              value: 'test',
          };

          const newState = reducer(initialState, action);
          expect(newState).to.eql(expectedResult);
      });

      it('Should handle VALUE_CHANGE', () => {
          const action = {
              type: 'VALUE_CHANGE',
              namespace: 'test',
              key: 'test',
              value: 'test',
          };

          const expectedResult = {
              ...fetchedState,
              namespace: 'test',
              key: 'test',
              editedValue: 'test',
          };

          const newState = reducer(initialState, action);
          expect(newState).to.eql(expectedResult);
      });
});
