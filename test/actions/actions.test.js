import { expect } from 'chai';
import * as actions from '../../webapp/js/actions/actions';
import * as types from '../../webapp/js/constants/actionTypes';
import { searchSidebarChange } from '../../webapp/js/actions/sidebarActions'

describe('actions', () => {
    it('should search the sidebar use the search value', () => {
        const searchValue = 'testSearch';
        const expectedAction = {
            type: types.SEARCH_VALUE_CHANGE,
            searchValue,
        };
        expect(searchSidebarChange(searchValue)).to.eql(expectedAction);
    });

    it('should request and wait for a set of namespaces', () => {
        const expectedAction = {
            type: types.FETCH_NAMESPACES_PENDING,
        };
        expect(actions.requestNamespaces()).to.eql(expectedAction);
    });

    it('should reject a request for namespaces with an error', () => {
        const error = 'testNamespace';
        const expectedAction = {
            type: types.FETCH_NAMESPACES_REJECTED,
            error,
        };
        expect(actions.rejectNamespaces(error)).to.eql(expectedAction);
    });

    it('should fulfill the request for namespaces and deliver', () => {
        const namespaces = { testNamespace: 'testNamespace' };
        const expectedAction = {
            type: types.FETCH_NAMESPACES_FULFILLED,
            namespaces,
        };
        expect(actions.recieveNamespaces(namespaces)).to.eql(expectedAction);
    });

    it('should request and wait for a set of keys', () => {
        const namespace = 'testNamespace';
        const expectedAction = {
            type: types.FETCH_KEYS_PENDING,
            namespace,
        };
        expect(actions.requestKeys(namespace)).to.eql(expectedAction);
    });

    it('should reject a request for keys with an error', () => {
        const namespace = 'testNamespace';
        const error = 'testError';
        const expectedAction = {
            type: types.FETCH_KEYS_REJECTED,
            namespace,
            error,
        };
        expect(actions.rejectKeys(namespace, error)).to.eql(expectedAction);
    });

    it('should fulfill the request for keys and deliver', () => {
        const namespace = 'testNamespace';
        const keys = { testKey: 'testKey' };
        const expectedAction = {
            type: types.FETCH_KEYS_FULFILLED,
            namespace,
            keys,
        };
        expect(actions.recieveKeys(namespace, keys)).to.eql(expectedAction);
    });

    it('should request and wait for a value', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const expectedAction = {
            type: types.FETCH_VALUE_PENDING,
            namespace,
            key,
        };
        expect(actions.requestValue(namespace, key)).to.eql(expectedAction);
    });

    it('should reject a request for a value', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const error = 'testError';
        const expectedAction = {
            type: types.FETCH_VALUE_REJECTED,
            namespace,
            key,
            error,
        };
        expect(actions.rejectValue(namespace, key, error)).to.eql(expectedAction);
    });

    it('should fulfill the request for a value', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const value = 'testValue';
        const expectedAction = {
            type: types.FETCH_VALUE_FULFILLED,
            namespace,
            key,
            value,
        };
        expect(actions.recieveValue(namespace, key, value)).to.eql(expectedAction);
    });

    it('should request to create a value and bind it to a key', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const value = 'testValue';
        const expectedAction = {
            type: types.CREATE_VALUE_PENDING,
            namespace,
            key,
            value,
        };
        expect(actions.requestCreateValue(namespace, key, value)).to.eql(expectedAction);
    });

    it('should reject request to create a new value', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const value = 'testValue';
        const error = 'testError';
        const expectedAction = {
            type: types.CREATE_VALUE_REJECTED,
            namespace,
            key,
            value,
            error,
        };
        expect(actions.rejectCreateValue(namespace, key, value, error)).to.eql(expectedAction);
    });

    it('should fulfill the request to create a new value and bind it to a key', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const value = 'testValue';
        const expectedAction = {
            type: types.CREATE_VALUE_FULFILLED,
            namespace,
            key,
            value,
        };
        expect(actions.receivedCreateValue(namespace, key, value)).to.eql(expectedAction);
    });

    it('should request to update a value', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const value = 'testValue';
        const expectedAction = {
            type: types.UPDATE_VALUE_PENDING,
            namespace,
            key,
            value,
        };
        expect(actions.requestUpdateValue(namespace, key, value)).to.eql(expectedAction);
    });

    it('should reject request to update a value', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const value = 'testValue';
        const error = 'testError';
        const expectedAction = {
            type: types.UPDATE_VALUE_REJECTED,
            namespace,
            key,
            value,
            error,
        };
        expect(actions.rejectUpdateValue(namespace, key, value, error)).to.eql(expectedAction);
    });

    it('should fulfill the request to uptade a value', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const value = 'testValue';
        const expectedAction = {
            type: types.UPDATE_VALUE_FULFILLED,
            namespace,
            key,
            value,
        };
        expect(actions.receiveUpdateValue(namespace, key, value)).to.eql(expectedAction);
    });

    it('should request to delete a key', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const expectedAction = {
            type: types.DELETE_KEY_PENDING,
            namespace,
            key,
        };
        expect(actions.requestDeleteKey(namespace, key)).to.eql(expectedAction);
    });

    it('should reject request to delete a key', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const error = 'testError';
        const expectedAction = {
            type: types.DELETE_KEY_REJECTED,
            namespace,
            key,
            error,
        };
        expect(actions.rejectDeleteKey(namespace, key, error)).to.eql(expectedAction);
    });

    it('should fulfill the request to delete a key', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const expectedAction = {
            type: types.DELETE_KEY_FULFILLED,
            namespace,
            key,
        };
        expect(actions.receiveDeleteKey(namespace, key)).to.eql(expectedAction);
    });

    it('should request to delete a namespace', () => {
        const namespace = 'testNamespace';
        const expectedAction = {
            type: types.DELETE_NAMESPACE_PENDING,
            namespace,
        };
        expect(actions.requestDeleteNamespace(namespace)).to.eql(expectedAction);
    });

    it('should reject request to delete a namespace', () => {
        const namespace = 'testNamespace';
        const error = 'testError';
        const expectedAction = {
            type: types.DELETE_NAMESPACE_REJECTED,
            namespace,
            error,
        };
        expect(actions.rejectDeleteNamespace(namespace, error)).to.eql(expectedAction);
    });

    it('should fulfill the request to delete a namespace', () => {
        const namespace = 'testNamespace';
        const expectedAction = {
            type: types.DELETE_NAMESPACE_FULFILLED,
            namespace,
        };
        expect(actions.receiveDeleteNamespace(namespace)).to.eql(expectedAction);
    });

    it('should request history data', () => {
        const expectedAction = {
            type: types.FETCH_HISTORY_PENDING,
        };
        expect(actions.requestHistory()).to.eql(expectedAction);
    });

    it('should reject request for history data', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const error = 'testError';
        const expectedAction = {
            type: types.FETCH_HISTORY_REJECTED,
            namespace,
            key,
            error,
        };
        expect(actions.rejectHistory(namespace, key, error)).to.eql(expectedAction);
    });

    it('should fulfill the request for history data', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const history = { testHistory: 'testHistory' };
        const expectedAction = {
            type: types.FETCH_HISTORY_FULFILLED,
            namespace,
            key,
            history,
        };
        expect(actions.recieveHistory(namespace, key, history)).to.eql(expectedAction);
    });

    it('should reject request for namespace history', () => {
        const namespace = 'testNamespace';
        const error = 'testError';
        const expectedAction = {
            type: types.FETCH_NAMESPACE_HISTORY_REJECTED,
            namespace,
            error,
        };
        expect(actions.rejectNamespaceHistory(namespace, error)).to.eql(expectedAction);
    });

    it('should fulfill the request for namespace history', () => {
        const namespace = 'testNamespace';
        const history = { testHistory: 'testHistory' };
        const expectedAction = {
            type: types.FETCH_NAMESPACE_HISTORY_FULFILLED,
            namespace,
            history,
        };
        expect(actions.recieveNamespaceHistory(namespace, history)).to.eql(expectedAction);
    });

    it('should change the selected value', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const value = 'testValue';
        const expectedAction = {
            type: types.VALUE_CHANGE,
            namespace,
            key,
            value,
        };
        expect(actions.valueChange(namespace, key, value)).to.eql(expectedAction);
    });

    it('should toggle a namespace item', () => {
        const namespace = 'testNamespace';
        const override = true;
        const expectedAction = {
            type: types.TOGGLE_NAMESPACE,
            namespace,
            override,
        };
        expect(actions.toggleNamespace(namespace, override)).to.eql(expectedAction);
    });

    it('should change the selected value', () => {
        const namespace = 'testNamespace';
        const key = 'testKey';
        const value = 'testValue';
        const expectedAction = {
            type: types.SELECT_KEY,
            namespace,
            key,
            value,
        };
        expect(actions.selectKey(namespace, key, value)).to.eql(expectedAction);
    });
});
