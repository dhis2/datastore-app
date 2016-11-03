import * as actions from '../constants/actionTypes';


const api = (state = { fetching: false, fetched: false, namespaces: [] }, action) => {



  switch(action.type) {
    case actions.FETCH_DATASTORE_NAMESPACES_PENDING: {
      return {
          ...state,
          fetching: true,
          fetched: false,
          error:false
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
        fetching: false,
        error: false
      };
    }

    case actions.FETCH_DATASTORE_KEYS_FULFILLED: {
      return {
          ...state,
          keys: action.payload,
        fetched: true,
        fetching: false,
        error: false
      };
    }

    case actions.FETCH_DATASTORE_KEYS_PENDING: {
      return {
        ...state,
        fetched: false,
        fetching: true,
        error: false
      };
    }

    case actions.FETCH_DATASTORE_KEYS_REJECTED: {
      return {
        ...state,
        fetched: false,
        fetching: false
      };
    }

    case actions.FETCH_DATASTORE_VALUE_FULFILLED: {
      return {
        ...state,
        values: action.payload,
        fetched: true,
        fetching: false,
        error: false
      }
    }

    case actions.FETCH_DATASTORE_VALUE_PENDING: {
      return {
        ...state,
        fetched: false,
        fetching: true,
        error: false
      }
    }

    case actions.FETCH_DATASTORE_VALUE_REJECTED: {
      return {
        ...state,
        values: action.payload,
        fetched: false,
        fetching: false,
        error: true
      }
    }
    default: {
      return state;
    }
  }
}

export default api;
