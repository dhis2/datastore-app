import * as actions from '../constants/actionTypes';


const api = (state = {
  fetching: false,
  fetched: false,
  namespaces: []
}, action) => {
  switch(action.type) {
    case actions.FETCH_DATASTORE_NAMESPACES_PENDING: {
      return {
          ...state,
          fetching: true,
          fetched: false
      };
    }
    case actions.FETCH_DATASTORE_NAMESPACES_REJECTED: {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: true
      };
    }

    case actions.FETCH_DATASTORE_NAMESPACES_FULFILLED: {
      const namespaces = action.payload.map(key => { return {key} });
      return {
        ...state,
        namespaces: namespaces,
        fetched: true,
        fetching: false
      };
    }
    case actions.FETCH_DATASTORE_KEYS_FULFILLED: {
      return {
          ...state,
          keys: action.payload,
        fetched: true,
        fetching: false
      };
    }
    case actions.FETCH_DATASTORE_KEYS_PENDING: {
      return {
        ...state,
        fetched: false,
        fetching: true
      };
    }
    case actions.FETCH_DATASTORE_KEYS_REJECTED: {
      return {
        ...state,
        fetched: false,
        fetching: false
      };
    }
    default: {
      return state;
    }
  }
}

export default api;
