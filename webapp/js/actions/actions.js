import * as action from '../constants/actionTypes';

export function getDatastoreKeys (creds) {
  return {
    type: action.GET_DATASTORE_KEYS,
    creds: creds
  }
}
