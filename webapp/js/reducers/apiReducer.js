import * as actions from '../constants/actionTypes';

const fetchedState = {fetching: false, fetched: true, error: false}
const fetchingState = {fetching: true, fetched: false, error: false}
const errorState = {fetching: false, fetched: false, error: true}

const api = (state = { fetching: false, fetched: false, namespaces: {} }, action) => {

  switch(action.type) {

    case actions.REQUEST_ASYNC_ACTION: {
      return {
        ...state,
        ...fetchingState
      }
    }

    case actions.REJECT_ASYNC_ACTION: {
      return {
        ...state,
        ...errorState
      }
    }

    case actions.FETCH_NAMESPACES_FULFILLED: {
      const namespaces = {};
      action.namespaces.map(key => { namespaces[key] = {} })
      return {
        ...state,
        ...fetchedState,
        namespaces: {
          ...namespaces
        }
      };
    }

    case actions.FETCH_KEYS_FULFILLED: {
      const { namespace, keys } = action;
      console.log(namespace)
      return {
        ...state,
        ...fetchedState,
        namespaces: {
          ...state.namespaces,
          [namespace]:{
            keys: keys
          }
        }
      };
    }

    case actions.FETCH_VALUE_FULFILLED: {
      const { namespace, key, value } = action;
      return {
        ...state,
        ...fetchedState,
        namespaces: {
          [namespace]: {
            [key]: value
          }
        }
      }
    }

    case actions.FETCH_HISTORY_FULFILLED: {
      const { history } = action;
      return {
        ...state,
        ...fetchedState,
        history,
      }
    }

    default: {
      return state;
    }
  }
}

export default api;
