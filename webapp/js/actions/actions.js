import * as action from '../constants/actionTypes';
import api from '../api';

export function FetchDatastoreNamespaces ( filter ) {

  return {
    type: action.FETCH_DATASTORE_NAMESPACES,
   // payload: new Promise(api.getNamespaces()
    //    .then(response => (response.json()))),
    filter
  }
}
