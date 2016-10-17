import * as action from '../constants/actionTypes';

export function FetchDatastoreNamespaces ( filter ) {
  return {
    type: action.FETCH_DATASTORE_NAMESPACES,
    filter
  }
}
