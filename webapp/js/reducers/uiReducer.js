import * as actions from '../constants/actionTypes';

const ui = (state = {}, action) => {
    switch (action.type) {
        case actions.SELECT_NAMESPACE: {
          const { selectedNamespace } = action;
          return {
              ...state,
              selectedNamespace
          }
        }
        case actions.SELECT_KEY: {
          const {selectedKey} = action;
          return {
              ...state,
              selectedKey
          }
        }
        default:{
          return state;
        }
    }
}

export default ui
