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

export function rejectAsyncAction(error) {
    return {
        type: actions.REJECT_ASYNC_ACTION,
        error
    }
}

/**
 *  Namespaces
 */
export function recieveNamespaces(namespaces) {
    return {
        type: actions.FETCH_NAMESPACES_FULFILLED,
        namespaces
    }
}

export function requestNamespaces() {
    return {
        type: actions.FETCH_NAMESPACES_PENDING
    }
}

export function rejectNamespaces() {
    return {
        type: actions.FETCH_NAMESPACES_REJECTED
    }
}

/**
 *  Keys
 */
export function recieveKeys(keys, namespace) {
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

export function recieveValue(value, namespace, key) {
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

export function rejectValue(error, namespace, key) {
    return {
        type: actions.FETCH_VALUE_REJECTED,
        namespace,
        key,
        error
    }
}

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

/**
 *  Async Action Functions
 */


  export function fetchAndToggleNamespace(namespace) {
    return (dispatch, getState) => {
      if(!shouldFetchKeys(getState(), namespace)) {
        return dispatch(toggleNamespace(namespace));
      }
        dispatch(requestKeys(namespace));

        return fetch(API_DATASTORE_URL + "/" + namespace, getHeaders())
         .then(response => response.json()
           .then(json => {
             dispatch(recieveKeys(json, namespace));
             dispatch(toggleNamespace(namespace));
           }))
         .catch(error => dispatch(rejectKeys(namespace, error)));
    }
 }

 export function fetchAndDisplayKeyValue(namespace, key) {
   return (dispatch, getState) => {
     if(!shouldFetchValue(getState(), namespace, key)){
       return dispatch(selectKey(namespace, key, getState().api.namespaces[namespace].keys[key].value))
     }
     dispatch(requestValue(namespace, key));

     return fetch(API_DATASTORE_URL + '/' + namespace + '/' + key, getHeaders())
         .then(success => success.json()
             .then(json => {
                dispatch(recieveValue(json, namespace, key));
                dispatch(selectKey(namespace, key, json));
             }))
         .catch(error => dispatch(rejectValue(error, namespace, key)))
   }
 }





/**
 *  CREATE Functions
 */
export function createValue(namespace, key, value) {
    return dispatch => {
        dispatch(requestDeletion());
        return fetch(API_DATASTORE_URL + '/${namespace}/${key}', {
                'method': 'POST',
                'body': JSON.stringify(value)
            }, getHeaders())
            .then(success => success.json()
                .then(json => dispatch(createSuccessfull(json))))
            .then(error => dispatch(createError(error)))
    }
}

/**
 * FETCH (READ) Functions
 */


// Fetch namespaces from data store
export function fetchNamespaces() {
    return dispatch => {
        // Prepare reducer for incomming namespaces
        dispatch(requestNamespaces());

        // Fetch namespaces from api
        return fetch(API_DATASTORE_URL, getHeaders())
            .then(success => success.json()
                .then(json => dispatch(recieveNamespaces(json))))
            .catch(error => dispatch(rejectNamespaces(error)))
    }
}

// Fetch keys from data store
export function fetchKeys(namespace) {
    return dispatch => {
        // Prepare reducer from incomming keys
        dispatch(requestKeys());

        // Fetch keys from api using given namespace
        return fetch(API_DATASTORE_URL + '/' + namespace, getHeaders())
            .then(success => success.json()
                .then(json => dispatch(recieveKeys(json, namespace))))
            .catch(error => dispatch(rejectKeys(namespace, error)))
    }
}

// Fetch value from data store
export function fetchValue(namespace, key) {
    return dispatch => {
        // Prepare reducer from incomming value
        dispatch(requestValue(namespace, key));

        // Fetch keys from api using given namespace
        return fetch(API_DATASTORE_URL + '/' + namespace + '/' + key, getHeaders())
            .then(success => success.json()
                .then(json => dispatch(recieveValue(json, namespace, key))))
            .catch(error => dispatch(rejectValue(error, namespace, key)))
    }
}

// Fetch key history form data store
export function fetchHistory(id) {
    return dispatch => {
        // Prepare reducer from incomming value
        dispatch(requestAsynAction())

        // Fetch history from datastore using given identifier
        return fetch(API_DATASTORE_URL + '/HISTORYSTORE/${id}', getHeaders())
            .then(success => success.json()
                .then(json => dispatch()))
            .catch(error => dispatch(rejectAsyncAction(error)))
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
            }, getHeaders())
            .then(success => success.json()
                .then(json => dispatch(createSuccessfull(json))))
            .catch(error => dispatch(rejectAsyncAction()))
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
        }).catch(error => dispatch(rejectAsyncAction(error)))
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
            }, getHeaders())
            .then(success => success.json()
                .then(json => dispatch(deleteSuccessfull(json))))
            .catch(error => dispatch(deleteError(error)))
    }
}

/**
 *  HELPER Functions
 */

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const shouldFetchKeys = (state, namespace) => {
  try {
    return !state.api.namespaces[namespace].fetched;
  } catch (e) {
    return true;
  }
}

const shouldFetchNamespaces = (state) => {
  try {
    return !state.api.fetched;
  } catch (e) {
    return true;
  }
}

const shouldFetchValue = (state, namespace, key) => {
  try {
    const value = state.api.namespaces[namespace].keys[key].value;
    return (typeof value === 'undefined') ? true : false;
  } catch (e) {
    return true;
  }
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
