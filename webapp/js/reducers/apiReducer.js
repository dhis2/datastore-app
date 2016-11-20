import * as actions from '../constants/actionTypes';

const fetchedState = {fetching: false, fetched: true, error: false}
const fetchingState = {fetching: true, fetched: false, error: false}
const errorState = {fetching: false, fetched: false, error: true}

const api = (state = { fetching: false, fetched: false, namespaces: {} }, action) => {

  switch(action.type) {

    /**
     *  Namespaces
     */
    case actions.FETCH_NAMESPACES_FULFILLED: {
      let namespaces = {};
      action.namespaces.map(key => {
        namespaces[key] = {'name': key, 'open':false}
      })
      return {
        ...state,
        ...fetchedState,
        namespaces: {
          ...namespaces
        }
      };
    }

    case actions.FETCH_NAMESPACES_PENDING: {
      return {
        ...state,
        ...fetchingState
      };
    }

    case actions.FETCH_NAMESPACES_REJECTED: {
      return {
        ...state,
        ...errorState
      };
    }

    /**
     *  Keys
     */

    case actions.FETCH_KEYS_FULFILLED: {
      const { namespace } = action, keys = {};
      action.keys.map(key => { keys[key] = {'key': key} })
      return {
        ...state,
        namespaces: {
          ...state.namespaces,
          [namespace]:{
            ...state.namespaces[namespace],
            ...fetchedState,
            keys: keys,
            open: false
          }
        }
      };
    }

    case actions.FETCH_KEYS_PENDING: {
      const { namespace } = action;
      return {
        ...state,
        namespaces: {
          ...state.namespaces,
          [namespace]:{
            ...state.namespaces[namespace],
            ...fetchingState
          }
        }
      };
    }

    case actions.FETCH_KEYS_REJECTED: {
      const { namespace, error } = action;
      return {
        ...state,
        namespaces: {
          ...state.namespaces,
          [namespace]: {
            ...state.namespaces[namespace],
            ...errorState,
            errorMessage: error
          }
        }
      };
    }

    /**
     *  Values
     */

    case actions.FETCH_VALUE_FULFILLED:
    case actions.UPDATE_VALUE_FULFILLED: {
      const { namespace, key, value } = action;
      return {
        ...state,
        ...fetchedState,
        namespaces: {
          ...state.namespaces,
          [namespace]: {
            ...state.namespaces[namespace],
            keys: {
              ...state.namespaces[namespace].keys,
              [key]: {
                ...state.namespaces[namespace].keys[key],
                value: value
              }
            }
          }
        }
      }
    }

    case actions.FETCH_VALUE_REJECTED: {
      const { namespace, key} = action;
      return {
        ...state,
        ...fetchedState,
        namespaces: {
          ...state.namespaces,
          [namespace]: {
            ...state.namespaces[namespace],
            keys: {
              ...state.namespaces[namespace].keys,
              [key]: {
                ...state.namespaces[namespace].keys[key],
                ...errorState
              }
            }
          }
        }
      }
    }

    case actions.FETCH_VALUE_PENDING: {
      const { namespace, key } = action;
      return {
        ...state,
        ...fetchedState,
        namespaces: {
          ...state.namespaces,
          [namespace]: {
            ...state.namespaces[namespace],
            keys: {
              ...state.namespaces[namespace].keys,
              [key]: {
                ...state.namespaces[namespace].keys[key],
                ...fetchingState
              }
            }
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

    case actions.TOGGLE_NAMESPACE: {

      const { namespace } = action;
      console.log(state.namespaces)
      return {
        ...state,
        namespaces: {
          ...state.namespaces,
          [namespace]: {
            ...state.namespaces[namespace],
            open: !state.namespaces[namespace].open
          }
        }
      }
    }

    default: {
      return state;
    }
  }
}

export default api;
