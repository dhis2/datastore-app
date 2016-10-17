import * as actions from '../constants/actionTypes';


const api = (state = {}, action) => {
  switch(action.type) {
    case actions.FETCH_DATASTORE_NAMESPACES: {
      return {
        ...state,
        namespaces: action.namespaces
      };
    }
    default: {
      return state;
    }
  }
}

export default api;
