import * as actions from '../constants/actionTypes';
import api from '../utils/api';
import { hashHistory } from 'react-router';

let getApi = api.init()
/**
 *  Namespace Action Creators
 */
export function recieveNamespaces(namespaces) {
    return {
        type: actions.FETCH_NAMESPACES_FULFILLED,
        namespaces,
    };
}

export function rejectNamespaces(error) {
    return {
        type: actions.FETCH_NAMESPACES_REJECTED,
        error,
    };
}

export function requestNamespaces() {
    return {
        type: actions.FETCH_NAMESPACES_PENDING,
    };
}

/**
 *  Key Action Creators
 */
export function recieveKeys(namespace, keys) {
    return {
        type: actions.FETCH_KEYS_FULFILLED,
        namespace,
        keys,
    };
}

export function requestKeys(namespace) {
    return {
        type: actions.FETCH_KEYS_PENDING,
        namespace,
    };
}

export function rejectKeys(namespace, error) {
    return {
        type: actions.FETCH_KEYS_REJECTED,
        namespace,
        error,
    };
}
/* These are used for creation of namespaces, as you need
 * a key and a value to create a namespace*/

function receivedCreateValue(namespace, key, value) {
    return {
        type: actions.CREATE_VALUE_FULFILLED,
        namespace,
        key,
        value,
    };
}

function requestCreateValue(namespace, key, value) {
    return {
        type: actions.CREATE_VALUE_PENDING,
        namespace,
        key,
        value,
    };
}

function rejectCreateValue(namespace, key, value, error) {
    return {
        type: actions.CREATE_VALUE_REJECTED,
        namespace,
        key,
        value,
        error,
    };
}


/**
 *  Value Action Creators
 */
export function recieveValue(namespace, key, value) {
    return {
        type: actions.FETCH_VALUE_FULFILLED,
        namespace,
        key,
        value,
    };
}

export function requestValue(namespace, key) {
    return {
        type: actions.FETCH_VALUE_PENDING,
        namespace,
        key,
    };
}

export function rejectValue(namespace, key, error) {
    return {
        type: actions.FETCH_VALUE_REJECTED,
        namespace,
        key,
        error,
    };
}

function requestUpdateValue(namespace, key, value) {
    return {
        type: actions.UPDATE_VALUE_PENDING,
        namespace,
        key,
        value,
    };
}

function receiveUpdateValue(namespace, key, value) {
    return {
        type: actions.UPDATE_VALUE_FULFILLED,
        namespace,
        key,
        value,
    };
}

export function rejectUpdateValue(namespace, key, value, error) {
    return {
        type: actions.UPDATE_VALUE_REJECTED,
        namespace,
        key,
        value,
        error,
    };
}

function requestDeleteKey(namespace, key) {
    return {
        type: actions.DELETE_KEY_PENDING,
        namespace,
        key,
    };
}

function receiveDeleteKey(namespace, key) {
    return {
        type: actions.DELETE_KEY_FULFILLED,
        namespace,
        key,
    };
}

function rejectDeleteKey(namespace, key, error) {
    return {
        type: actions.DELETE_KEY_REJECTED,
        namespace,
        key,
        error,
    };
}

function requestDeleteNamespace(namespace) {
    return {
        type: actions.DELETE_NAMESPACE_PENDING,
        namespace,
    };
}

function receiveDeleteNamespace(namespace) {
    return {
        type: actions.DELETE_NAMESPACE_FULFILLED,
        namespace,
    };
}

function rejectDeleteNamespace(namespace) {
    return {
        type: actions.DELETE_NAMESPACE_REJECTED,
        namespace,
    };
}
/**
 *  History Action Creators
 */

export function requestHistory() {
    return {
        type: actions.FETCH_HISTORY_PENDING,
    };
}

export function recieveHistory(namespace, key, history) {
    return {
        type: actions.FETCH_HISTORY_FULFILLED,
        namespace,
        key,
        history,
    };
}

export function rejectHistory(namespace, key, error) {
    return {
        type: actions.FETCH_HISTORY_REJECTED,
        namespace,
        key,
        error,
    };
}

export function recieveNamespaceHistory(namespace, history) {
    return {
        type: actions.FETCH_NAMESPACE_HISTORY_FULFILLED,
        namespace,
        history,
    };
}

export function rejectNamespaceHistory(namespace, error) {
    return {
        type: actions.FETCH_NAMESPACE_HISTORY_REJECTED,
        namespace,
        error,
    };
}

/**
 *  UI Action Creators
 */
export function valueChange(namespace, key, value) {
    return {
        type: actions.VALUE_CHANGE,
        namespace,
        key,
        value,
    };
}
export function toggleNamespace(namespace, override) {
    return {
        type: actions.TOGGLE_NAMESPACE,
        namespace,
        override,
    };
}

export function selectKey(namespace, key, value) {
    return {
        type: actions.SELECT_KEY,
        namespace,
        key,
        value,
    };
}

/**
 * Fetches keys for a namespace and toggles the namespace
 * in the list.
 * If the namespace is not found in the API it will be removed
 * from the list aswell.
 * @param namespace to get keys for.
 * @param openNamespace overrides the toggling, if true it will always
 * open regardless of previous state of the namespace.
 * @returns action thunk
 */
export function fetchAndToggleNamespace(namespace, openNamespace = false) {
    return dispatch => {
        dispatch(requestKeys(namespace));
        return getApi.then(api => api.getKeys(namespace)
            .then(keys => {
                dispatch(recieveKeys(namespace, keys));
            })
            .then(() => dispatch(toggleNamespace(namespace, openNamespace)))
            .catch(error => {
                if (error.status === 404) { // If not found, we remove the namespace from UI
                    return dispatch(receiveDeleteNamespace(namespace));
                } else if (error) { // propagate error
                    throw error;
                }
                return null;
            })
            .catch(error => {
                dispatch(rejectKeys(namespace, error));
            }));
    };
}

/**
 * Fetches a value for given key and namespace.
 * Selectkey will be called upon success, updating the
 * state with the value and the key.
 * @param namespace containing key
 * @param key containing value
 * @returns action thunk
 */
export function fetchAndDisplayKeyValue(namespace, key) {
    return dispatch => {
        dispatch(requestValue(namespace, key));
        return getApi.then(api => api.getValue(namespace, key)
            .then(value => {
                dispatch(recieveValue(namespace, key, value));
                dispatch(selectKey(namespace, key, value));
            })
            .catch(error => dispatch(rejectValue(namespace, key, error))));
    };
}

/**
 * @function fetchNamespaces
 * Intial fetching of namespaces
 * @returns action thunk
 */
export function fetchNamespaces() {
    return dispatch => {
        dispatch(requestNamespaces());
        return getApi.then(api => api.getNamespaces()
            .then(namespaces => {
                dispatch(recieveNamespaces(namespaces));
            })
            .catch(error => dispatch(rejectNamespaces(error))));
    };
}

/**
 * @function createValue
 * Creates a value with key in namespace.
 *
 * Because of how the API behaves, this is used for both creating
 * keys and namespaces. We always create a value with empty values, and instead use
 * updateValue to update values.
 * If a namespace exists, the key will be created in namespace with an empty value
 * If both namespace and key exists; rejectCreateValue will be dispatched.
 * @param namespace to create or add key in
 * @param key to create
 * @returns action thunk
 */
export function createValue(namespace, key, value) {
    return dispatch => {
        dispatch(requestCreateValue(namespace, key, value));
        return getApi.then(api => api.createValue(namespace, key, value)
            .then(() => dispatch(receivedCreateValue(namespace, key, value))));
    };
}

/**
 * @function createAndDisplayValue
 * Creates a value with key in namespace.
 *
 * On success, the namespace will be opened and the empty
 * value will be displayed. Note that this is used both for
 * creating namespaces and keys. See {@link createValue}
 * @param namespace namespace to create or update
 * @param key to create
 * @returns action thunk
 */
export function createAndDisplayValue(namespace, key) {
    return dispatch => {
        dispatch(createValue(namespace, key, {}))
            .then(() => hashHistory.push(`/edit/${namespace}/${key}`))
            .then(() => dispatch(fetchAndToggleNamespace(namespace, true)))
            .catch(error => dispatch(rejectCreateValue(namespace, key, {}, error)));
    };
}

export function fetchKeys(namespace) {
    return dispatch => {
        dispatch(requestKeys(namespace));
        return getApi.then(api => api.getKeys(namespace)
            .then(keys => dispatch(recieveKeys(namespace, keys))));
    };
}

/**
 * Gets history for a key in a namespace
 * @param namespace for key
 * @param key in namespace
 * @returns action thunk
 */
export function fetchHistory(namespace, key) {
    return dispatch => {
        dispatch(requestHistory());
        return getApi.then(api => api.getHistoryOfKey(namespace, key)
            .then(history => {
                dispatch(recieveHistory(namespace, key, history));
            })
            .catch(error => {
                dispatch(rejectHistory(namespace, key, error));
            }));
    };
}

export function fetchHistoryForNamespace(namespace) {
    return dispatch => {
        dispatch(requestHistory());
        return getApi.then(api => api.getHistoryOfNamespace(namespace)
            .then(history => {
                dispatch(recieveNamespaceHistory(namespace, history));
            })
            .catch(error => {
                dispatch(rejectNamespaceHistory(namespace, error));
            }));
    };
}

/** @function updateValue
 *
 * Updates a value with key in namespace.
 * @param namespace containing value
 * @param key to update
 * @param value to update
 * @returns action thunk
 */
export function updateValue(namespace, key, value) {
    return dispatch => {
        dispatch(requestUpdateValue(namespace, key, value));
        return getApi.then(api => api.updateValue(namespace, key, value)
            .then(() => dispatch(receiveUpdateValue(namespace, key, value)))
            .catch(() => dispatch(rejectUpdateValue(namespace, key, value))));
    };
}

/**
 * Deletes a key from the API and store.
 * If it's the last key in the namespace, the namespace is
 * removed aswell (following the behavior of the API).
 * @param namespace containing the key to be removed
 * @param key to be removed
 * @returns action thunk
 */
export function deleteKey(namespace, key) {
    return dispatch => {
        dispatch(requestDeleteKey(namespace, key));
        return getApi.then(api => api.deleteValue(namespace, key)
            .then(() => dispatch(receiveDeleteKey(namespace, key)))
            .then(() => dispatch(fetchKeys(namespace)))
            .catch(error => {
                if (error.status === 404) { // If not found, we remove the namespace from UI
                    dispatch(receiveDeleteNamespace(namespace));
                } else if (error) { // Propagate error
                    throw error;
                } else { // togglenamespace if not last key
                    dispatch(toggleNamespace(namespace, true));
                }
            })
            .catch(error => {
                dispatch(rejectDeleteKey(namespace, key, error));
            }));
    };
}

/**
 * Deletes a namespace from the state and API.
 * This will also delete all keys in the namespace.
 * @param namespace to delete
 * @returns action thunk
 */
export function deleteNamespace(namespace) {
    return dispatch => {
        dispatch(requestDeleteNamespace(namespace));
        return getApi.then(api => api.deleteNamespace(namespace)
            .then(success => {
                dispatch(receiveDeleteNamespace(namespace));
                return success;
            })
            .catch(() => dispatch(rejectDeleteNamespace(namespace))));
    };
}
