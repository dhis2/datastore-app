import * as action from '../constants/actionTypes';
import api from '../utils/api';


const getHeaders = () => {
    return {
        'method': 'GET',
        'mode': 'cors',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': this.auth
        }
    };
}

export function requestNamespaces () {
  return {
    type: 'FETCH_DATASTORE_NAMESPACES_PENDING',
    namespaces: []
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
 *  TODO handle failed fetch
 */
export function fetchNamespaces () {
  return dispatch => {
    dispatch(requestNamespaces());
    return fetch('https://play.dhis2.org/demo/api/dataStore', getHeaders()).then(
      response => response.json().then(json => dispatch(recieveNamespaces(json)))
    )}
}
