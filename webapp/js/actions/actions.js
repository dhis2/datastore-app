import * as actions from '../constants/actionTypes';
import {
    API_DATASTORE_URL
} from '../constants/apiUrls';
import api from '../utils/api';

/**
 *  Generic request action creators
 */
export function requestAsynAction() {
    return {
        type: actions.REQUEST_ASYNC_ACTION
    }
}

export function rejectAsyncAction() {
    return {
        type: actions.REJECT_ASYNC_ACTION
    }
}

/**
 *  Async fulfillment action creators
 */
export function recieveNamespaces(namespaces) {
    return {
        type: actions.FETCH_NAMESPACES_FULFILLED,
        namespaces
    }
}

export function recieveKeys(namespace, keys) {
    return {
        type: actions.FETCH_KEYS_FULFILLED,
        namespace,
        keys
    }
}

export function recieveValue(namespace, key, value) {
    return {
        type: actions.FETCH_VALUE_FULFILLED,
        namespace,
        key,
        value
    }
}

/**
 *  Async Action Functions
 */

/**
 *  CREATE Functions
 */
export function createValue(namespace, key, value) {
    return dispatch => {
        dispatch(requestDeletion());
        return fetch(API_DATASTORE_URL + '/${namespace}/${key}', {
            'method': 'POST',
            'body': JSON.stringify(value)
        }, getHeaders()).then(
            success => success.json().then(json => dispatch(createSuccessfull(json))),
            error => dispatch(createError(error))
        )
    }
}

/**
 * FETCH (READ) Functions
 */

// Fetch namespaces from data store
export function fetchNamespaces() {
    return dispatch => {
        // Prepare reducer for incomming namespaces
        dispatch(requestAsynAction());

        // Fetch namespaces from api
        return fetch(API_DATASTORE_URL, getHeaders()).then(
            success => success.json().then(json => dispatch(recieveNamespaces(json))),
            error => dispatch(rejectAsynAction(error))
        )
    }
}

// Fetch keys from data store
export function fetchKeys(namespace) {
    return dispatch => {
        // Prepare reducer from incomming keys
        dispatch(requestAsynAction());

        // Fetch keys from api using given namespace
        return fetch(API_DATASTORE_URL + '/${namespace}', getHeaders()).then(
            success => success.json().then(json => dispatch(recieveNamespaces(json, nemespace))),
            error => dispatch(rejectAsynAction(error))
        )
    }
}

// Fetch value from data store
export function fetchValue(namespace, key) {
    return dispatch => {
        // Prepare reducer from incomming value
        dispatch(requestAsynAction())

        // Fetch keys from api using given namespace
        return fetch(API_DATASTORE_URL + '/${namespace}/${key}', getHeaders()).then(
            success => success.json().then(json => dispatch(recieveNamespaces(json, nemespace))),
            error => dispatch(rejectAsynAction(error))
        )
    }
}

// Fetch key history form data store
export function fetchHistory(id) {
    return dispatch => {
        // Prepare reducer from incomming value
        dispatch(requestAsynAction())

        // Fetch history from datastore using given identifier
        return fetch(API_DATASTORE_URL + '/HISTORYSTORE/${id}', getHeaders()).then(
            success => success.json().then(json => dispatch()),
            error => dispatch(rejectAsynAction(error))
        )
    }
}

/**
 * UPDATE Functions
 */
export function updateValue(namespace, key, value) {
    return dispatch => {
        dispatch(requestDeletion());
        return fetch(API_DATASTORE_URL + '/${namespace}/${key}', {
            'method': 'PUT',
            'body': JSON.stringify(value)
        }, getHeaders()).then(
            success => success.json().then(json => dispatch(createSuccessfull(json))),
            error => dispatch(createError(error))
        )
    }
}

export function updateHistory(namespace, key, newValue) {
    return dispatch => {
        return getHistory(namespace, key).then(
            success => {
                if (success.status === 404) {
                    createValue('HISTORYSTORE', id, )
                } else {
                    return success.json();
                }
            }).then(history => {
            if (history !== null) {
                history.unshift(newValue);
                updateValue('HISTORYSTORE', id, history)
            }
        })
    }
}

/**
 *  DELETE Functions
 */
export function deleteValue(namespace, key) {
    return dispatch => {
        dispatch(requestDeletion());
        return fetch(API_DATASTORE_URL + '/${namespace}/${key}', {
            'method': 'DELETE'
        }, getHeaders()).then(
            success => success.json().then(json => dispatch(deleteSuccessfull(json))),
            error => dispatch(deleteError(error))
        )
    }
}

/**
 *  HELPER Functions
 */

const shouldUpdate = ({
    namespaces
}, namespace, key) => {
    const value =
        key ? namespaces[namespace][key] : namespaces[namespace]
    return (typeof value !== 'undefined');
}

const refresh = () => {

}

const getHeaders = () => {
    return {
        'method': 'GET',
        'mode': 'cors',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa('admin:district')}`
        }
    };
}
