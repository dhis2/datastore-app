import * as action from '../constants/actionTypes';
import api from '../api';

export function FetchDatastoreNamespaces () {

  return {
    type: action.FETCH_DATASTORE_NAMESPACES,
    payload: api.getNamespaces()
        .then(response => (response.json()))

  }
}
