import * as action from '../constants/actionTypes';

const reducer = (state = {}, action) => {
  switch(action.type) {
    case action.GET_DATASTORE_KEYS: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export default reducer;
