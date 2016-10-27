import * as action from '../constants/actionTypes';
import api from '../api';

export function FetchDatastoreNamespaces () {
  return {
    type: action.FETCH_DATASTORE_NAMESPACES,
    payload: api.getNamespaces()

  }
}

export function FetchDataStoreKeys(namespace) {
  return {
    type: action.FETCH_DATASTORE_KEYS,
    payload: api.getKeys(namespace)
  }
}

export function FetchDataStoreValue(namespace,key) {
  return {
    type: action.FETCH_DATASTORE_VALUE,
    payload: api.getValue(namespace,key)
  }
}
