import * as actions from '../constants/actionTypes';


const api = (state = {
  fetching: false,
  fetched: false,
  namespaces: []
}, action) => {
  switch(action.type) {
    case actions.FETCH_DATASTORE_NAMESPACES_FULFILLED: {
      return {
        ...state,
        namespaces: action.namespaces,
        fetched: true,
        fetching: false
      };
    }
    default: {
      return state;
    }
  }
}

export default api;
