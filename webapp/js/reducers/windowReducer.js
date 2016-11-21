import * as actions from '../constants/actionTypes';

const window = (state = {}, action) => {
    switch (action.type) {
        case actions.SET_BROWSER_WINDOW: {
          const { payload } = actions;
          return {
              ...state,
              currentWindow:'browsing',
              browserItems:payload.browserItems
            }
        }

        case actions.SET_EDIT_WINDOW: {
          const { payload } = action;
          return {
            ...state,
            currentWindow: 'editing'
          }
        }

        default: {
            return state;
        }
    }
}

export default window
