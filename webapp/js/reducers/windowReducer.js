import * as actions from '../constants/actionTypes';

const window = (state = {}, action) => {
    switch (action.type) {
      
        case actions.SET_EDIT_WINDOW: {
          const { payload } = action;
          return {
            ...state,
            currentWindow: payload
          }
        }

        default: {
            return state;
        }
    }
}

export default window
