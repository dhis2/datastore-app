import * as action from '../constants/actionTypes';
import { API_DATASTORE_URL } from '../constants/apiUrls';
import api from '../utils/api';


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

export function requestNamespaces () {
  return {
    type: 'FETCH_DATASTORE_NAMESPACES_PENDING',
    namespaces: []
  }
}

export function requestNamespacesFailed (error) {
  return {
    type: 'FETCH_DATASTORE_NAMESPACES_REJECTED',
    error
  }
}

export function recieveNamespaces (namespaces) {
  return {
    type: 'FETCH_DATASTORE_NAMESPACES_FULFILLED',
    namespaces
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
    return fetch(API_DATASTORE_URL + '/${namespace}/${key}',
      {'method': 'POST', 'body': JSON.stringify(value)}, getHeaders()).then(
      success => success.json().then(json => dispatch(createSuccessfull(json))),
      error => dispatch(createError(error))
  )}
}

 /**
  * FETCH (READ) Functions
  */

// Fetch namespaces from data store
export function fetchNamespaces () {
  return dispatch => {
    // Prepare reducer for incomming namespaces
    dispatch(requestNamespaces());

    // Fetch namespaces from api
    return fetch(API_DATASTORE_URL, getHeaders()).then(
      // Fetch success
      success => success.json().then(json => dispatch(recieveNamespaces(json))),
      // Fetch failed
      error => dispatch(requestNamespacesFailed(error))
    )}
}

// Fetch keys from data store
export function fetchKeys(namespace) {
  return dispatch => {
    // Prepare reducer from incomming keys
    dispatch(requestNamespaces());

    // Fetch keys from api using given namespace
    return fetch(API_DATASTORE_URL + '/${namespace}', getHeaders()).then(
      // Fetch success
      success => success.json().then(json => dispatch(recieveNamespaces(json, nemespace))),
      // Fetch failed
      error => dispatch(requestNamespacesFailed(error))
    )}
}

// Fetch value from data store
export function fetchValue(namespace, key) {
  return dispatch => {
    // Prepare reducer from incomming value
    dispatch(requestNamespaces())

    // Fetch keys from api using given namespace
    return fetch(API_DATASTORE_URL + '/${namespace}/${key}', getHeaders()).then(
      // Fetch success
      success => success.json().then(json => dispatch(recieveNamespaces(json, nemespace))),
      // Fetch failed
      error => dispatch(requestNamespacesFailed(error))
    )}
}

// Fetch key history form data store
export function fetchHistory(id) {
  return dispatch => {
    // Prepare reducer from incomming value
    dispatch(requestNamespaces())

    // Fetch history from datastore using given identifier
    return fetch(API_DATASTORE_URL + '/HISTORYSTORE/${id}', getHeaders()).then(
      // Fetch success
      success => success.json().then(json => dispatch()),
      // Fetch error
      error => dispatch()
    )}
}

/**
 * UPDATE Functions
 */
export function updateValue(namespace, key, value) {
 return dispatch => {
   dispatch(requestDeletion());
   return fetch(API_DATASTORE_URL + '/${namespace}/${key}',
     {'method': 'PUT', 'body': JSON.stringify(value)}, getHeaders()).then(
       success => success.json().then(json => dispatch(createSuccessfull(json))),
       error => dispatch(createError(error))
     )}
}

export function updateHistory(namespace, key, newValue) {
  return dispatch => {
      return getHistory(namespace, key).then(
        success => {
          if(success.status === 404) {
            createValue('HISTORYSTORE', id, )
          } else {
            return success.json();
          }
        }).then(history => {
          if(history !== null) {
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
    return fetch(API_DATASTORE_URL + '/${namespace}/${key}',
      {'method': 'DELETE'}, getHeaders()).then(
        success => success.json().then(json => dispatch(deleteSuccessfull(json))),
        error => dispatch(deleteError(error))
      )}
}

/**
 *  HELPER Functions
 */
