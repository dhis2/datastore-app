import * as actions from '../constants/actionTypes';
import api from '../utils/api';

export function fetchAndToggleNamespace(namespace) {
    return dispatch => {
        dispatch(requestKeys(namespace));
        return api.getKeys(namespace)
            .then(keys => {
                dispatch(recieveKeys(namespace, keys));
                dispatch(toggleNamespace(namespace));
            })
            .catch(error => dispatch(rejectKeys(namespace, error)));
    }
}

export function fetchAndDisplayKeyValue(namespace, key) {
    return dispatch => {
        dispatch(requestValue(namespace, key));
        return api.getValue(namespace, key)
            .then(value => {
                dispatch(recieveValue(namespace, key, value));
                dispatch(selectKey(namespace, key, value));
            })
            .catch(error => dispatch(rejectValue(namespace, key, error)));
    }
}

export function fetchNamespaces() {
    return dispatch => {
        dispatch(requestNamespaces());
        return api.getNamespaces()
            .then(namespaces => dispatch(recieveNamespaces(namespaces)))
            .catch(error => dispatch(rejectNamespaces(error)));
    }
}

export function createValue(namespace, key, value) {
    return dispatch => {
        dispatch(requestCreate());
        return api.createValue(namespace, key, value)
            .then(success => dispatch(createValue(namespace, key, value)))
            .catch(error => dispatch(createValueE))
    }
}

export function fetchKeys(namespace) {
    return dispatch => {
        dispatch(requestKeys(namespace));
        return api.getKeys(namespace)
            .then(keys => dispatch(recieveKeys(namespace, keys)))
            .catch(error => dispatch(rejectKeys(namespace, error)))
    }
}

export function fetchValue(namespace, key) {
    return dispatch => {
        dispatch(requestValue(namespace, key));
        return api.getValue(namespace, key)
            .then(value => dispatch(recieveValue(namespace, key, value)))
            .catch(error => dispatch(rejectValue(namespace, key, error)));
    }
}

export function fetchHistory(namespace, key) {
    return dispatch => {
        dispatch(requestHistory());
        return api.getHistory(namespace, key)
            .then(history => console.log(history))
            .catch(error => console.log(error));
    }
}

export function updateHistory(namespace, key, value) {
    return dispatch => {
        return api.updateHistory(namespace, key, value)
            .then(success => console.log(success))
            .catch(error => console.log(error));
    }
}


export function updateValue(namespace, key, value) {
    return dispatch => {
        console.log("update value");
        dispatch(requestUpdateValue(namespace,key,value));
        return api.updateValue(namespace, key, value)
            .then(success => dispatch(receiveUpdateValue(namespace,key,value)))
            .catch(error => dispatch(rejectUpdateValue(namespace,key,value)));
    }
}

export function deleteValue(namespace, key) {
    return dispatch => {
        dispatch(requestValue());
        return api.deleteValue(namespace, key)
            .then(success => console.log(success))
            .catch(error => console.log(error));
    }
}

export function deleteNamespace(namespace) {
    return dispatch => {
        dispatch(requestNamespaces());
        return api.deleteNamespace(namespace)
            .then(success => console.log(success))
            .catch(error => console.log(error));
    }
}

/**
 *  Namesapce Action Creators
 */
export function recieveNamespaces(namespaces) {
    return {
        type: actions.FETCH_NAMESPACES_FULFILLED,
        namespaces
    }
}

export function rejectNamespaces(error) {
    return {
        type: actions.FETCH_NAMESPACES_REJECTED,
        error
    }
}

export function requestNamespaces() {
    return {
        type: actions.FETCH_NAMESPACES_PENDING
    }
}

/**
 *  Key Action Creators
 */
export function recieveKeys(namespace, keys) {
    return {
        type: actions.FETCH_KEYS_FULFILLED,
        namespace,
        keys
    }
}

export function requestKeys(namespace) {
    return {
        type: actions.FETCH_KEYS_PENDING,
        namespace
    }
}

export function rejectKeys(namespace, error) {
    return {
        type: actions.FETCH_KEYS_REJECTED,
        namespace,
        error
    }
}


/**
 *  Value Action Creators
 */
export function recieveValue(namespace, key, value) {
    return {
        type: actions.FETCH_VALUE_FULFILLED,
        namespace,
        key,
        value
    }
}

export function requestValue(namespace, key) {
    return {
        type: actions.FETCH_VALUE_PENDING,
        namespace,
        key
    }
}

export function rejectValue(namespace, key, error) {
    return {
        type: actions.FETCH_VALUE_REJECTED,
        namespace,
        key,
        error
    }
}

function requestUpdateValue(namespace,key,value) {
    return {
        type: actions.UPDATE_VALUE_PENDING,
        namespace,
        key,
        value
    }
}

function receiveUpdateValue(namespace,key,value) {
    return {
        type: actions.UPDATE_VALUE_FULFILLED,
        namespace,
        key,
        value
    }
}

function rejectUpdateValue(namespace,key,value,error) {
    return {
        type: actions.UPDATE_VALUE_FULFILLED,
        namespace,
        key,
        value,
        error
    }
}
/**
 *  History Action Creators
 */

export function requestHistory() {
  return {
    type: actions.REQUEST_HISTORY_PENDING
  }
}

/**
 *  UI Action Creators
 */
export function toggleNamespace(namespace) {
    return {
        type: actions.TOGGLE_NAMESPACE,
        namespace
    }
}

export function selectKey(namespace, key, value) {
    return {
        type: actions.SELECT_KEY,
        namespace,
        key,
        value
    }
}

export function setWindow() {
  
}
