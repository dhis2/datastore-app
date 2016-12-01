import { expect } from 'chai';
import reducer from '../../webapp/js/reducers/uiReducer';

const fetchedState = { fetching: false, fetched: true, error: false };
const fetchingState = { fetching: true, fetched: false, error: false };
const errorState = { fetching: false, fetched: false, error: true };
const emptyDialog = { dialogType: null, dialogprops: {} };
const emptySnackbar = { snackbarMessage: { message: '' } };

describe('Sidebar Reducer', () => {
      it('Should handle SELECT_NAMESPACE', () => {
          const initialState = {};
          const action = {
              type: 'SELECT_NAMESPACE',
              selectedNamespace: 'test',
          }
          const newState = reducer(initialState, action);
          expect(newState).to.eql({
              selectedNamespace: 'test',
          });
      });

      it('Should handle SELECT_KEY', () => {
          const initialState = {};
          const action = {
              type: 'SELECT_KEY',
              namespace: 'test',
              key: 'test',
              value: 'test',
          }
          const newState = reducer(initialState, action);
          expect(newState).to.eql({
              ...fetchedState,
              ...emptySnackbar,
              namespace: 'test',
              key: 'test',
              value: 'test',
              editedValue: {},
          });
      });

      it('Should handle FETCH_VALUE_PENDING', () => {
          const initialState = {};
          const action = {
              type: 'FETCH_VALUE_PENDING',
          }
          const newState = reducer(initialState, action);
          expect(newState).to.eql({
              ...fetchingState,
          });
      });

      it('Should handle UPDATE_VALUE_FULFILLED', () => {
          const initialState = {};
          const action = {
              type: 'UPDATE_VALUE_FULFILLED',
              value: 'test',
          }
          const newState = reducer(initialState, action);
          expect(newState).to.eql({
              value: 'test',
              snackbarMessage: {
                  message: 'Value saved.',
              },
          });
      });

      it('Should handle UPDATE_VALUE_REJECTED', () => {
          const initialState = {};
          const action = {
              type: 'UPDATE_VALUE_REJECTED',
          }
          const newState = reducer(initialState, action);
          expect(newState).to.eql({
              snackbarMessage: {
                  message: 'Failed to save.',
              },
          });
      });

      it('Should handle FETCH_HISTORY_REJECTED', () => {
          const initialState = {};
          const action = {
              type: 'FETCH_HISTORY_REJECTED',
          }
          const newState = reducer(initialState, action);
          expect(newState).to.eql({
              ...errorState,
              snackbarMessage: {
                  message: 'Failed to get history.',
              },
          });
      });

      it('Should handle OPEN_DIALOG', () => {
          const initialState = {};
          const action = {
              type: 'OPEN_DIALOG',
              dialogType: 'test',
              dialogprops: 'test',
          }
          const newState = reducer(initialState, action);
          expect(newState).to.eql({
              dialog: {
                  dialogType: 'test',
                  dialogprops: 'test',
              },
          });
      });

      it('Should handle CLOSE_DIALOG', () => {
          const initialState = {};
          const action = {
              type: 'CLOSE_DIALOG',
          }
          const newState = reducer(initialState, action);
          expect(newState).to.eql({
              dialog: {
                  ...emptyDialog,
              }
          });
      });

      it('Should handle CREATE_NAMESPACE', () => {
          const initialState = {};
          const action = {
              type: 'CREATE_NAMESPACE',
              namespace: 'test',
              key: 'test',
          }
          const newState = reducer(initialState, action);
          expect(newState).to.eql({
              namespaceToBeCreated: {
                  namespace: 'test',
                  key: 'test',
              },
          });
      });

      it('Should handle VALUE_CHANGE', () => {
          const initialState = {};
          const action = {
              type: 'VALUE_CHANGE',
              namespace: 'test',
              key: 'test',
              value: 'test',
          }
          const newState = reducer(initialState, action);
          expect(newState).to.eql({
              namespace: 'test',
              key: 'test',
              editedValue: 'test',
          });
      });


});
